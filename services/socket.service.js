const Socket = require("socket.io");
const { AuthService } = require("../routes/auth.routes");
const { NotificationsService } = require("../services/notifications.service");

let notifications_ = []
let response_object = {
    statusCode: 0,
    message: "",
    data: null
}

let io
const connectSocket = (httpServer) => {
    io = new Socket.Server(httpServer,{
        cors: {
            //origin: "*",
            
        }
    })
    io.use((socket, next) => {
        const token = socket.handshake.query.token;

        console.log("token:", token, socket.handshake)

        /*if (!token) return next(new Error("No token"));

        try {
            const user = AuthService.verifyAccessToken(token);
            socket.user = user;
            next();
        } catch {
            next(new Error("Unauthorized"));
        }*/
        next()
    })
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // send message to client
        socket.emit("message", "Hello from server!");

        sendAllNotifications(notifications_ ?? NotificationsService.findAll())



        // listen event from client
        socket.on("message", (data) => {
            console.log("Message:", data);

            // send to all clients
            io.emit("message", data);
        });

        sendMessge("msg", "Hallo!");

        socket.on("read-notification", (data) => {
            console.log("Read notification:", data);
            const notify = NotificationsService.readNotification(data.id)

            if (!notify) {
                io.emit("read-notification", "no notification found")
                //throw new Error("no notification found")
            }
            console.log("notify:", notify)
            io.emit("read-notification", notify);
            sendAllNotifications(notifications_)
        });

        // disconnect
        socket.on("disconnect", () => {
            io.emit("message", "User disconnected");
            console.log("User disconnected:", socket.id);
        });
    });
}

const sendMessge = (key, msg) => {
    io.emit(key, msg);
}

const sendNotification = (data) => {
    response_object.data = data
    response_object.statusCode = 201
    response_object.message = "send notification"
    io.emit("notification", response_object);
    io.on("notification", (data_) => {
        console.log("Notification:", data_);
    });
     clearResponse()
}

const sendAllNotifications = (notifications) => {
    notifications_ = notifications
    response_object.data = notifications
    response_object.statusCode = 201
    response_object.message = "Get All notifications"
    io.emit("notifications", response_object);
    clearResponse()
}

const clearResponse = () => {
      response_object.data = null
    response_object.statusCode = 0
    response_object.message = ""
}


module.exports.SocketService = { io, connectSocket, sendMessge, sendNotification, sendAllNotifications }