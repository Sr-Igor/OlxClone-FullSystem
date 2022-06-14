"use strict";
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
exports.findUser = exports.deleteAds = exports.findCustomAdsUser = exports.findAllAdsUser = exports.updateAds = exports.findAd = exports.findCustomAds = exports.AddAds = exports.findAllAds = exports.getAllCategories = void 0;
const Category = require('../models/category');
const Ads = require("../models/ads");
const State = require("../models/state");
const User = require("../models/user");
const mongoose_1 = __importDefault(require("mongoose"));
const promises_1 = require("fs/promises");
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Category.find();
});
exports.getAllCategories = getAllCategories;
const findAllAds = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Ads.find();
});
exports.findAllAds = findAllAds;
const AddAds = (data, req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.slice(7);
    let user = yield User.findOne({ token });
    if (!data.title || !data.category) {
        return new Error("Titulo e/ou categoria inválido(s)");
    }
    let price = 0;
    if (data.price) {
        price = parseFloat(data.price.replace(".", "").replace(",", ".").replace("R$", ""));
    }
    // Verify available State
    if (data.state) {
        if (mongoose_1.default.Types.ObjectId.isValid(data.state)) {
            const stateItem = yield State.findById(data.state);
            if (!stateItem) {
                return new Error("Estado inválido");
            }
        }
        else {
            return new Error("Código de estado inválido");
        }
    }
    //Verify available Category 
    if (data.category) {
        if (mongoose_1.default.Types.ObjectId.isValid(data.category)) {
            const categoryItem = yield Category.findById(data.category);
            if (!categoryItem) {
                return new Error("Categoria inválida");
            }
        }
        else {
            return new Error("Código de categoria inválido");
        }
    }
    // Images 
    let images = [];
    if (req.files) {
        let files = req.files;
        files.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            images.push(item.filename);
            yield (0, sharp_1.default)(item.path)
                // .resize()
                .toFormat("jpeg")
                .toFile(`./public/media/${item.filename}.jpg`);
            yield (0, promises_1.unlink)(item.path);
        }));
    }
    else {
        return new Error("Arquivo inválido");
    }
    let ads = yield new Ads({
        status: true,
        idUser: user._id,
        state: data.state,
        dateCreated: new Date(),
        title: data.title,
        category: data.category,
        price,
        priceNegotiable: (data.priceNegotiable == "true") ? true : false,
        description: data.description,
        views: 0,
        images
    });
    ads.save();
    return ads._id;
});
exports.AddAds = AddAds;
const findCustomAds = (sort, offset, limit, q, cat, state) => __awaiter(void 0, void 0, void 0, function* () {
    let options = { status: true };
    let total = 0;
    if (q) {
        options.title = { '$regex': q, '$options': 'i' };
    }
    if (cat) {
        const c = yield Category.findOne({ slug: cat });
        if (c) {
            options.category = c._id;
        }
    }
    if (state) {
        const s = yield State.findOne({ name: state });
        if (s) {
            options.state = s._id;
        }
    }
    const adsTotal = yield Ads.find();
    total = adsTotal.length;
    let adsData = yield Ads.find(options)
        .sort({ dateCreated: (sort == "desc" ? -1 : 1) })
        .skip(Number(offset))
        .limit(Number(limit));
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
            image
        });
    }
    return { ads, total };
});
exports.findCustomAds = findCustomAds;
const findAd = (id, other) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        return new Error("Item não encontrado");
    }
    let item = yield Ads.findById(id);
    if (!item) {
        return new Error("Item não encontrado");
    }
    let images = [];
    for (let i in item.images) {
        images.push(`${process.env.BASE}/media/${item.images[i]}.jpg`);
    }
    if (images.length == 0) {
        images.push(`${process.env.BASE}/media/default-img.jpg`);
    }
    let category = yield Category.findById(item.category);
    let userInfo = yield User.findById(item.idUser);
    let stateUser = yield State.findById(userInfo.state);
    let stateProduct = yield State.findById(item.state);
    let imageUser;
    if (userInfo.image !== "") {
        imageUser = `${process.env.BASE}/media/${userInfo.image}.jpg`;
    }
    else {
        imageUser = "";
    }
    let others = [];
    if (other === "true") {
        const otherProducts = yield Ads.find({ status: true, idUser: item.idUser }).limit(4);
        for (let i in otherProducts) {
            if (otherProducts[i]._id.toString() !== item._id.toString()) {
                let image = "";
                if (otherProducts[i].images[0]) {
                    image = `${process.env.BASE}/media/${otherProducts[i].images[0]}.jpg`;
                }
                else {
                    image = `${process.env.BASE}/media/default-img.jpg`;
                }
                others.push({
                    id: otherProducts[i]._id,
                    title: otherProducts[i].title,
                    price: otherProducts[i].price,
                    priceNegotiable: otherProducts[i].priceNegotiable,
                    image
                });
            }
        }
    }
    let productInfo = {
        id: item._id,
        title: item.title,
        price: item.price,
        priceNegotiable: item.priceNegotiable,
        description: item.description,
        dateCreated: item.dateCreated,
        views: item.views,
        images,
        category: category.slug,
        state: stateProduct.name,
        status: item.status,
        userInfo: {
            name: userInfo.name,
            email: userInfo.email,
            state: stateUser.name,
            image: imageUser
        },
        others
    };
    item.views++;
    yield item.save();
    return productInfo;
});
exports.findAd = findAd;
const updateAds = (id, data, req) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.slice(7);
    if (id.length < 12) {
        return new Error("Id inválido");
    }
    let item = yield Ads.findById(id);
    if (!item) {
        return new Error("Item inválido");
    }
    let user = yield User.findOne({ token });
    if (user._id.toString() !== item.idUser) {
        return new Error("Anúncio não pertence ao usuário logado");
    }
    let updates = {};
    if (data.title) {
        updates.title = data.title;
    }
    if (data.price) {
        let price = parseFloat(data.price.replace(".", "").replace(",", ".").replace("R$", ""));
        updates.price = price;
    }
    if (data.priceNegotiable) {
        updates.priceNegotiable = (data.priceNegotiable == "true") ? true : false;
    }
    if (data.status) {
        updates.status = (data.status == "true") ? true : false;
    }
    if (data.category) {
        const category = yield Category.findOne({ slug: data.category });
        if (!category) {
            return new Error("Categoria inválida");
        }
        updates.category = category._id;
    }
    if (data.state) {
        const stateLoc = yield State.findOne({ name: data.state });
        if (!stateLoc) {
            return new Error("Estado inválido");
        }
        updates.state = stateLoc._id;
    }
    if (data.description) {
        updates.description = data.description;
    }
    //Images 
    //(new Images)
    let Newimages = [];
    if (req.files) {
        let files = req.files;
        let adsItem = yield Ads.findById(id);
        let itemImages = adsItem.images;
        let currentImages = (5 - itemImages.length);
        if (files.length > currentImages) {
            return new Error("Limite de imagens exedido");
        }
        files.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            Newimages.push(item.filename);
            updates.images = [...adsItem.images, ...Newimages];
            yield (0, sharp_1.default)(item.path)
                .resize(500)
                .toFormat("jpeg")
                .toFile(`./public/media/${item.filename}.jpg`);
            yield (0, promises_1.unlink)(item.path);
        }));
    }
    //(delete Images)
    let editImages = [];
    if (data.delImages) {
        let delImages = data.delImages.split(",");
        let adsItem = yield Ads.findById(id);
        let itemImages = adsItem.images;
        let formatLink = [];
        for (let i in delImages) {
            formatLink.push(delImages[i].replace(`${process.env.BASE}/media/`, "").replace(".jpg", ""));
        }
        for (let i in itemImages) {
            if (!formatLink.includes(itemImages[i])) {
                editImages.push(itemImages[i]);
            }
            else {
                fs_1.default.unlink(`./public/media/${itemImages[i]}.jpg`, (err) => {
                    if (err)
                        throw err;
                });
            }
        }
        updates.images = [...editImages, ...Newimages];
    }
    yield Ads.findByIdAndUpdate(id, { $set: updates });
});
exports.updateAds = updateAds;
const findAllAdsUser = (idUser, status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Ads.find({ idUser, status });
});
exports.findAllAdsUser = findAllAdsUser;
const findCustomAdsUser = (idUser, status, sort, offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Ads.find({ idUser, status })
        .sort({ dateCreated: (sort == "desc" ? -1 : 1) })
        .skip(Number(offset))
        .limit(Number(limit));
});
exports.findCustomAdsUser = findCustomAdsUser;
const deleteAds = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let ads = yield Ads.findById(id);
    if (ads.images) {
        for (let i in ads.images) {
            fs_1.default.unlink(`./public/media/${ads.images[i]}.jpg`, (err) => {
                if (err)
                    throw err;
            });
        }
    }
    return yield Ads.findByIdAndDelete(id);
});
exports.deleteAds = deleteAds;
const findUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.findOne({ token });
});
exports.findUser = findUser;
