import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import dotenv from "dotenv"
import {create} from "express-handlebars";
import {routes as guitarRoutes} from "./guitars/routes.js"
import {routes as authRoutes} from "./auth/routes.js"

dotenv.config();
const app=express();
const PORT=process.env.PORT;
const hbs=create();
const uri=`mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@cluster0.5tpjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

await mongoose.connect(uri);

app.use(express.static('./public'));
app.use(express.urlencoded({extended:false}));
app.use(session({
  secret:process.env.SESSION_KEY,
  saveUninitialized:false,
  resave:false
}));
app.engine('handlebars',hbs.engine);
app.set('view engine', 'handlebars');
app.set('views','./app/views');

app.use('/guitars',guitarRoutes);
app.use('/',authRoutes);

app.get('/',(req,res)=>{
  res.redirect('/login');
});
app.get('*',(req,res)=>{
  res.redirect('/guitars');
})

export function start(){
  app.listen(PORT,()=>{
    console.log(`Listening at http://localhost:${PORT}`)
  });
};