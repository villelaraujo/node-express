import bcryptjs from "bcryptjs";
const {compare,hash,genSalt}=bcryptjs;

export async function genHash(plainText){
  const salt=await genSalt(12);
  return await hash(plainText,salt);
};

export async function compareHash(plainText,hash){
  return await compare(plainText,hash);
};