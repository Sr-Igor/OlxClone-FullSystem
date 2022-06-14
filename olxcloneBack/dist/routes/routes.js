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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ApiController = __importStar(require("../controllers/ApiController"));
const AuthController = __importStar(require("../controllers/AuthController"));
const UserController = __importStar(require("../controllers/UserController"));
const AdsController = __importStar(require("../controllers/AdsController"));
const AuthValidator_1 = require("../validators/AuthValidator");
const passport_1 = require("../config/passport");
const UserValidator_1 = require("../validators/UserValidator");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    dest: "./tmp",
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpg', 'image/jpeg', 'image/png'];
        if (!allowed.includes(file.mimetype)) {
            cb(new Error('Envie somente imagens'));
        }
        cb(null, allowed.includes(file.mimetype));
    },
    limits: { fieldSize: 2000000 }
});
const router = (0, express_1.Router)();
router.get("/ping", ApiController.ping);
router.get('/states', UserController.getStates);
router.get('/user/me', passport_1.privateRoute, UserController.info);
router.post('/user/edit', passport_1.privateRoute, upload.single("image"), UserValidator_1.UserValidator.editUser, UserController.editActions);
router.post('/user/signin', AuthValidator_1.AuthValidator.signIn, AuthController.singIn);
router.post('/user/signup', AuthValidator_1.AuthValidator.singUp, AuthController.singUp);
router.get('/user/anun', passport_1.privateRoute, AdsController.adsUser);
router.get('/categories', AdsController.getCategories);
router.post('/ad/add', passport_1.privateRoute, upload.array("images", 5), AdsController.addAction);
router.get('/ad/list', AdsController.getList);
router.get('/ad/item', AdsController.getItem);
router.post('/ad/:id', passport_1.privateRoute, upload.array("images", 5), AdsController.editAction);
router.post('/del/:id', passport_1.privateRoute, AdsController.deleteAds);
exports.default = router;
