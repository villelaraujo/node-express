import {Router} from "express";
import {showLogin,showNewAcc,createAcc,authenticate,logout,isLogged} from "./controller.js";

export const routes=new Router();

routes.get('/login',isLogged,showLogin);
routes.post('/login',authenticate);
routes.get('/newaccount',showNewAcc);
routes.post('/newaccount',createAcc);
routes.get('/logout',logout);