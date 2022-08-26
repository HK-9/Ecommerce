const { Router } = require("express");
var express = require("express");
const session = require("express-session");

const { getAllProducts, getAllUsers } = require("../helpers/users-helper");
// const { render } = require('../app');
var userHelper = require("../helpers/users-helper");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;

const userAuth={
  username:"admin",
  password:1234

}
/* GET home page. */
router.get("/", function (req, res, next) {
  if(req.session.adminLoggedIn){
    userHelper.getAllUsers().then((users) => {
      console.log(users);
      res.render("admin/admin-usersPanel", { users,loyout:'dataTable'});
      console.log(req.body);
    });
  }else{
    
    res.render("admin/admin-login",{loginError:req.session.loginError});
    req.session.loginError=true;
  }
});

router.post('/admin-login',(req,res,next)=>{

  if(req.body.username==userAuth.username && req.body.password==userAuth.password){
    req.session.adminLoggedIn=true;
    res.redirect('/admin')
  }else{
    res.redirect('/admin')
  }
})



router.post("/", (req, res) => {
  res.redirect("/admin/usersPanel");
});

router.get("/delete-user/:id", (req, res) => {
  let userId = req.params.id;
  if (req.session.user._id == userId) {

    req.session.userLoggedIn=false

  }

  userHelper.deleteUser(userId).then((response) => {
    if(req.session.adminLoggedIn){
    res.redirect("/admin");  
    }else{
      res.status(404).send('404 Access Denied');
    }
    
  });
});

router.get("/edit-user/:id",async(req,res)=>{       //EDIT USER
  let avatar=await userHelper.getUsers(req.params.id)
  console.log(avatar)
  if(req.session.adminLoggedIn){
  res.render('admin/admin-editUser',{avatar})
  }else{
    res.status(404).send('404 Access Denied');
  }
})

router.post("/admin-updateUser/:id",(req,res)=>{ 
    userHelper.updateUser(req.params.id,req.body).then(()=>{
      if(req.session.adminLoggedIn){
      res.redirect('/admin')
      }else{
        res.status(404).send('404 Access Denied');
      }
    })
})
router.get('/add/goback'),(req,res)=>{
  res.render("admin/admin-usersPanel")
}

router.get("/admin-addUser", (req, res, next) => {
  if(req.session.adminLoggedIn){
  res.render("admin/admin-addUser");
  }else{
    res.status(404).send('404 Access Denied');
  }
});

router.post("/admin-submitUser", (req, res, next) => {
  userHelper.doSignup(req.body).then((resonse) => {
    console.log(resonse);
    if(req.session.adminLoggedIn){
    res.redirect("/admin");
    }else{
      res.status(404).send('404 Access Denied');
    }
  });
});
//go back to users pannel
router.get("/admin/admin-usersPanel", (req, res) => {
  res.redirect("admin/admin-usersPanel",{user});
});


router.get('/adminlogout', function(req, res, next) {
  req.session.adminLoggedIn=false
  res.redirect('/admin')
});



module.exports = router;
