require("dotenv").config()
var express = require('express');
var app = express();
const uuid= require("uuid");
const fs =require("fs");
var cors = require('cors');
const upload = require("express-fileupload")
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(upload())
const jwt = require('jsonwebtoken');
const { cos } = require("mathjs");
const TOKEN = '69c65fbc9aeea59efdd9d8e04133485a09ffd78a70aff5700ed1a4b3db52d33392d67f12c1'
function autificationToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, TOKEN, (err, user) => {
        if (err) res.sendStatus(403)
    })
    next()
}

// Users
app.get("/users/help", (req, res) => {
    var data = {
        "email": "email yuboriladi",
        "password": "parol uchun password",
        "sarlavha": "Mr,Mrs shunga o`xshashnarsala",
        "jinsi": "ayol erkak",
        "ism": "user ismi",
        "fam": "familiyasi",
        "yangiliklar": "emailga yangiliklar yuborilsinmi true yoki false",
        "maxfilik": "maxfilik malumotlariga rozimisiz true yoki false"
    }
    res.send(data)
})
app.get('/users', (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Users.json', "utf-8"))
    res.status(200).send(User)
})
app.post('/users', (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Users.json', "utf-8"))
        var data = {
            "id": uuid.v1(),
            "email": req.body.email,
            "password": req.body.password,
            "sarlavha":req.body.sarlavha,
            "jinsi":req.body.jinsi,
            "ism":req.body.ism,
            "fam":req.body.fam,
            "yangiliklar": req.body.yangiliklar,
            "maxfilik": req.body.maxfilik
        }
        User.unshift(data)
        fs.writeFileSync("./Users.json", JSON.stringify(User, 0, 2), "utf-8")
        res.status(201).send("Yaratildi")
  
})
app.get("/users/:id",(req,res)=>{
    const User = JSON.parse(fs.readFileSync('./Users.json', "utf-8"))
 var kluch=true
    for (let i = 0; i < User.length; i++) {
    if (User[i].id===req.params.id) {
    res.status(200).send(User[i]) 
    User.unshift(data)
    fs.writeFileSync("./Users.json", JSON.stringify(User, 0, 2), "utf-8")
    res.status(201).send("Yaratildi")
kluch=false 
}}
 
    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})
app.delete('/users/:id', (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Users.json', "utf-8"))
    var kluch=true
    User.map((item, key) => {
        if (item.id === req.params.id) {
            User.splice(key, 1)
            fs.writeFileSync("./Users.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(200).send("Ok")
            kluch=false
        }
    })
    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})
app.put("/users/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Users.json', "utf-8"))
    var kluch=true
    for (let i = 0; i < User.length; i++) {
        if (User[i].id === req.params.id) {
            User[i].email =req.body.email ?req.body.email:User[i].email
            User[i].password = req.body.password ? req.body.password : User[i].password
            User[i].sarlavha = req.body.sarlavha ? req.body.sarlavha : User[i].sarlavha
            User[i].jinsi = req.body.jinsi ? req.body.jinsi : User[i].jinsi
            User[i].ism =req.body.ism ?req.body.ism:User[i].ism
            User[i].fam = req.body.fam ? req.body.fam : User[i].fam
            User[i].yangiliklar = req.body.yangiliklar ? req.body.yangiliklar : User[i].yangiliklar
            User[i].maxfilik = req.body.maxfilik ? req.body.maxfilik : User[i].maxfilik
            fs.writeFileSync("./Users.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(201).send("Yaratildi")
            kluch=false
        }

    }
    if(kluch){
        res.status(403).send("ID topilmadi")
    }
})


// Address
app.get("/address/help", (req, res) => {
    var data = {
        "UserId":"userni idsini yuborish kerak",
        "sarlavha": "Mr,Mrs shunga o`xshashnarsala",
        "jinsi": "ayol erkak",
        "ism": "user ismi",
        "fam": "familiyasi",
        "manzil1": "manzil yuboriladi",
        "manzil2": "manzil2 uchun password",
        "shahar": "yozish kerak",
        "mamlakat": "Mamlakatladan kiritish kerak /mamlakat dan get",
        "index": "index raqam",
        "birlamchi": "ha yoki yoq",
    }
    res.send(data)
})
app.get('/address', (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Address.json', "utf-8"))
    res.status(200).send(User)
})
app.post('/address', (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Address.json', "utf-8"))
    var data = {
        "id":uuid.v4(),
        "UserId":req.body.userId,
        "sarlavha": req.body.sarlavha,
        "jinsi": req.body.jinsi,
        "ism": req.body.ism,
        "fam": req.body.fam,
        "manzil1": req.body.manzil1,
        "manzil2": req.body.manzil2,
        "shahar": req.body.shahar,
        "mamlakat": req.body.mamlakat,
        "index": req.body.index,
        "birlamchi": req.body.birlamchi,
    }
    User.unshift(data)
    fs.writeFileSync("./Address.json", JSON.stringify(User, 0, 2), "utf-8")
    res.status(201).send("Yaratildi")

})
app.get("/address/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Address.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.length; i++) {
        if (User[i].id === req.params.id) {
            res.status(200).send(User[i])
            User.unshift(data)
            fs.writeFileSync("./Address.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(201).send("Yaratildi")
            kluch = false
        }
    }

    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})
app.delete('/address/:id', (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Address.json', "utf-8"))
    var kluch = true
    User.map((item, key) => {
        if (item.id === req.params.id) {
            User.splice(key, 1)
            fs.writeFileSync("./Address.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(200).send("Ok")
            kluch = false
        }
    })
    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})
app.put("/address/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Address.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.length; i++) {
        if (User[i].id === req.params.id) {
            User[i].UserId = req.body.UserId ? req.body.UserId : User[i].UserId
            User[i].sarlavha = req.body.sarlavha ? req.body.sarlavha : User[i].sarlavha
            User[i].jinsi = req.body.jinsi ? req.body.jinsi : User[i].jinsi
            User[i].ism = req.body.ism ? req.body.ism : User[i].ism
            User[i].fam = req.body.fam ? req.body.fam : User[i].fam
            User[i].manzil1 = req.body.manzil1 ? req.body.manzil1 : User[i].manzil1
            User[i].manzil2 = req.body.manzil2 ? req.body.manzil2 : User[i].manzil2
            User[i].shahar = req.body.shahar ? req.body.shahar : User[i].shahar
            User[i].mamlakat = req.body.mamlakat ? req.body.mamlakat : User[i].mamlakat
            User[i].index = req.body.index ? req.body.index : User[i].index
            User[i].birlamchi = req.body.birlamchi ? req.body.birlamchi : User[i].birlamchi
            fs.writeFileSync("./Address.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(201).send("Yaratildi")
            kluch = false
        }

    }
    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})


// dollor
app.get('/dollor', (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Dollor.json', "utf-8"))
    res.status(200).send(User)
})
app.post('/dollor', (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Address.json', "utf-8"))
    var data = {
       dollor:1
    }
    fs.writeFileSync("./Address.json", JSON.stringify(data, 0, 2), "utf-8")
    res.status(201).send("Yaratildi")

})


app.get("/dokon/help",(req,res)=>{
    res.send("https://www.diamondsfactory.co.uk/customer-care/viewings")
})

























app.listen(PORT, function () {
    console.log(`Listening to Port ${PORT}`);
});