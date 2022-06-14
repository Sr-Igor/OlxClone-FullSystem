"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editActions = exports.info = exports.getStates = void 0;
const express_validator_1 = require("express-validator");
const MainServices = __importStar(require("../services/MainServices"));
const UserServices = __importStar(require("../services/UserServices"));
const getStates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let states = yield UserServices.findAllStates();
    res.json({ states });
});
exports.getStates = getStates;
const info = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.slice(7);
    const user = yield MainServices.findUser(token);
    const stateName = yield UserServices.findStateId(user.state);
    let image;
    if (user.image && user.image !== "") {
        image = `${process.env.BASE}/media/${user.image}.jpg`;
    }
    else {
        image = "";
    }
    res.json({
        name: user.name,
        email: user.email,
        state: stateName,
        image,
    });
});
exports.info = info;
const editActions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // Verify Errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    ;
    const data = (0, express_validator_1.matchedData)(req);
    let token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.slice(7);
    const result = yield UserServices.updateUser(token, data, req);
    if (result instanceof Error) {
        res.status(400);
        res.json({ error: result });
        return;
    }
    res.status(201);
    res.json({ error: "", image: result });
});
exports.editActions = editActions;
