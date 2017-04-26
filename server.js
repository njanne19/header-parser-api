var express = require('express');
var cors = require('cors');
var userAgent = require('useragent')
var bodyParser = require('body-parser');


var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());



app.get('/', function(req, res, next) {
	
	var agent = userAgent.parse(req.headers['user-agent']);
	agent.toJSON();
	
	var language = req.headers['accept-language'].split(',');
	language = language[0];
	
	 var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
	
	
	res.json({"browser": agent['family'], "ip": ip, "viewingLanguage": language});
});

app.listen(3000, function() {
	console.log("Server up and running.")
});