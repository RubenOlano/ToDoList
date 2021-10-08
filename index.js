const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))

let items = ["Buy Food", "Cook Food", "Eat Food"]

app.get('/', function (req, res){
    let today = new Date()
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };
    let day = today.toLocaleDateString("en-us", options)

    res.render('list', {dayOfWeek: day, newItem: items })

})

app.post('/', function (req, res){
    let item = req.body.newItem
    items.push(item)
    res.redirect("/")
})

app.listen(3000, function (){
    console.log("Server is up in port 3000")
})