var express = require('express');
var http = require('http');

var fs = require('fs');

var app = express();
app.use(express.static('css'));
app.use(express.static('js'));
var server = http.Server(app);

server.listen(8087, function () { // auto change port if port is already in use, handle error gracefully
    console.log('node server listening on port :8087');
});

app.get(['/', '/home', '/index', '/homepage'], function (req, res) {
    res.type('html');
    res.set('Content-Type', 'text/html');
    res.sendFile(__dirname + '/index.html');
});


app.get('/all', function (req, res) {
// 1. List of all people 
    res.set('Content-Type', 'application/json');
    fs.readFile('generated.json', (err, data) => {
      let jkl = JSON.parse(data);
      // let's hope there's no err
      res.send(jkl);
    })
  });

app.get('/id/:id', function (req, res) {
// 2. A person using id
    console.log('the message', req.body);
    console.log('the id', req.params.id)
        res.set('Content-Type', 'application/json');
        fs.readFile('generated.json', (err, data) => {
          let jkl = JSON.parse(data);
          // let's hope there's no err
          var element = undefined;
          for (let index = 0; index < jkl.length; index++) {
              
              if (jkl[index]._id == req.params.id ) {
                element = jkl[index];
              }
              
          }

          if (element != undefined) {
            res.send(element)
          } else {
            res.status(406).send('Not Acceptable');
          }
          
        })
  });

  app.get('/allmen', function (req, res) {
    // 3. All men 30 years and above earning more than $3,000
        res.set('Content-Type', 'application/json');
        fs.readFile('generated.json', (err, data) => {
          let jkl = JSON.parse(data);
          
            var men =  jkl.filter(function(hero) {
                return hero.age > 30 && parseFloat(hero.balance.replace(/[$,]+/g,"")) > 3000;
            });
          res.send(men);
        })
      });