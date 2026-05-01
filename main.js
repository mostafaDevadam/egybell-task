require("dotenv").config();
const express = require("express");
const cors = require("cors")
const path = require("path");
const { createClient } = require('redis');
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const logRoutes = require("./routes/log.routes");
const { I18n } = require('i18n')
const Socket = require("socket.io");

const { createServer } = require('node:http');
const { SocketService } = require("./services/socket.service");

const app = express();

const http_server = createServer(app);

SocketService.connectSocket(http_server)
/*
const io = new Socket.Server(http_server)

// socket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // listen event from client
  socket.on("message", (data) => {
    console.log("Message:", data);

    // send to all clients
    io.emit("message", data);
  });

   io.emit("msg", "Hallo!");

  // disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
*/

const i18n = new I18n({
  locales: ['en', 'ar'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: "en",
  objectNotation: true,
  register: global,
  api: {
    __: 't',
    __n: 'tn'
  }
})

app.use(i18n.init)
app.use(express.json());
app.use(cors())
//app.set('trust proxy', 1)

app.use((req, res, next) => {
  req.clientIp = req.ip;
  next();
});

// Optional: set locale manually (from header, query, etc.)
app.use((req, res, next) => {
  const lang = req.headers['Accept-Language'] || 'en'
  req.setLocale(lang)
  next()
})

app.use("/api/v1.1/auth", authRoutes);
app.use("/api/v1.1/users", userRoutes);
app.use("/api/v1.1/logs", logRoutes);



app.get("/api/v1.1", (req, res) => {
  console.log("req ip:", req.ip, req.clientIp)
  res.json({
    statusCode: 200,
    message: req.t("main.api"),
    data: null
  })
})

app.get('/api/v1.1/health', async (req, res) => {
  try {
    const startup = await redis.get('server:last_startup');
    const shutdown = await redis.get('server:last_shutdown');

    const uptime = process.uptime(); // seconds

    const redisStatus = redis.isOpen ? 'up' : 'down';

    res.json({
      status: 'ok',
      uptime_seconds: uptime,
      uptime_human: `${Math.floor(uptime / 60)} min ${Math.floor(uptime % 60)} sec`,
      redis: redisStatus,
      last_startup: startup,
      last_shutdown: shutdown ? JSON.parse(shutdown) : null,
      memory: process.memoryUsage()
    });

  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// redis
const redis = createClient();

//redis.on('error', (err) => console.error('Redis error:', err));

async function connectRedis() {
  await redis.connect();
  console.log('Redis connected');
}

async function saveShutdownTime(signal) {
  const timestamp = new Date().toISOString();

  await redis.set('server:last_shutdown', JSON.stringify({
    signal,
    timestamp,
    pid: process.pid,
    env: process.env.NODE_ENV
  }));

  await redis.lPush('server:shutdown_history', JSON.stringify({
    signal,
    timestamp
  }));

  console.log('Saved shutdown time:', timestamp);
}




// can detect if connection of server will close or not



const server = http_server.listen(process.env.PORT, async () => {
  await connectRedis();
  //await redis.set('server:last_startup', new Date().toISOString());
  console.log('PID:', process.pid);
  console.log(`Server running on port ${process.env.PORT}`);
});
/*
//---------------------------------
let isShuttingDown = false;

async function shutdownWithRedis(signal) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`\nReceived ${signal}`);

  try {
    // ✅ Save shutdown time to Redis
    await saveShutdownTime(signal);

    // ✅ Close server
    server.close(async () => {
      console.log('Server closed');

      // Optional: close Redis connection
      await redis.quit();

      process.exit(0);
    });

  } catch (err) {
    console.error('Shutdown error:', err);
    process.exit(1);
  }
}

// Handle signals
['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(sig => {
  process.on(sig, shutdownWithRedis);
});


//--------------------------------
if (server.listening) {

  console.log('Server is running');
} else {
  console.log('Server is not running');
}



server.on('connection', (conn) => {
  connections.add(conn);
  conn.on('close', () => connections.delete(conn));
});

*/