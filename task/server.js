const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const UserEmailDomains = require('./models/UserEmailDomains')
const users = require('./user')
const User = users.User

//Load config
dotenv.config({
    path: './config/config.env'
})

//Connect to MongoDB database
connectDB()

//Using Express
const server = express()

//URL address
const url = "https://jsonplaceholder.typicode.com/users/1";

//Create new instance of User
const newUser = new User(url)
//Get json data 
newUser.userData.then(function(userJsonData) {
    //Display json data and generate QR code
    users.getPersonData(userJsonData)
    //Get user email domain
    let domain = newUser.getDomain(userJsonData)

    //--------------Saving user email domain in MongoDB Database------------//
    //Look for the same domain in database
    UserEmailDomains.findOne({
        domain: domain
    })
    .then(user => {
        //If there is the same domain, update counter
        if (user) {
            UserEmailDomains.findOneAndUpdate({domain: domain}, {$inc:{count: 1}}, {new: true}, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
                console.log(doc);
            });
        //If there isn't, save new one
        } else {
            const newUserEmailDomain = new UserEmailDomains({ domain: domain})
            newUserEmailDomain.save().catch(err => console.log(err))
            console.log(newUserEmailDomain)
        }
    })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, console.log(`Server running on port ${PORT}`))