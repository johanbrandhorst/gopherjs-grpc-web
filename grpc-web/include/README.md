# gRPC-web
This folder contains a JS file compiled with the Google Closure Compiler,
exposing all the JS Objects used by gRPC-web Clients.

## Building
### Requirements
 1. Java JRE for the Google Closure Compiler
 1. `npm` for installing the Google Closure Compiler
 1. `protoc` for generating proto files

First ensure that all submodules have been populated

```
$ make checkout
```

This takes a while. Next you can build the JS file:

```
$ make build
```

## Using
If you include the `grpcwebjs` package into your GopherJS file,
it'll automatically include the JS as well.
