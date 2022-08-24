const { Router } = require("express");
var express = require("express");

const { getAllProducts, getAllUsers } = require("../helpers/users-helper");
// const { render } = require('../app');
var userHelper = require("../helpers/users-helper");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("admin/admin-login");
});

router.post("/addUser", (req, res, next) => {
  res.render("admin/admin-usersPanel"); //admin-login page router
});
//add user bn

//router.post("/admin-usersPanel", function (req, res, next) {
  
// });

router.post("/", (req, res) => {
  res.redirect("/admin/usersPanel");
});

router.get("/usersPanel", (req, res) => {
  userHelper.getAllUsers().then((users) => {
    console.log(users);
    res.render("admin/admin-usersPanel", { users });
    console.log(req.body);
  });
});

router.get("/delete-user/:id", (req, res) => {  //DELETE USER
  let userId = req.params.id;
  userHelper.deleteUser(userId).then((response) => {
    res.redirect("/admin/usersPanel");  
  });
});

router.get("/edit-user/:id",async(req,res)=>{       //EDIT USER
  let avatar=await userHelper.getUsers(req.params.id)
  console.log(avatar)
  res.render('admin/admin-editUser',{avatar})
})

router.post("/admin-updateUser/:id",(req,res)=>{ 
    userHelper.updateUser(req.params.id,req.body).then(()=>{
      res.redirect('/admin/usersPanel')
    })
})
router.get('/add/goback'),(req,res)=>{
  res.render("admin/admin-usersPanel")
}

router.get("/admin-addUser", (req, res, next) => {
  res.render("admin/admin-addUser");
});

router.post("/admin-submitUser", (req, res, next) => {
  userHelper.doSignup(req.body).then((resonse) => {
    console.log(resonse);
    res.redirect("/admin/admin-addUser");
  });
});
//go back to users pannel
router.get("/admin/admin-usersPanel", (req, res) => {
  res.redirect("admin/admin-usersPanel",{user});
});



module.exports = router;
