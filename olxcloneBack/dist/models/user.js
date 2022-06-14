"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const modelSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    state: String,
    image: String,
    passwordHash: String,
    token: String
});
const modelName = "User";
if (mongoose_1.connection && mongoose_1.connection.models[modelName]) {
    module.exports = mongoose_1.connection.models[modelName];
}
else {
    module.exports = (0, mongoose_1.model)(modelName, modelSchema);
}
