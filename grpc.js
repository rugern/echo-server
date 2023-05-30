const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './message.proto'; // replace with path to your .proto file
const SERVER_URI = '0.0.0.0:3000';

// Load protobuf
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

// Define service implementation
const messageService = {
    GetMessage: (call, callback) => {
        callback(null, call.request); // Echo the received message
    }
};

// Create gRPC server
const server = new grpc.Server();

// Add service to server
server.addService(protoDescriptor.MessageService.service, messageService);

// Start server
server.bindAsync(SERVER_URI, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error(err);
        return;
    }
    server.start();
    console.log(`gRPC server listening at ${SERVER_URI}`);
});
