const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const Follow = require('./Routes/follow')
const Search = require('./Routes/search')
const Lab = require('./Routes/lab')
const Forum = require('./Routes/forum')
const Home = require('./Routes/home')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, 'Accept': 'application/json', Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    next();
});
app.use('/follow', Follow)
app.use('/search', Search)
app.use('/lab', Lab)
app.use('/forum', Forum)
app.use('/', Home)



app.listen(port, (req, res) => {
    console.log('I am running on Heroku')
})