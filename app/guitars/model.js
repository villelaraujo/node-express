import mongoose from "mongoose";

const guitarSchema=new mongoose.Schema({
  make:String,
  model:String,
  make_lower:String
});
const Guitar=mongoose.model('Guitar',guitarSchema);

export async function getAll(){
  const data=await Guitar.find();
  const guitars=data.map(parseGuitarDB);
  return guitars;
};
export async function getById(id){
  const guitars=await getAll();
  const guitar=guitars.find(g=>g.id===id);
  return guitar;
};
export async function getByMake(make){
  const data=await Guitar.find({make_lower:make.toLowerCase()});
  const byMake=data.map(parseGuitarDB);
  return byMake;
};
export async function addGuitar(make,model){
  await Guitar.create({
    make:make,
    model:model,
    make_lower:make.toLowerCase()
  })
  return true;
}
export async function removeGuitar(id){
  await Guitar.findByIdAndDelete(id);
};
export async function saveGuitar(id,make,model){
  const guitar=await Guitar.findById(id);
  if(guitar){
    guitar.make=make;
    guitar.model=model;
    guitar.make_lower=make.toLowerCase();
    guitar.save();
  }
};
export function parseGuitarDB(data){
  return {id:String(data._id),make:data.make,model:data.model};
};