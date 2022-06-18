import {Router} from 'express'
import * as ApiController from "../controllers/ApiController"
import * as AuthController from '../controllers/AuthController'
import * as UserController from '../controllers/UserController'
import * as AdsController from '../controllers/AdsController'
import { AuthValidator } from '../validators/AuthValidator'
import { privateRoute } from '../config/passport'
import { UserValidator } from '../validators/UserValidator'
import multer from 'multer'

export const upload = multer({
    dest: "./tmp",
    fileFilter: (req, file, cb) => {
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png']
        if(!allowed.includes(file.mimetype)){
            cb(new Error('Envie somente imagens'))
        }
        cb(null, allowed.includes(file.mimetype))
    },
    limits: {fieldSize: 2000000}
})

const router = Router()

router.get("/ping", ApiController.ping)

router.get('/states', UserController.getStates)
router.get('/user/me', privateRoute, UserController.info)
router.post('/user/edit', privateRoute, upload.single("image"), UserValidator.editUser, UserController.editActions)

router.post('/user/signin', AuthValidator.signIn,AuthController.singIn)
router.post('/user/signup', AuthValidator.singUp ,AuthController.singUp)
router.get('/user/anun', privateRoute, AdsController.adsUser)

router.get('/categories', AdsController.getCategories)
router.post('/ad/add', privateRoute, upload.array("images", 5), AdsController.addAction) 
router.get('/ad/list', AdsController.getList) 
router.get('/ad/item', AdsController.getItem) 
router.post('/ad/:id', privateRoute, upload.array("images", 5), AdsController.editAction)
router.post('/del/:id', privateRoute, AdsController.deleteAds)

export default router