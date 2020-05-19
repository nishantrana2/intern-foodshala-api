import mongoose from "mongoose";

import config from '../config.json'

const CONNECTION_URI = config.connectionString;
mongoose.Promise = global.Promise;
mongoose.connect(CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});