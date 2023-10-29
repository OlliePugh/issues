import { Server, Socket } from "socket.io";

const QUEUE_PORT = 8081;

const queueSocket = new Server(QUEUE_PORT, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const fakeUserInterface = {
  userInterface: [
    {
      id: "test-joystick",
      type: "joystick",
      control: [
        {
          inputMap: [
            { keyCodes: ["KeyD", "ArrowRight"], weight: 1 },
            { keyCodes: ["KeyA", "ArrowLeft"], weight: -1 },
          ],
          id: "left-right",
        },
        {
          inputMap: [
            { keyCodes: ["KeyW", "ArrowUp"], weight: 1 },
            { keyCodes: ["KeyS", "ArrowDown"], weight: -1 },
          ],
          id: "forward-backward",
        },
      ],
      position: {
        x: 0,
        y: 1,
      },
      displayOnDesktop: true,
      size: 0,
    },
  ],
  stream: { id: 1, address: "http://localhost:8088/janus" },
};

const queueEmulator = (socket: Socket, current: number, total: number) => {
  if (current <= 0) {
    socket.emit("queue_complete", { to: "http://127.0.0.1:8082" });
    return;
  }
  socket.emit("queue_update", { current, total });
  setTimeout(() => queueEmulator(socket, current - 1, total), 1000);
};

queueSocket.on("connection", (socket) => {
  console.log(`A user connected to the queue socket server: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected from the queue socket server: ${socket.id}`);
  });

  queueEmulator(socket, 3, 3);

  socket.onAny((eventName, ...args) => {
    console.log(
      `queue server recvd : ${eventName} from ${
        socket.id
      } containing : ${JSON.stringify(args)}`
    );
  });
});

console.log(`Socket.io queue server started on port ${QUEUE_PORT}`);

// PLAY SERVER
const PLAY_PORT = 8082;

const playSocket = new Server(PLAY_PORT, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

playSocket.on("connection", (socket) => {
  console.log(`A user connected to the play socket server: ${socket.id}`);
  socket.emit("user_interface", fakeUserInterface);
  setTimeout(() => {
    socket.emit("match_end");
    socket.disconnect();
  }, 30000);

  socket.on("disconnect", () => {
    console.log(`User disconnected from the play socket server: ${socket.id}`);
  });

  socket.onAny((eventName, ...args) => {
    console.log(
      `play server recvd : ${eventName} from ${
        socket.id
      } containing : ${JSON.stringify(args)}`
    );
  });
});

console.log(`Socket.io game server started on port ${PLAY_PORT}`);
