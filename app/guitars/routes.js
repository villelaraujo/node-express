import {Router} from "express";
import {createGuitar, listGuitars,showGuitar, storeGuitar, editGuitar,updateGuitar,deleteGuitar} from "./controller.js";
import {checkAuth} from "../auth/controller.js";
export const routes=new Router();

routes.get('/',checkAuth,listGuitars);
routes.post('/',checkAuth,storeGuitar);
routes.get('/create',checkAuth,createGuitar);
routes.get('/:id/edit',checkAuth,editGuitar);
routes.get('/:id/delete',checkAuth,deleteGuitar);
routes.get('/:id',checkAuth,showGuitar);
routes.post('/:id',checkAuth,updateGuitar);