var express = require('express');
// const { render } = require('../app');
var router = express.Router();
var userHelpers=require('../helpers/users-helper')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('Welcome to loginpage');
  if(req.session.userLoggedIn){
  res.render ('users/products-page',{products,admin:true})
  }
  else{
    res.render ('users/login',{admin:true,loginError:req.session.loginError})
    req.session.loginError=true;
  }

  

})


router.post('/login',(req,res,next)=>{ 
  userHelpers.login(req.body).then((response)=>{
    if(response.status){
      req.session.userLoggedIn=true;
      req.session.user=response.user
      console.log("log data" +req.session.user);
      res.redirect('/')
    }else{
      req.session.err=true
      res.redirect('/')
    }
  
  })
})
  
  
  
      //login btn action
  const products=[ 
    {
            name:'Samsung Galaxy S22 Plus',
            category:'mobile',
            discription:'₹85,990.00',
            image:'https://m.media-amazon.com/images/I/41JjG6-q93L.jpg'
    },
    {
        name:'Samsung Galaxy S22 Plus',
        category:'mobile',
        discription:'₹50,990.00',
        image:'https://m.media-amazon.com/images/I/413fd9o3AgL._AC_SR320,320_.jpg'
    },{
        name:'iQOO Z6 Pro 5G',
        category:'mobile',
        discription:'₹33,990.00',
        image:'https://m.media-amazon.com/images/I/41XtHlbmOHL._AC_SR320,320_.jpg'
    },
    {
        name:'Samsun Glaxy M53',
        category:'mobile',
        discription:'₹21,990.00',
        image:'https://images.samsung.com/is/image/samsung/p6pim/in/sm-m536bzbeinu/gallery/in-galaxy-m53-5g-sm-m536-sm-m536bzbeinu-thumb-532180475?$320_320_PNG$'
    }

]



//signup
router.get('/signup',(req,res,next)=>{
  res.render('users/signup',{admin:true});

})
//signup page using
router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((resonse)=>{
    console.log(resonse);
    res.redirect('/signup')
  })
})


router.get('/logout', function(req, res, next) {
  req.session.userLoggedIn=false
  res.redirect('/')
});


module.exports = router;
