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
	"github.com/gopherjs/gopherjs/js"

	// Include gRPC-web JS objects
	_ "github.com/johanbrandhorst/gopherjs-grpc-web/grpcwebjs"
)

// Metadata is a simple string to string map.
type Metadata map[string]string

// Status is a gRPC-web Status.
type Status struct {
	Code     StatusCode
	Details  string
	Metadata Metadata
}

// StatusCode is a gRPC-web StatusCode.
type StatusCode int

const (
	// Ok is Not an error; returned on success.
	Ok = StatusCode(iota)

	// Cancelled is returned when the operation was cancelled (typically by the caller).
	Cancelled

	// Unknown error. An example of where this error may be returned is if a
	// Status value received from another address space belongs to an error-space
	// that is not known in this address space. Also errors raised by APIs that
	// do not return enough error information may be converted to this error.
	Unknown

	// InvalidArgument is returned when the Client specified an invalid argument.
	// Note that this differs from FailedPrecondition.
	// InvalidArgument indicates arguments that are problematic regardless
	// of the state of the system (e.g., a malformed file name).
	InvalidArgument

	// DeadlineExceeded is returned when the deadlined expired before operation could complete.
	// For operations that change the state of the system, this error may be returned even if the
	// operation has completed successfully. For example, a successful response
	// from a server could have been delayed long enough for the deadline to expire.
	DeadlineExceeded

	// NotFound is returned when some requested entity (e.g., file or directory) was not found.
	NotFound

	// AlreadyExists is returned when some entity that we attempted to create
	// (e.g., file or directory) already exists.
	AlreadyExists

	// PermissionDenied is returned when the caller does not have permission
	// to execute the specified operation. PermissionDenied must not be used
	// for rejections caused by exhausting some resource
	// (use ResourceExhausted instead for those errors).
	// PermissionDenied must not be used if the caller can not be identified
	// (use Unautheticated instead for those errors).
	PermissionDenied

	// Unauthenticated is returned when the request does not have valid
	// authentication credentials for the operation.
	Unauthenticated

	// ResourceExhausted is returned when some resource has been exhausted,
	// perhaps a per-user quota, or perhaps the entire file system is out of space.
	ResourceExhausted

	// FailedPrecondition is returned when an operation was rejected because
	// the system is not in a state required for the operation's execution.
	// For example, directory to be deleted may be non-empty,
	// an rmdir operation is applied to a non-directory, etc.
	//
	// A litmus test that may help a service implementor in deciding
	// between FailedPrecondition, Aborted, and Unavailable:
	//  (a) Use Unavailable if the client can retry just the failing call.
	//  (b) Use Aborted if the client should retry at a higher-level
	//      (e.g., restarting a read-modify-write sequence).
	//  (c) Use FailedPrecondition if the client should not retry until
	//      the system state has been explicitly fixed. E.g., if an "rmdir"
	//      fails because the directory is non-empty, FailedPrecondition
	//      should be returned since the client should not retry unless
	//      they have first fixed up the directory by deleting files from it.
	//  (d) Use FailedPrecondition if the client performs conditional
	//      REST Get/Update/Delete on a resource and the resource on the
	//      server does not match the condition. E.g., conflicting
	//      read-modify-write on the same resource.
	FailedPrecondition

	// Aborted is returned when the operation was aborted, typically due to a
	// concurrency issue like sequencer check failures, transaction aborts, etc.
	//
	// See litmus test above for deciding between FailedPrecondition, Aborted,
	// and Unavailable.
	Aborted

	// OutOfRange is returned when an operation was attempted past the valid range.
	// E.g., seeking or reading past end of file.
	//
	// Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
	// if the system state changes. For example, a 32-bit file system will
	// generate INVALID_ARGUMENT if asked to read at an offset that is not in the
	// range [0,2^32-1], but it will generate OutOfRange if asked to read from
	// an offset past the current file size.
	//
	// There is a fair bit of overlap between FailedPrecondition and
	// OutOfRange. We recommend using OutOfRange (the more specific error)
	// when it applies so that callers who are iterating through a space can
	// easily look for an OutOfRange error to detect when they are done.
	OutOfRange

	// Unimplemented is returned when an operation is not implemented or not
	// supported/enabled in this service.
	Unimplemented

	// Internal indicates an internal error. Means some invariants expected by underlying System has
	// been broken. If you see one of these errors, Something is very broken.
	Internal

	// Unavailable indicates the service is currently unavailable. This is a most likely a transient
	// condition and may be corrected by retrying with a backoff.
	//
	// See litmus test above for deciding between FailedPrecondition, Aborted,
	// and Unavailable.
	Unavailable

	// DataLoss indicates unrecoverable data loss or corruption.
	DataLoss
)

// FromHTTPStatus converts a HTTP Status code to a StatusCode
func FromHTTPStatus(HTTPCode int) StatusCode {
	return StatusCode(js.Global.Call("grpc.web.StatusCode.fromHttpStatus", HTTPCode).Int())
}
