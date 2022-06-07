import {Router} from 'express'
import * as ApiController from "../controllers/ApiController"
import * as AuthController from '../controllers/AuthController'
import * as UserController from '../controllers/UserController'
import * as AdsController from '../controllers/AdsController'
import { AuthValidator } from '../validators/AuthValidator'
import { privateRoute } from '../config/passport'
import { UserValidator } from '../validators/UserValidator'
import { AdsValidator } from '../validators/AdsValidator'
import multer from 'multer'

const upload = multer({
    dest: "./tmp",
    fileFilter: (req, file, cd) => {
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png']
        cd(null, allowed.includes(file.mimetype))
    },
    limits: {fieldSize: 2000000}
})

const router = Router()

router.get("/ping", ApiController.ping)

router.get('/states', UserController.getStates)
router.get('/user/me', privateRoute, UserController.info)
router.post('/user/edit', privateRoute, upload.single("image"), UserValidator.editUser, UserController.editActions)
// router.get('/findUser', privateRoute, UserController.findUser)

router.post('/user/signin', AuthValidator.signIn,AuthController.singIn)
router.post('/user/signup', AuthValidator.singUp ,AuthController.singUp)
router.get('/user/anun', privateRoute, AdsController.adsUser)

router.get('/categories', AdsController.getCategories)
router.post('/ad/add', privateRoute, upload.array("images", 5),/*AdsValidator.addItem,*/ AdsController.addAction) 
router.get('/ad/list', AdsController.getList) 
router.get('/ad/item', AdsController.getItem) 
router.post('/ad/:id', privateRoute, upload.array("images", 5),/*AdsValidator.editItem,*/AdsController.editAction)
router.post('/del/:id', privateRoute, AdsController.deleteAds)



export default router