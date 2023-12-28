import {Router} from 'express';
import { protectedRequest, publicRequest, uploadImageWithCloudinary } from '../controllers/requets.controllers';
import { checkJwtMiddleware } from '../middleware/checkjwt.middleware';



export const requestRouter = Router()

requestRouter.get("/public", publicRequest)
requestRouter.get("/protected", checkJwtMiddleware, protectedRequest)
requestRouter.post("/upload", uploadImageWithCloudinary)



