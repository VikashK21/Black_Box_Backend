const express = require("express");
const path = require("path");

var io = require("socket.io")({
  path: "/io/webrtc",
});

const app = express();

const rooms = {};
// app.get('/', (req, res) => res.send('Hello World!!!!!'))

//https://expressjs.com/en/guide/writing-middleware.html
// console.log(path.join(__dirname, "/web"));
// app.use("/", express.static(path.join(__dirname, "/web/build")));
// app.use(express.static(path.join(__dirname, "../client/public")));
// app.use(express.static())
app.get("/", (req, res, next) => {
  //default room
  // /home/vikash/Desktop/BASK/bb_video_call/client/build/index.html
  res.sendFile(path.join(__dirname, "/web/build/index.html"));
});

app.get("/:room", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/web/build/index.html"));
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () =>
  console.log(`🚀 @ http://localhost:${PORT}`),
);
// const server = app.listen(port, () =>
//   console.log(`Example app listening on port ${port}!`),
// );

io.listen(server);

// default namespace
io.on("connection", (socket) => {
  console.log("connected");
});

// https://www.tutorialspoint.com/socket.io/socket.io_namespaces.htm
const peers = io.of("/webrtcPeer");

// keep a reference of all socket connections
// let connectedPeers = new Map();

peers.on("connection", (socket) => {
  const room = socket.handshake.query.room;

  rooms[room] =
    (rooms[room] && rooms[room].set(socket.id, socket)) ||
    new Map().set(socket.id, socket);

  // connectedPeers.set(socket.id, socket);

  console.log(socket.id);
  socket.emit("connection-success", {
    success: socket.id,
    peerCount: rooms[room].size,
  });

  // const broadcast = () => socket.broadcast.emit('joined-peers', {
  //   peerCount: connectedPeers.size,
  // })
  const broadcast = () => {
    const _connectedPeers = rooms[room];

    for (const [socketID, _socket] of _connectedPeers.entries()) {
      // if (socketID !== socket.id) {
      _socket.emit("joined-peers", {
        peerCount: rooms[room].size, //connectedPeers.size,
      });
      // }
    }
  };
  broadcast();

  // const disconnectedPeer = (socketID) => socket.broadcast.emit('peer-disconnected', {
  //   peerCount: connectedPeers.size,
  //   socketID: socketID
  // })
  const disconnectedPeer = (socketID) => {
    const _connectedPeers = rooms[room];
    for (const [_socketID, _socket] of _connectedPeers.entries()) {
      _socket.emit("peer-disconnected", {
        peerCount: rooms[room].size,
        socketID,
      });
    }
  };

  socket.on("disconnect", () => {
    console.log("disconnected");
    // connectedPeers.delete(socket.id)
    rooms[room].delete(socket.id);
    disconnectedPeer(socket.id);
  });

  socket.on("onlinePeers", (data) => {
    const _connectedPeers = rooms[room];
    for (const [socketID, _socket] of _connectedPeers.entries()) {
      // don't send to self
      if (socketID !== data.socketID.local) {
        console.log("online-peer", data.socketID, socketID);
        socket.emit("online-peer", socketID);
      }
    }
  });

  socket.on("offer", (data) => {
    const _connectedPeers = rooms[room];
    for (const [socketID, socket] of _connectedPeers.entries()) {
      // don't send to self
      if (socketID === data.socketID.remote) {
        // console.log('Offer', socketID, data.socketID, data.payload.type)
        socket.emit("offer", {
          sdp: data.payload,
          socketID: data.socketID.local,
        });
      }
    }
  });

  socket.on("answer", (data) => {
    const _connectedPeers = rooms[room];
    for (let [socketID, socket] of _connectedPeers.entries()) {
      if (socketID === data.socketID.remote) {
        console.log("Answer", socketID, data.socketID, data.payload.type);
        socket.emit("answer", {
          sdp: data.payload,
          socketID: data.socketID.local,
        });
      }
    }
  });

  // socket.on('offerOrAnswer', (data) => {
  //   // send to the other peer(s) if any
  //   for (const [socketID, socket] of connectedPeers.entries()) {
  //     // don't send to self
  //     if (socketID !== data.socketID) {
  //       console.log(socketID, data.payload.type)
  //       socket.emit('offerOrAnswer', data.payload)
  //     }
  //   }
  // })

  socket.on("candidate", (data) => {
    const _connectedPeers = rooms[room];
    // send candidate to the other peer(s) if any
    for (let [socketID, socket] of _connectedPeers.entries()) {
      if (socketID === data.socketID.remote) {
        socket.emit("candidate", {
          candidate: data.payload,
          socketID: data.socketID.local,
        });
      }
    }
  });
});
