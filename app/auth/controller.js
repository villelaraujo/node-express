import { addUser,findUser } from "./model.js";
import { compareHash } from "./crypt.js";

export function checkAuth(req,res,next){
  let isAuth=req.session.user&&req.session.user.isAuth;
  if(isAuth){
    next();
  }else{
    res.redirect('/login');
    res.end();
  }
};
export function isLogged(req,res,next){
  let isAuth=req.session.user&&req.session.user.isAuth;
  if(isAuth){
    res.redirect('/guitars');
  }else{
    next();
  }
};
export async function showLogin(req,res){
  const failed=req.query.failed;
  if(failed){
    res.render('partials/login-err.handlebars',{title:'Guitars | Login'});
    return;
  }else{
    res.render('partials/login.handlebars',{title:'Guitars | Login'});
  return;
  }
};
export async function showNewAcc(req,res){
  res.render('partials/new-acc.handlebars',{title:'Guitars | Create Account',h1title:'Create Account'})
};
export async function createAcc(req,res){
  const {user,email,password}=req.body;

  if(!user||!email||!password){
    res.redirect('/newaccount');
    return;
  }else{
    await addUser(user,email,password);
    res.redirect('/login');
    return;
  }
};
export async function authenticate(req,res){
  const {email,password}=req.body;

  if(!email||!password){
    res.redirect('/login');
    return;
  }
  const login=await findUser(email);

  if(login&&await compareHash(password,login.password)){
    req.session.user={
      email:email,
      username:login.username,
      isAuth:true
    };
    res.redirect('/guitars');
    return;
  }else{
    res.redirect('/login?failed=true');
    return;
  }
};
export async function logout(req,res){
  req.session.destroy();
  res.redirect('/');
  return;
}