// Copyright (c) 2017 Johan Brandhorst

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

package grpcweb

import (
	"errors"
	"time"

	"github.com/gopherjs/gopherjs/js"

	// Include gRPC-web JS objects
	_ "github.com/johanbrandhorst/gopherjs-grpc-web/grpcwebjs"
)

// GatewayClientBase represents the gRPC-web
// GatewayClientBase class.
type GatewayClientBase struct {
	*js.Object
}

// NewGatewayClientBase constructs a new GatewayClientBase
// from the JS class constructor.
func NewGatewayClientBase() *GatewayClientBase {
	return &GatewayClientBase{
		Object: js.Global.Get("grpc").Get("web").Get("GatewayClientBase").New(),
	}
}

// RPCCall makes an XHR request to the provided endpoint using the provided
// request. It returns a byte representation of the response, or an error
func (g *GatewayClientBase) RPCCall(endpoint string, request ProtoMessage, opts ...CallOption) (resp []byte, err error) {
	xhr := NewXHRIO()
	stream := NewXHRNodeReadableStream(xhr)

	for _, opt := range opts {
		opt(stream)
	}

	respChan := make(chan []byte, 1)
	errChan := make(chan error, 1)
	stream.On(DATA, func(obj *js.Object) {
		println("Got data!")
		if obj.Get("1").Length() > 0 {
			respChan <- js.Global.Get("Uint8Array").New(obj.Get("1")).Interface().([]byte)
		}
		if obj.Get("2").Length() > 0 {
			status, err := g.ParseRPCStatus(js.Global.Get("Uint8Array").New(obj.Get("2")).Interface().([]byte))
			if err != nil {
				errChan <- err
			} else if status.Code != Ok {
				errChan <- errors.New("Error code: " + string(status.Code) + `, "` + status.Details + `"`)
			}
		}
	})
	stream.On(ERROR, func(_ *js.Object) {
		println("Got error!")
		errChan <- errors.New("some error")
	})
	stream.On(CLOSE, func(_ *js.Object) {
		println("Got CLOSE!")
		errChan <- errors.New("some CLOSE")
	})
	stream.On(END, func(_ *js.Object) {
		println("Got end!")
		errChan <- errors.New("some end")
	})
	stream.On(READABLE, func(_ *js.Object) {
		println("Got READABLE!")
		errChan <- errors.New("some READABLE")
	})

	xhr.SetRequestHeader("Content-Type", "application/x-protobuf")
	xhr.SetRequestHeader("X-Accept-Content-Transfer-Encoding", "base64")
	xhr.SetRequestHeader("X-Accept-Response-Streaming", "true")
	xhr.SetTimeout(time.Second)

	reqData, err := request.Serialize()
	if err != nil {
		return nil, err
	}

	xhr.Send(endpoint, POST, reqData)

	// Block until we've received a reply
	select {
	case resp = <-respChan:
		println("Got resp!")
		return resp, nil
	case err = <-errChan:
		println("Got err!")
		return nil, err
	}
}

// ServerStreaming makes an XHR request to the provided streaming endpoint
// using the provided request. It returns client for reading messages.
func (g *GatewayClientBase) ServerStreaming(endpoint string, request ProtoMessage, opts ...CallOption) (*StreamReader, error) {
	xhr := NewXHRIO()
	stream := NewXHRNodeReadableStream(xhr)

	for _, opt := range opts {
		opt(stream)
	}

	respChan := make(chan []byte, 1)
	errChan := make(chan error, 1)
	stream.On("data", func(obj *js.Object) {
		if obj.Get("1").Length() > 0 {
			respChan <- js.Global.Get("Uint8Array").New(obj.Get("1")).Interface().([]byte)
		}
		if obj.Get("2").Length() > 0 {
			status, err := g.ParseRPCStatus(js.Global.Get("Uint8Array").New(obj.Get("2")).Interface().([]byte))
			if err != nil {
				errChan <- err
				return
			}
			if status.Code != Ok {
				errChan <- &Error{Code: status.Code, Message: status.Details}
			} else {
				// Success!
				errChan <- EOF
			}
		}
	})

	xhr.SetRequestHeader("Content-Type", "application/x-protobuf")
	xhr.SetRequestHeader("X-Accept-Content-Transfer-Encoding", "base64")
	xhr.SetRequestHeader("X-Accept-Response-Streaming", "true")

	reqData, err := request.Serialize()
	if err != nil {
		return nil, err
	}

	xhr.Send(endpoint, POST, reqData)

	return NewStreamReader(respChan, errChan), nil
}

// ParseRPCStatus parses raw bytes to a Status.
func (g *GatewayClientBase) ParseRPCStatus(rawBytes []byte) (s *Status, err error) {
	// Recover any thrown JS errors
	defer func() {
		e := recover()
		if e == nil {
			return
		}

		if e, ok := e.(*js.Error); ok {
			err = e
		} else {
			panic(e)
		}
	}()

	s = &Status{
		Object: g.Call("parseRpcStatus_", js.Global.Get("Uint8Array").New(rawBytes)),
	}

	return s, err
}
