//loading required modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//app variable
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, './views'));
app.use(bodyParser.urlencoded());

//routing
app.get('/',function(req,res){
    res.render("index");
})

var server = app.listen(8000, function(){
    console.log("Running on port 8000");
})
var io = require("socket.io").listen(server);
io.sockets.on('connection',function(socket){
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    socket.on("posting_form", function(data){
        var random = Math.floor((Math.random()*1000)+1);
        socket.emit('updated_message',data);
            socket.emit('random_number',{response:random});
    });
});