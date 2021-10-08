const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

let items = ["Buy Food", "Cook Food", "Eat Food"]
let workItems = []

app.get('/work', function (req, res){
    res.render("list", {listTitle: 'Work List', itemList: workItems})
})

app.post('/work', function (req, res){
    let item = req.body.newItem
    workItems.push(item)
    res.redirect('/work')
})

app.get('/', function (req, res){
    let today = new Date()
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };
    let day = today.toLocaleDateString("en-us", options)

    res.render('list', {listTitle: day, itemList: items })

})

app.post('/', function (req, res){
    let item = req.body.newItem

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