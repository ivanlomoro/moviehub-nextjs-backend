import {Router} from 'express';
import { protectedRequest, publicRequest, uploadImageWithCloudinary } from '../controllers/requets.controllers';



export const requestRouter = Router()

requestRouter.get("/public", publicRequest)
requestRouter.get("/protected", protectedRequest)
requestRouter.post("/upload", uploadImageWithCloudinary)



