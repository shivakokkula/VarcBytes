const compression = require('compression');
const mongoose = require('mongoose');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
require("dotenv").config();
const express = require('express');
const errorHandler = require('./middlewares/error');
const authRoutes = require("./routes/auth.routes");
const feedbackRoutes = require("./routes/feedback.routes");
const planRoutes = require("./routes/plan.routes");
const authLimiter=require("./middlewares/rateLimiter")
const app = express();

app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(mongoSanitize());
app.use(cors());
app.options('*', cors());
app.use('/login', authLimiter);

app.use("/", authRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/plan", planRoutes);

app.use((req, res, next) => {
  next(Error('Not found'));
});

app.use(errorHandler);

let server;
let PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DB,{useNewUrlParser: true,useUnifiedTopology: true,}).then(()=>{
    console.log("Database connected");
    server = app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
}).catch(e => console.log(e));

mongoose.connection.on('disconnected', function () {
    console.log("Mongoose default connection is disconnected");
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
        console.log('Server closed');
        process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
    console.log(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});