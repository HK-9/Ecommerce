var db=require('../config/connection')   
var collection=require('../config/collection') 
const bcrypt=require('bcrypt')
var objectId = require('mongodb').ObjectId

module.exports={
    // login:(body)=>{

    //     const response={userState:false}
    //     return new Promise(async(resolve,reject)=>{
    //      const user= await  db.get().collection(collection.USERS_COLLECTTION).findOne({userName:body.username})
    //      if(user){
    //         response.userState=true
    //         console.log('ok');
    //         resolve(response)
            
    //      }else{
    //         resolve(response)
    //      }
    //     })

    // },
    login:(body)=>{                                                         //loginpage validation
        return new Promise(async(resolve,reject)=>{
            let response={
            //     user: null,
            //  loginstatus:false

            }
            let user=await db.get().collection(collection.USERS_COLLECTTION).findOne({userName:body.username})
            if(user){
                bcrypt.compare(body.password,user.password).then((status)=>{
                    if(status){
                        console.log('login success')
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log('password failed');
                        response.status = false;
                        resolve(response);
                    }
                })
            }else{
                console.log('user not');
                response.status = false;
                resolve(response);

            }
        })
    },
    doSignup:(userData)=>{
        // let password=password.toString();
        console.log(userData);
      return new Promise(async(resolve,reject)=>{
       userData.password= await bcrypt.hash(userData.password,10)
        console.log(userData);
       await db.get().collection(collection.USERS_COLLECTTION).insertOne(userData).then((data)=>{
            resolve(data)
        })
      })  
    }, 
    // addUser:(user,callback)=>{
    //     console.log(user);
    //     db.get().collection('user').insertOne(user).then((data)=>{
    //         callback(data)
    //     })
    // },
    addUser:(userData)=>{
        // let password=password.toString();
        console.log(userData);
      return new Promise(async(resolve,reject)=>{
       userData.password= await bcrypt.hash(userData.password,10)
        console.log(userData);
       await db.get().collection(collection.USERS_COLLECTTION).insertOne(userData).then((data)=>{
            resolve(data)
        })
      })  
    }, 

    getAllUsers:()=>{
        return new Promise((resolve,reject)=>{
            let userss=db.get().collection(collection.USERS_COLLECTTION).find().toArray()
            resolve(userss)
        })
    },
    
    deleteUser:(userId)=>{                                                          //delete users
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USERS_COLLECTTION).remove({_id:objectId(userId)}).then((response)=>{
                resolve(response)
            })
        })
        },

        // editUser:(userId)=>{                                                          //delete users
        //     return new Promise((resolve,reject)=>{
        //         db.get().collection(collection.USERS_COLLECTTION).remove({_id:objectId(userId)}).then((response)=>{
        //             resolve(response)
        //         })
        //     })
        //     },
        getUsers:(userId)=>{
            return new Promise((ressolve,reject)=>{
            db.get().collection(collection.USERS_COLLECTTION).findOne({_id:objectId(userId)}).then((user)=> {
                ressolve(user)
            })
        })
        },

            updateUser:(userId,userDetails)=>{
                return new Promise((resolve,reject)=>{
               db.get().collection(collection.USERS_COLLECTTION).updateOne({_id:objectId(userId)},{
                $set:{
                    userName:userDetails.userName,
                    firstName:userDetails.firstName,
                    lastName:userDetails.lastName,
                    // email:userDetails.email
                }
                }).then((response)=>{
                    resolve() 
                })
            
                })
            },
           

}   