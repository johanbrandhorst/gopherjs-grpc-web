# protoc-gen-gopherjs
Generate GopherJS compatible structs from your proto files!

## Why?
This is used to generate types and functions required to use gRPC-web
from a GopherJS client.

It also automatically embeds the `*js.Object` into the structs so that they can
be used properly in GopherJS files.

## WARNING

This `protoc` plugin is very much alpha state and does not support
all types of valid proto files and messages.
Use are your own risk, and contributions are very much welcome!
