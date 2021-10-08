const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + '/date.js')

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

const items = ["Buy Food", "Cook Food", "Eat Food"]
const workItems = []

app.get('/about', function (req, res){
    res.render("about")
})

app.get('/work', function (req, res){
    res.render("list", {listTitle: 'Work List', itemList: workItems})
})

app.get('/', function (req, res){
    res.render('list', {listTitle: date.getDate(), itemList: items })

})

app.post('/', function (req, res){
    const item = req.body.newItem

    if (req.body.list === "Work") {
        workItems.push(item)
        res.redirect('/work')
    }
    else {
        items.push(item)
        res.redirect("/")
    }
})

app.listen(3000, function (){
    console.log("Server is up in port 3000")
})