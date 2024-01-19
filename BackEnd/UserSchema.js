const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {type:String, require: true},
    password: {type:String, require: true},
    email : {type:String, require:true},
    age:Number,
    gender:String,
    goal:String,
    plan: [
       {title:String, plan:String, isCompleted:Boolean}
    ],
    mealplan: [
        {title:String, plan:String}
    ]
 })

 const User = mongoose.model('User', UserSchema);
 module.exports = User;