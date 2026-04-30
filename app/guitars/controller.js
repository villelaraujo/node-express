import {getAll,getById,getByMake,addGuitar,saveGuitar,removeGuitar,parseGuitarDB} from "./model.js";

export async function listGuitars(req,res){
  let guitars=await getAll();
  res.render('partials/guitars/guitar-list',{title:'Guitars | Home',h2title:'My Guitars',guitars:guitars});
};
export async function createGuitar(req,res){
  res.render('partials/guitars/create',{title:'Guitars | Create',h1title:'Create Guitar',action:'/guitars',button:'Create'});
};
export async function editGuitar(req,res){
  const id=req.params.id;
  if(!id){
    res.sendStatus(404);
    return;
  }
  const guitar=await getById(id);
  if(!guitar){
    res.sendStatus(404);
    return;
  }

  res.render('partials/guitars/create',{title:'Guitars | Edit',h1title:'Edit Guitar',action:`/guitars/${guitar.id}`,button:'Edit',guitar:guitar});
};
export async function deleteGuitar(req,res){
  const id=req.params.id;
  if(!id){
    res.sendStatus(404);
    return;
  }

  await removeGuitar(id);
  res.redirect('/guitars');
};
export async function updateGuitar(req,res){
  const id=req.params.id;
  if(!validId(id)){
    res.sendStatus(404);
    return;
  }

  const {guitar_make,guitar_model}=req.body;

  if(guitar_make&&guitar_model){
    await saveGuitar(id,guitar_make,guitar_model);
    res.redirect(`/guitars/${id}`);
  }else{
    res.redirect(`/guitars/${id}/edit`);
  }
};
export async function showGuitar(req,res){
  const id=req.params.id;

  if(validId(id)){
    const guitar=await getById(id);
    if(!guitar){
      res.sendStatus(404);
    }else{res.render('partials/guitars/show',{title:`Guitars | ${guitar.model}`,guitar:guitar});}
  }else{
    const byMaker=await getByMake(id);
    if(byMaker.length===0){
      res.sendStatus(404);
    }else{
      res.render('partials/guitars/guitar-list',{title:`Guitars | Made by ${byMaker[0].make}`,guitars:byMaker});
    }
  }
};
export async function storeGuitar(req,res){
  const {guitar_make,guitar_model}=req.body;

  if(guitar_make&&guitar_model){
    await addGuitar(guitar_make,guitar_model);
    res.redirect('/guitars');
  }else{
    res.redirect('/guitars/create');
  }
};
function validId(id){
  if(id.length===24){return true;}else{return false;}
};