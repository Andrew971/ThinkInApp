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

var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

app.use('/follow', Follow)
app.use('/search', Search)
app.use('/lab', Lab)
app.use('/forum', Forum)
app.use('/', Home)



app.listen(port, (req, res) => {
    console.log('I am running on Heroku')
})