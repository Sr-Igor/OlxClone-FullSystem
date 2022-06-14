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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAds = exports.adsUser = exports.editAction = exports.getItem = exports.getList = exports.addAction = exports.getCategories = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const AdsServices = __importStar(require("../services/AdsServices"));
const MainServices = __importStar(require("../services/MainServices"));
dotenv_1.default.config();
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cats = yield AdsServices.getAllCategories();
    let categories = [];
    for (let i in cats) {
        categories.push(Object.assign(Object.assign({}, cats[i]._doc), { img: `${process.env.BASE}/assets/images/${cats[i].slug}.png` }));
    }
    return res.json({ categories });
});
exports.getCategories = getCategories;
const addAction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { title, price, priceNegotiable, description, category, state } = req.body;
    let result = yield AdsServices.AddAds({ title,
        price,
        priceNegotiable,
        description,
        category,
        state }, req);
    if (result instanceof Error) {
        res.status(400);
        res.json({ error: result.message });
        return;
    }
    res.json({ id: result });
});
exports.addAction = addAction;
const getList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { sort = "asc", offset = 0, limit = 8, q, cat, state } = req.query;
    let result = yield AdsServices.findCustomAds(sort, offset, limit, q, cat, state);
    res.json({ ads: (yield result).ads, total: (yield result).total });
});
exports.getList = getList;
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, other = null } = req.query;
    let result = yield AdsServices.findAd(id, other);
    res.json({ productInfo: result });
});
exports.getItem = getItem;
const editAction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { title, status, price, priceNegotiable, description, category, delImages, state } = req.body;
    let result = yield AdsServices.updateAds(id, {
        title,
        status,
        price,
        category,
        priceNegotiable,
        description,
        delImages,
        state
    }, req);
    if (result instanceof Error) {
        res.status(400);
        res.json({ error: result.message });
        return;
    }
    res.status(201);
    res.json({ error: "" });
});
exports.editAction = editAction;
const adsUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.slice(7);
    let { sort = "asc", offset = 0, limit = 8, status } = req.query;
    let statusBoo = status == "true" ? true : false;
    const user = yield MainServices.findUser(token);
    const adsTotalOn = yield AdsServices.findAllAdsUser(user._id, true);
    const adsTotalOff = yield AdsServices.findAllAdsUser(user._id, false);
    const totalOn = adsTotalOn.length;
    const totalOff = adsTotalOff.length;
    const adsData = yield AdsServices.findCustomAdsUser(user._id, statusBoo, sort, offset, limit);
    let ads = [];
    for (let i in adsData) {
        let image = "";
        if (adsData[i].images[0]) {
            image = `${process.env.BASE}/media/${adsData[i].images[0]}.jpg`;
        }
        else {
            image = `${process.env.BASE}/media/default-img.jpg`;
        }
        ads.push({
            id: adsData[i]._id,
            title: adsData[i].title,
            price: adsData[i].price,
            priceNegotiable: adsData[i].priceNegotiable,
            status: adsData[i].status,
            image
        });
    }
    res.status(200);
    res.json({
        ads,
        total: (statusBoo) ? totalOn : totalOff,
        totalOn, totalOff
    });
});
exports.adsUser = adsUser;
const deleteAds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    AdsServices.deleteAds(id);
    res.json({ error: "" });
});
exports.deleteAds = deleteAds;
