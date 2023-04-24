require("dotenv").config()
var express = require('express');
var app = express();
const cheerio = require("cheerio")
const uuid = require("uuid");
const fs = require("fs");
var cors = require('cors');
const upload = require("express-fileupload")
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(upload())
app.use(express.static('public'));
const jwt = require('jsonwebtoken');
const { cos } = require("mathjs");
const { default: axios } = require("axios");
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
        "sarlavha": req.body.sarlavha,
        "jinsi": req.body.jinsi,
        "ism": req.body.ism,
        "fam": req.body.fam,
        "yangiliklar": req.body.yangiliklar,
        "maxfilik": req.body.maxfilik
    }
    User.unshift(data)
    fs.writeFileSync("./Users.json", JSON.stringify(User, 0, 2), "utf-8")
    res.status(201).send("Yaratildi")

})
app.get("/users/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Users.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.length; i++) {
        if (User[i].id === req.params.id) {
            res.status(200).send(User[i])
        }
    }

    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})
app.delete('/users/:id', (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Users.json', "utf-8"))
    var kluch = true
    User.map((item, key) => {
        if (item.id === req.params.id) {
            User.splice(key, 1)
            fs.writeFileSync("./Users.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(200).send("Ok")
            kluch = false
        }
    })
    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})
app.put("/users/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Users.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.length; i++) {
        if (User[i].id === req.params.id) {
            User[i].email = req.body.email ? req.body.email : User[i].email
            User[i].password = req.body.password ? req.body.password : User[i].password
            User[i].sarlavha = req.body.sarlavha ? req.body.sarlavha : User[i].sarlavha
            User[i].jinsi = req.body.jinsi ? req.body.jinsi : User[i].jinsi
            User[i].ism = req.body.ism ? req.body.ism : User[i].ism
            User[i].fam = req.body.fam ? req.body.fam : User[i].fam
            User[i].yangiliklar = req.body.yangiliklar ? req.body.yangiliklar : User[i].yangiliklar
            User[i].maxfilik = req.body.maxfilik ? req.body.maxfilik : User[i].maxfilik
            fs.writeFileSync("./Users.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(201).send("Yaratildi")
            kluch = false
        }

    }
    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})


// Address
app.get("/address/help", (req, res) => {
    var data = {
        "UserId": "userni idsini yuborish kerak",
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
        "id": uuid.v4(),
        "UserId": req.body.userId,
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
    const User = JSON.parse(fs.readFileSync('./Dollor.json', "utf-8"))
    var data = {
        dollor:req.body.dollor*1
    }
    fs.writeFileSync("./Dollor.json", JSON.stringify(data, 0, 2), "utf-8")
    res.status(201).send("Yaratildi")

})


// Dokon
app.get("/dokon/help", (req, res) => {
    res.send('https://www.diamondsfactory.co.uk/customer-care/viewings va  https://www.diamondsfactory.co.uk/customer-care/viewings/norwich"id": uuid.v4(),        "title": req.body.title"img": img2,"headerimg": img3,"sharxh1": req.body.sharxh1"sharxp": req.body.sharxp,sharxh12": req.body.sharxh12"sharxp2": req.body.sharxp2,"sharxp3": req.body.sharxp3"izohlar": [],ishVaqti": [],"tel1": req.body.tel1"tel2": req.body.tel2,"position": req.body.position,"mail": req.body.mail,"mamlakat": req.body.mamlakat,"manzil": req.body.manzil,"index": req.body.index,"birlamchi": req.body.birlamchi, ')
})
app.get("/dokon", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Dokon.json', "utf-8"))
    res.status(200).send(User)
})
app.post('/dokon', (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Dokon.json', "utf-8"))
    const { img, headerimg } = req.files;
    var rendom = Math.floor(Math.random() * 1000000);
    var img2 = rendom + img.name;
    var img3 = rendom + headerimg.name
    img.mv(__dirname + '/public/' + img2);
    headerimg.mv(__dirname + '/public/' + img3);
    var data = {
        "id": uuid.v4(),
        "title": req.body.title,
        "img": img2,
        "headerimg": img3,
        "sharxh1": req.body.sharxh1,
        "sharxp": req.body.sharxp,
        "sharxh12": req.body.sharxh12,
        "sharxp2": req.body.sharxp2,
        "sharxp3": req.body.sharxp3,
        "izohlar": [],
        "ishVaqti": [],
        "tel1": req.body.tel1,
        "tel2": req.body.tel2,
        "position": req.body.position,
        "mail": req.body.mail,
        "mamlakat": req.body.mamlakat,
        "manzil": req.body.manzil,
        "index": req.body.index,
        "birlamchi": req.body.birlamchi,
    }
    User.unshift(data)
    fs.writeFileSync("./Dokon.json", JSON.stringify(User, 0, 2), "utf-8")
    res.status(201).send("Yaratildi")

})
app.get("/dokon/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Dokon.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.length; i++) {
        if (User[i].id === req.params.id) {
            res.status(200).send(User[i])
            fs.writeFileSync("./Dokon.json", JSON.stringify(User, 0, 2), "utf-8")
        }
    }

    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})
app.delete('/dokon/:id', (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Dokon.json', "utf-8"))
    var kluch = true
    User.map((item, key) => {
        if (item.id === req.params.id) {
            fs.unlink(`./public/${item.img}`, function (err) {
                if (err && err.code == 'ENOENT') {
                    console.info("File doesn't exist, won't remove it.");
                } else if (err) {
                    console.error("Error occurred while trying to remove file");
                } else {
                    console.info(`removed`);
                }
            });
            fs.unlink(`./public/${item.headerimg}`, function (err) {
                if (err && err.code == 'ENOENT') {
                    console.info("File doesn't exist, won't remove it.");
                } else if (err) {
                    console.error("Error occurred while trying to remove file");
                } else {
                    console.info(`removed`);
                }
            });
            User.splice(key, 1)
            fs.writeFileSync("./Dokon.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(200).send("Ok")
            kluch = false
        }
    })
    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})
app.put("/dokon/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Dokon.json', "utf-8"))
    var kluch = true
    const { img, headerimg } = req.files;
    for (let i = 0; i < User.length; i++) {
        if (User[i].id === req.params.id) {
            User[i].title = req.body.title ? req.body.title : User[i].title
            if (img) {
                img.mv(__dirname + '/public/' + User[i].img);
            }
            if (headerimg) {
                headerimg.mv(__dirname + '/public/' + User[i].headerimg);
            }
            User[i].sharxh1 = req.body.sharxh1 ? req.body.sharxh1 : User[i].sharxh1
            User[i].sharxp = req.body.sharxp ? req.body.sharxp : User[i].sharxp
            User[i].sharxh12 = req.body.sharxh12 ? req.body.sharxh12 : User[i].sharxh12
            User[i].sharxp2 = req.body.sharxp2 ? req.body.sharxp2 : User[i].sharxp2
            User[i].sharxp3 = req.body.sharxp3 ? req.body.sharxp3 : User[i].sharxp3
            User[i].tel1 = req.body.tel1 ? req.body.tel1 : User[i].tel1
            User[i].tel2 = req.body.tel2 ? req.body.tel2 : User[i].tel2
            User[i].position = req.body.position ? req.body.position : User[i].position
            User[i].mail = req.body.mail ? req.body.mail : User[i].mail
            User[i].mamlakat = req.body.mamlakat ? req.body.mamlakat : User[i].mamlakat
            User[i].manzil = req.body.manzil ? req.body.manzil : User[i].manzil
            User[i].index = req.body.index ? req.body.index : User[i].index
            User[i].manzil = req.body.manzil ? req.body.manzil : User[i].manzil

            fs.writeFileSync("./Dokon.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(201).send("o`zgardi")
            kluch = false
        }

    }
    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})


// dokon izohlar
app.get("/dokon/izohlar/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Dokon.json', "utf-8"))
    var kluch = true
    User.map(item => {
        if (item.id === req.params.id) {
            res.status(200).send(item.izohlar)
            kluch = false
        }
    })
    if (kluch) {
        res.status(403).send("id aniqlanmadi")
    }
})
app.delete("/dokon/izohlar/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Dokon.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.length; i++) {
        for (let j = 0; j < User[i].izohlar.length; j++) {
            if (User[i].izohlar[j].id === req.params.id) {
                User[i].izohlar.splice(j, 1)
                fs.writeFileSync("./Dokon.json", JSON.stringify(User, 0, 2), "utf-8")
                res.status(200).send("Ok")
                kluch = false
            }
        }
    }


    if (kluch) {
        res.status(403).send("id aniqlanmadi")
    } else {

    }
})
app.post("/dokon/izohlar/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Dokon.json', "utf-8"))
    var kluch = true
    User.map(item => {
        if (item.id === req.params.id) {
            var data = {
                "id": uuid.v4(),
                "text": req.body.text,
                'title': req.body.title,
                'date': req.body.date,
                "star": req.body.star
            }
            item.izohlar.push(data)
            fs.writeFileSync("./Dokon.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(200).send("Ok")
            kluch = false
        }
    })
    if (kluch) {
        res.status(403).send("id aniqlanmadi")
    }
})


// dokon ish vaqti
app.get("/dokon/ishvaqti/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Dokon.json', "utf-8"))
    var kluch = true
    User.map(item => {
        if (item.id === req.params.id) {
            res.status(200).send(item.ishvaqti)
            kluch = false
        }
    })
    if (kluch) {
        res.status(403).send("id aniqlanmadi")
    }
})
app.delete("/dokon/ishvaqti/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Dokon.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.length; i++) {
        for (let j = 0; j < User[i].ishVaqti.length; j++) {
            if (User[i].ishVaqti[j].id === req.params.id) {
                User[i].ishVaqti.splice(j, 1)
                fs.writeFileSync("./Dokon.json", JSON.stringify(User, 0, 2), "utf-8")
                res.status(200).send("Ok")
                kluch = false
            }
        }
    }


    if (kluch) {
        res.status(403).send("id aniqlanmadi")
    } else {

    }
})
app.post("/dokon/ishvaqti/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Dokon.json', "utf-8"))
    var kluch = true
    User.map(item => {
        if (item.id === req.params.id) {
            var data = {
                "id": uuid.v4(),
                "day": req.body.day,
                'time': req.body.time,
            }
            item.izohlar.push(data)
            fs.writeFileSync("./Dokon.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(200).send("Ok")
            kluch = false
        }
    })
    if (kluch) {
        res.status(403).send("id aniqlanmadi")
    }
})
app.put("/dokon/ishvaqti/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Dokon.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.length; i++) {
        for (let j = 0; j < User[i].ishVaqti.length; j++) {
            if (User[i].ishVaqti[j].id === req.params.id) {
                User[i].ishVaqti[j].day = req.body.day ? req.body.day : User[i].ishVaqti[j].day
                User[i].ishVaqti[j].time = req.body.time ? req.body.time : User[i].ishVaqti[j].time

                fs.writeFileSync("./Dokon.json", JSON.stringify(User, 0, 2), "utf-8")
                res.status(200).send("Ok")
                kluch = false
            }
        }
    }


    if (kluch) {
        res.status(403).send("id aniqlanmadi")
    } else {

    }
})


// instagram
app.get("/instagram", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Instagram.json', "utf-8"))
    res.status(200).send(User)
})
app.get("/instagram/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Instagram.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.bolim.length; i++) {
        if (User.bolim[i].id === req.params.id) {
            kluch = false
            res.status(200).send(User.bolim[i])
        }
    }
    if (kluch) {
        res.status(403).send("id aniqlanmmadi")
    }

})
app.post("/instagram/", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Instagram.json', "utf-8"))
    var { img } = req.files
    var rendom = Math.floor(Math.random() * 1000000);
    var img2 = rendom + img.name;
    img.mv(__dirname + '/public/' + img2);
    var data = {
        "id": uuid.v4(),
        "img": img2,
        "link": req.body.link
    }
    res.status(200).send("Crated")
    User.bolim.unshift(data)
    fs.writeFileSync("./Instagram.json", JSON.stringify(User, 0, 2), "utf-8")
})
app.delete("/instagram/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Instagram.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.bolim.length; i++) {
        if (User.bolim[i].id === req.params.id) {
            User.bolim.splice(i, 1)
            klucha = false
            fs.writeFileSync("./Instagram.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(200).send("Ok")
        }
    }
    if (kluch) {
        res.status(403).send("id aniqlanmmadi")

    }

})
app.put("/instagram/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Instagram.json', "utf-8"))
    var { img } = req.files
    var kluch = true
    for (let i = 0; i < User.bolim.length; i++) {
        if (User.bolim[i].id === req.params.id) {
            if (img) {
                img.mv(__dirname + '/public/' + User.bolim[i].img);
            }
            User.tel = req.body.tel ? req.body.tel : User.tel
            User.bolim[i].link = req.body.link ? req.body.link : User.bolim[i].link
            User.instagram = req.body.instagram ? req.body.instagram : User.instagram
            User.instagramLink = req.body.instagramLink ? req.body.instagramLink : User.instagramLink
            klucha = false
            fs.writeFileSync("./Instagram.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(200).send("Ok")
        }
    }
    if (kluch) {
        res.status(403).send("id aniqlanmmadi")
    }
})

//contact
app.get("/contact", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./cantact.json', "utf-8"))
    res.status(200).send(User)
})
app.get("/contact/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./cantact.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.length; i++) {
        if (User[i].id === req.params.id) {
            res.status(200).send(User[i])
            fs.writeFileSync("./cantact.json", JSON.stringify(User, 0, 2), "utf-8")
        }
    }

    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})
app.post("/contact", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./cantact.json', "utf-8"))
    var data = {
        id: uuid.v4(),
        "name": req.body.name,
        "email": req.body.email,
        "number": req.body.number,
    }
    User.push(data)
    fs.writeFileSync("./cantact.json", JSON.stringify(User, 0, 2), "utf-8")
    res.status(200).send("Ok")
})
app.delete("/contact", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./cantact.json', "utf-8"))
    var kluch = true
    User.map((item, key) => {
        if (item.id === req.params.id) {
            User.splice(key, 1)
            fs.writeFileSync("./cantact.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(200).send("Ok")
            kluch = false
        }
    })
    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})



// category
app.get("/category", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Category.json', "utf-8"))
    res.status(200).send(User)
})
app.get("/category/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Category.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.length; i++) {
        if (User[i].id === req.params.id) {
            res.status(200).send(User[i])
            kluch = false
        }
    }

    if (kluch) {
        res.status(403).send("ID topilmadi")
    }

})
app.post("/category", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Category.json', "utf-8"))
    var data = {
        id: uuid.v4(),
        "category": req.body.category,
    }
    User.push(data)
    fs.writeFileSync("./Category.json", JSON.stringify(User, 0, 2), "utf-8")
    res.status(200).send("Ok")
})
app.delete("/category", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Category.json', "utf-8"))
    var kluch = true
    User.map((item, key) => {
        if (item.id === req.params.id) {
            User.splice(key, 1)
            fs.writeFileSync("./Category.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(200).send("Ok")
            kluch = false
        }
    })
    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})
app.put("/category/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Category.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.bolim.length; i++) {
        if (User.bolim[i].id === req.params.id) {
            User.category = req.body.category ? req.body.category : User.category
            klucha = false
            fs.writeFileSync("./Category.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(200).send("Ok")
        }
    }
    if (kluch) {
        res.status(403).send("id aniqlanmmadi")
    }
})


//subcategory
app.get("/subcategory", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./subcategory.json', "utf-8"))
    res.status(200).send(User)
})
app.get("/subcategory/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./subcategory.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.length; i++) {
        if (User[i].id === req.params.id) {
            res.status(200).send(User[i])
            fs.writeFileSync("./subcategory.json", JSON.stringify(User, 0, 2), "utf-8")
        }
    }

    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})
app.post("/subcategory", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./subcategory.json', "utf-8"))
    var data = {
        id: uuid.v4(),
        "categoryId": req.body.categoryId,
        "subcategory": req.body.subcategory
    }
    User.push(data)
    fs.writeFileSync("./subcategory.json", JSON.stringify(User, 0, 2), "utf-8")
    res.status(200).send("Ok")
})
app.delete("/subcategory", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./subcategory.json', "utf-8"))
    var kluch = true
    User.map((item, key) => {
        if (item.id === req.params.id) {
            User.splice(key, 1)
            fs.writeFileSync("./subcategory.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(200).send("Ok")
            kluch = false
        }
    })
    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})
app.put("/subcategory/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./subcategory.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.bolim.length; i++) {
        if (User.bolim[i].id === req.params.id) {
            User.categoryId = req.body.categoryId ? req.body.categoryId : User.categoryId
            User.subcategory = req.body.subcategory ? req.body.subcategory : User.subcategory
            klucha = false
            fs.writeFileSync("./subcategory.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(200).send("Ok")
        }
    }
    if (kluch) {
        res.status(403).send("id aniqlanmmadi")
    }
})

app.get("/minicategory", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./minicategory.json', "utf-8"))
    res.status(200).send(User)
})
app.get("/minicategory/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./minicategory.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.length; i++) {
        if (User[i].id === req.params.id) {
            res.status(200).send(User[i])
            fs.writeFileSync("./minicategory.json", JSON.stringify(User, 0, 2), "utf-8")
        }
    }

    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})
app.post("/minicategory", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./minicategory.json', "utf-8"))
    var rendom = Math.floor(Math.random() * 1000000);
    var { img1,img2 } =req.files
    var img4 = rendom + img1.name;
    var img3 = rendom+1+img2.name
    img1.mv(__dirname + '/public/' + img4);
    img2.mv(__dirname + '/public/' + img3);
    var data = {
        id: uuid.v4(),
        "subcategoryId": req.body.subcategoryId,
        "minicategory": req.body.minicategory,
        "img1":img2,
        "img2":img3,
    }
    User.push(data)
    fs.writeFileSync("./minicategory.json", JSON.stringify(User, 0, 2), "utf-8")
    res.status(200).send("Ok")
})
app.delete("/minicategory/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./minicategory.json', "utf-8"))
    var kluch = true
    User.map((item, key) => {
        if (item.id === req.params.id) {
            fs.unlink(`./public/${item.img1}`, function (err) {
                if (err && err.code == 'ENOENT') {
                    console.info("File doesn't exist, won't remove it.");
                } else if (err) {
                    console.error("Error occurred while trying to remove file");
                } else {
                    console.info(`removed`);
                }
            });
            fs.unlink(`./public/${item.img2}`, function (err) {
                if (err && err.code == 'ENOENT') {
                    console.info("File doesn't exist, won't remove it.");
                } else if (err) {
                    console.error("Error occurred while trying to remove file");
                } else {
                    console.info(`removed`);
                }
            });
            User.splice(key, 1)
            fs.writeFileSync("./minicategory.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(200).send("Ok")
            kluch = false
        }
    })
    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})
app.put("/minicategory/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./minicategory.json', "utf-8"))
    var { img1, img2 } = req.files
    var kluch = true
    for (let i = 0; i < User.length; i++) {
        if (User[i].id === req.params.id) {
            if (img1) {
                img1.mv(__dirname + '/public/' + User[i].img1);
            }
            if (img2) {
                img2.mv(__dirname + '/public/' + User[i].img2);
            }
            User[i].subcategoryId = req.body.subcategoryId ? req.body.subcategoryId : User[i].subcategoryId
            User[i].minicategory = req.body.minicategory ? req.body.minicategory : User[i].minicategory
            klucha = false
            fs.writeFileSync("./minicategory.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(200).send("Ok")
        }
    }
    if (kluch) {
        res.status(403).send("id aniqlanmmadi")
    }

})

app.get("/product/:category/:minicategory/:number", async (req, res) => {
    var url = `https://www.diamondsfactory.com/${req.params.category}/${req.params.minicategory}?page=${req.params.number}`
        const { data } =await axios({
            method: 'GET',
            url: url
        })
        var select = "div.middle-container div.categoryDiv2"
        var a = []
        const $ = cheerio.load(data)
        $(select).each((index, item) => {
            $(item).children().each((index, data) => {
                var pushdata = JSON.parse($(data).attr().onclick.slice(15, -2))
                pushdata.code = `${$(data, "div.showbox").html()}`
                pushdata.img = $(data).find('img').attr("src")
                a.push(pushdata)
            }
            )
        })
        console.log(a.length);
      res.status(200).send(a)
    

})
app.get("/product/:category/:minicategory", async (req, res) => {
    var url = `https://www.diamondsfactory.com/${req.params.category}/${req.params.minicategory}`
    const { data } = await axios({
        method: 'GET',
        url: url
    })
    var select = "div.middle-container div.categoryDiv2"
    var a = []
    const $ = cheerio.load(data)
    $(select).each((index, item) => {
        $(item).children().each((index, data) => {
            var pushdata = JSON.parse($(data).attr().onclick.slice(15, -2))
            pushdata.code = `${$(data, "div.showbox").html()}`
            pushdata.img = $(data).find('img').attr("src")
            a.push(pushdata)
        }
        )
    })
    console.log(a.length);
    res.status(200).send(a)


})
app.get("/product/:category", async (req, res) => {
    var url = `https://www.diamondsfactory.com/${req.params.category}`
    const { data } = await axios({
        method: 'GET',
        url: url
    })
    var select = "div.middle-container div.categoryDiv2"
    var a = []
    const $ = cheerio.load(data)
    $(select).each((index, item) => {
        $(item).children().each((index, data) => {
            var pushdata = JSON.parse($(data).attr().onclick.slice(15, -2))
            pushdata.code = `${$(data, "div.showbox").html()}`
            pushdata.img = $(data).find('img').attr("src")
            a.push(pushdata)
        }
        )
    })
    console.log(a.length);
    res.status(200).send(a)


})
app.get('/page/:category/:minicategory', async (req,res)=>{
    var url = `https://www.diamondsfactory.com/${req.params.category}/${req.params.minicategory}`
    var a = 0
    const { data } = await axios({
        method: 'GET',
        url: url
    })
    var select = "div.row.row-compact div.col-sm-12.col-xs-12.text-center div.pagination div.links a.paginationlink"

    const $ = cheerio.load(data)
    $(select).each((index, item) => {
        console.log("hello");
        if ($(item).text().length<=3) {
            a = $(item).text()
        }
    })
    res.status(200).send(`${a}`)
})

app.get('/page/:category', async (req, res) => {
    var url = `https://www.diamondsfactory.com/${req.params.category}`
    var a = 0
    const { data } = await axios({
        method: 'GET',
        url: url
    })
    var select = "div.row.row-compact div.col-sm-12.col-xs-12.text-center div.pagination div.links a.paginationlink"

    const $ = cheerio.load(data)
    $(select).each((index, item) => {
        console.log("hello");
        if ($(item).text().length <= 3) {
            a = $(item).text()
        }
    })
    res.status(200).send(`${a}`)
})












app.listen(PORT, function () {
    console.log(`Listening to Port ${PORT}`);
});