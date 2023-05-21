require("dotenv").config()
const puppeteer=require("puppeteer")
var express = require('express');
var app = express();
const cheerio = require("cheerio")
const { default: axios } = require("axios");
var cors = require('cors');
const upload = require("express-fileupload")
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(upload())
app.use(express.static('public'));


app.get("/product/:category/:minicategory/:padcategory", async (req, res) => {

    var url = `https://www.diamondsfactory.com/${req.params.category}/${req.params.minicategory}/${req.params.padcategory}?page=${req.quary.number}`
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
                        var d=$(data, "div.showbox").html()
            var b=d.indexOf('class="sale-label">SALE</div>\n<a')
     

            var t=d.indexOf('tabindex="1" class="catLink"')
        
            var y=d.slice(0,b+33)+d.slice(t)
            pushdata.code = `${y}`
            pushdata.img = $(data).find('img').attr("src")
            a.push(pushdata)
        }
        )
    })
    
    res.status(200).send(a)


})
app.get("/product/:category/:minicategory", async (req, res) => {
    var url = `https://www.diamondsfactory.com/${req.params.category}/${req.params.minicategory}?page=${req.query.number}`
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
                        var d=$(data, "div.showbox").html()
            var b=d.indexOf('class="sale-label">SALE</div>\n<a')
     

            var t=d.indexOf('tabindex="1" class="catLink"')
        
            var y=d.slice(0,b+33)+d.slice(t)
            pushdata.code = `${y}`
            pushdata.img = $(data).find('img').attr("src")
            a.push(pushdata)
        }
        )
    })
   
    res.status(200).send(a)


})

app.get("/product/:category", async (req, res) => {
    var url = `https://www.diamondsfactory.com/${req.params.category}?page=${req.query.number}`
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
            var d=$(data, "div.showbox").html()
            var b=d.indexOf('class="sale-label">SALE</div>\n<a')
     

            var t=d.indexOf('tabindex="1" class="catLink"')
        
            var y=d.slice(0,b+33)+d.slice(t)
            pushdata.code = `${y}`
            pushdata.img = $(data).find('img').attr("src")
            a.push(pushdata)
        }
        )
    })
   
    res.status(200).send(a)


})
app.get('/page/:category/:minicategory', async (req, res) => {
    var url = `https://www.diamondsfactory.com/${req.params.category}/${req.params.minicategory}`
    var a = 0
    const { data } = await axios({
        method: 'GET',
        url: url
    })
    var select = "div.row.row-compact div.col-sm-12.col-xs-12.text-center div.pagination div.links a.paginationlink"

    const $ = cheerio.load(data)
    $(select).each((index, item) => {
      
        if ($(item).text().length <= 3) {
            a = $(item).text()
        }
    })
    res.status(200).send(`${a}`)
})

app.get('/page/:category/:minicategory/:padcategory', async (req, res) => {
    var url = `https://www.diamondsfactory.com/${req.params.category}/${req.params.minicategory}/${req.params.padcategory}`
    var a = 0
    const { data } = await axios({
        method: 'GET',
        url: url
    })
    var select = "div.row.row-compact div.col-sm-12.col-xs-12.text-center div.pagination div.links a.paginationlink"

    const $ = cheerio.load(data)
    $(select).each((index, item) => {
      
        if ($(item).text().length <= 3) {
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
        
        if ($(item).text().length <= 3) {
            a = $(item).text()
        }
    })
    res.status(200).send(`${a}`)
})



app.post("/oneproduct", async (req,res)=>{
    // var url=req.body.page
    // console.log();
    const { data } = await axios({
        method: 'GET',
        url: req.body.page
    })
    
    var select="#page-heading"
    const $ = cheerio.load(data)
    $(select).each((index, item) => {
            a = $(item).html()
        res.status(200).send(a)    
    })
    })


app.post('/carousel', async (req,res)=>{
        try{
      const browser = await puppeteer.launch({headless:"new"});
      const page = await browser.newPage();
      var page2='.prodimgInner'
      await page.goto(req.body.pages);
    //   await page.screenshot({ path: 'about3.png' });
      await page.waitForSelector(page2)
  
      var exp= await page.$eval(page2, (el)=>el.innerHTML)
      await browser.close();
      
      res.status(200).send(exp)
    }catch (err) {
        
        res.status(404).send(err)
      }
     
    })








    app.listen(PORT, function () {
    console.log(`Listening to Port ${PORT}`);
});