import mongoose from "mongoose";
import { genHash } from "./crypt.js";

const userSchema=new mongoose.Schema({
  email:String,
  username:String,
  password:String,
});
export const User=mongoose.model('User',userSchema);

export async function addUser(user,email,password){
  const hashedPass=await genHash(password);
  await User.create({
    email:email,
    username:user,
    password:hashedPass
  });
  return;
};
export async function findUser(userEmail){
  return await User.findOne({email:userEmail}).exec();
};