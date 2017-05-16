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
	"time"

	"github.com/gopherjs/gopherjs/js"
)

// HTTPMethod is an enum for valid HTTP methods
type HTTPMethod int

func (h HTTPMethod) String() string {
	return map[HTTPMethod]string{
		GET:  "GET",
		POST: "POST",
	}[h]
}

// Define HTTP methods
const (
	GET = HTTPMethod(iota)
	POST
	// Don't really need any other methods
)

// XHRIO encapsulates the google XhrIO class.
type XHRIO struct {
	*js.Object
}

// SetRequestHeader sets the header key to value
func (x *XHRIO) SetRequestHeader(key, value string) {
	x.Get("headers").Call("set", key, value)
}

// SetTimeout sets the header key to value
func (x *XHRIO) SetTimeout(timeout time.Duration) {
	x.Call("setTimeoutInterval", int(timeout.Seconds()*1000))
}

// Send sends the data to the endpoint using the method
func (x *XHRIO) Send(endpoint string, method HTTPMethod, data []byte) {
	x.Call("send", endpoint, method.String(), js.Global.Get("Uint8Array").New(data))
}

// Abort closes the XHR stream
func (x *XHRIO) Abort() {
	x.Call("abort")
}

// NewXHRIO initializes an XHRIO object.
func NewXHRIO() *XHRIO {
	return &XHRIO{
		Object: js.Global.Get("goog").Get("net").Get("XhrIo").New(),
	}
}

// EventType is a NodeReadableStream event type
// Defined in
// https://github.com/google/closure-library/blob/master/closure/goog/net/streams/nodereadablestream.js#L54
type EventType string

// All the defined EventTypes
const (
	READABLE = EventType("readable")
	DATA     = EventType("data")
	END      = EventType("end")
	CLOSE    = EventType("close")
	ERROR    = EventType("error")
)

// XHRNodeReadableStream encapsulates a google
// XhrNodeReadableStream class
type XHRNodeReadableStream struct {
	*js.Object
	xhr *XHRIO
}

// NewXHRNodeReadableStream initializes an
// XHRNodeReadableStream object with the provided XhrIO.
func NewXHRNodeReadableStream(xhrIO *XHRIO) *XHRNodeReadableStream {
	xhrnrs := &XHRNodeReadableStream{
		Object: js.Global.Get("goog").Get("net").Get("streams").Call("createXhrNodeReadableStream", xhrIO.Object),
	}
	xhrnrs.xhr = xhrIO

	return xhrnrs
}

// On sets the callback handler for the given event
func (x *XHRNodeReadableStream) On(event EventType, callback func(*js.Object)) {
	x.Call("on", string(event), callback)
}

// Abort closes the stream
func (x *XHRNodeReadableStream) Abort() {
	x.xhr.Abort()
}

type StreamReader struct {
	respChan <-chan []byte
	errChan  <-chan error
}

func NewStreamReader(respChan <-chan []byte, errChan <-chan error) *StreamReader {
	return &StreamReader{
		respChan: respChan,
		errChan:  errChan,
	}
}

func (s *StreamReader) Recv() ([]byte, error) {
	select {
	case resp := <-s.respChan:
		return resp, nil
	case err := <-s.errChan:
		return nil, err
	}
}
