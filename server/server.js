const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const hbs = require('hbs');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/users');
const publicPath = path.join(__dirname, '../public');

var app = express();
app.use(bodyParser.json());
app.set('view engine', 'hbs');
app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);

var Users = mongoose.model('Users', {
    name: {
        type: String
    }
});


app.post('/userId', (req, res) => {
    console.log(req.body);
    var newUser = new Users({
        name: req.body.text
    });
    console.log(newUser);
    newUser.save().then((data) => {
        console.log('New user added');
        console.log(data);
        res.send(data);
    }, (e) => {
        console.log('Unable to save data');
    });
});

app.post('/getuserId', (req, res) => {
    console.log(req.body);
    var id = req.body.text;
    console.log(id);
    Users.findOne({ _id: id }).then((data) => {
        console.log(data);
        res.send(data);
    }, (e) => {
        console.log('Unable to save data', e);
    });
});

io.on('connection', (socket) => {
    console.log('connected to client');
});

app.post('/newroom', (req, res) => {
    console.log(req.body);
    res.send();
});

app.get('/rooms/:id', (req, res) => {
    console.log(req.params.id);
    Users.findById(req.params.id, function(err, docs) {
        if (err) throw err;
        console.log('fetched data');
        console.log(docs);
        res.render('rooms.hbs', {
            Uid: docs._id
        });
    });

});


server.listen(3000, () => {
    console.log('server is up on port 3000');
});