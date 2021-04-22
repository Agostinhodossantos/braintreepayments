const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require("body-parser")
const ejs = require("ejs")
const {makeTransaction, genereteClientToken, createCard, createCustomer} = require("./brain")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);


app.get('/', async(req, res) => {
    res.render('pages/index')
})

app.post('/checkout',(req, res) => {
    console.log("----")
    console.log(req.body)
    console.log(req.body.nonce)
    makeTransaction(req.body.nonce)
})

app.get('/createCard', (req, res) => {
   var response =  createCard()
   console.log(response)
   res.send(response)
})

app.get('/createCustomer', (req, res) => {
    var create = createCustomer()
    res.send(create)
})

app.get("/token", async(req, res) => {
    var token = await genereteClientToken()
    res.send(token)
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})