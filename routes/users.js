var express = require('express');
// const { render } = require('../app');
var router = express.Router();
var userHelpers=require('../helpers/users-helper')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('Welcome to loginpage');
  res.render('users/login',{admin:true})
});
router.get('/login',(req,res)=>{
  res.redirect('/')
})


router.post('/products',(req,res,next)=>{     //login btn action
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

// userHelpers.login(req.body).then((response)=>{
//   console.log(response)
//   if(response.userState){
//     res.render('users/products-page',{products,admin:true})

//   }else{
//     res.redirect('/')
//   }

// })
userHelpers.login(req.body).then((response)=>{
  if(response.status){
    res.render ('users/products-page',{products,admin:true})
  }else{
    res.redirect('/')
  }

})


})

//logut-btn
router.use('/logout',(req,res,next)=>{
  res.redirect('/')
})


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



module.exports = router;
