import {Router} from 'express';
import { protectedRequest, publicRequest } from '../controllers/requets.controllers';
import { checkJwtMiddleware } from '../middleware/checkjwt.middleware';


export const requestRouter = Router()

requestRouter.get("/public", publicRequest)
requestRouter.get("/protected", checkJwtMiddleware, protectedRequest)



