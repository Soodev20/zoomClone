import http from "http";
import express from "express";
import SocketIO from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on ws://localhost:3000");

const server = http.createServer(app);
const io = SocketIO(server);

// const sockets = [];

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   console.log("Connected to Browser ✅");

//   socket["nickName"] = "Somebody";
//   socket.on("close", () => console.log("Disconnected from the Browser ❌"));
//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg);

//     switch (message.type) {
//       case "new_message":
//         sockets.forEach(aSocket => aSocket.send(`${socket.nickName} : ${message.payload}`));
//         break;
//       case "nickName":
//         socket["nickName"] = message.payload;
//         break;
//     }
//   });
// });

server.listen(3000, handleListen);

