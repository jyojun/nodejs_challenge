import net from "net";

let HOST = "127.0.0.1";
let PORT = 2022;

let server = net.createServer(function (client) {
  console.log("Client Connected");
  console.log("local = %s:%s", client.localAddress, client.localPort);
  console.log("remote = %s:%s", client.remoteAddress, client.remotePort);

  client.on("data", function (data) {
    console.log(
      "Received data from client on port %d: %s",
      client.remotePort,
      data.toString()
    );
    console.log("Bytes received: " + client.bytesRead);
    client.write("Echo: " + data);
    console.log("Bytes sent: " + client.bytesWritten);
    client.destroy();
  });

  client.on("end", function () {
    console.log("Client disconnected");
    server.getConnections(function (err, count) {
      console.log("Remaining Connections: " + count);
    });
  });

  client.on("error", function (err) {
    console.log("Socket Error: ", JSON.stringify(err));
  });
  client.on("timeout", function () {
    console.log("Socket Timed out");
  });
});

server.listen(PORT, function () {
  console.log("Server listening: " + JSON.stringify(server.address()));
  server.on("close", function () {
    console.log("Server Terminated");
  });
  server.on("error", function (err) {
    console.log("Server Error: ", JSON.stringify(err));
  });
});
