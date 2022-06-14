"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const modelSchema = new mongoose_1.Schema({
    idUser: String,
    state: String,
    category: String,
    images: [Object],
    dateCreated: Date,
    title: String,
    price: Number,
    priceNegotiable: Boolean,
    description: String,
    views: Number,
    status: Boolean
});
const modelName = "Ads";
if (mongoose_1.connection && mongoose_1.connection.models[modelName]) {
    module.exports = mongoose_1.connection.models[modelName];
}
else {
    module.exports = (0, mongoose_1.model)(modelName, modelSchema);
}
