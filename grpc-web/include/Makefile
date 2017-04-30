all: checkout build

checkout:
	git submodule update --init ./grpc-web
	cd ./grpc-web && ./init_submodules.sh && cd ..
	npm install google-closure-compiler

build:
	mkdir -p ./grpc-web/javascript/proto/google/protobuf/
	protoc -I=./grpc-web/third_party/grpc/third_party/protobuf/src/google/protobuf \
	--js_out=import_style=closure,binary:./grpc-web/javascript/proto/google/protobuf/ \
	./grpc-web/third_party/grpc/third_party/protobuf/src/google/protobuf/any.proto

	mkdir -p ./grpc-web/javascript/proto/google/rpc
	protoc -I=./grpc-web/net/grpc/gateway/protos \
	--js_out=import_style=closure,binary:./grpc-web/javascript/proto/google/rpc/ \
	./grpc-web/net/grpc/gateway/protos/stream_body.proto

	mkdir -p ./grpc-web/javascript/proto/grpc/gateway
	protoc -I=./grpc-web/net/grpc/gateway/protos \
	--js_out=import_style=closure,binary:./grpc-web/javascript/proto/grpc/gateway/ \
	./grpc-web/net/grpc/gateway/protos/pair.proto

	java -jar node_modules/google-closure-compiler/compiler.jar \
		--dependency_mode STRICT \
		--entry_point="goog:grpc.web.AbstractClientBase" \
		--entry_point="goog:grpc.web.GatewayClientBase" \
		--entry_point="goog:grpc.web.ClientReadableStream" \
		--js ./grpc-web/javascript/**.js \
		--js ./grpc-web/third_party/**.js \
		--formatting PRETTY_PRINT \
		--js_output_file grpc-web.inc.js

clean:
	rm -r ./grpc-web/javascript/proto
	rm grpc-web.inc.js
