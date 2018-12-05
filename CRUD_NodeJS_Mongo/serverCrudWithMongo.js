const express  = require('express');
const app      = express();
const port     = process.env.PORT || 8080;
const server   = require('http').Server(app);
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

const mongoDBModule = require('./app_modules/crud-mongo');

// Pour les formulaires standards
const bodyParser = require('body-parser');
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

// Cette ligne indique le répertoire qui contient
// les fichiers statiques: html, css, js, images etc.
app.use(express.static(__dirname + '/public'));
// Paramètres standards du modyle bodyParser
// qui sert à récupérer des paramètres reçus
// par ex, par l'envoi d'un formulaire "standard"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Lance le serveur avec express
server.listen(port);

console.log("Serveur lancé sur le port : " + port);

//------------------
// ROUTES
//------------------
// Utile pour indiquer la home page, dans le cas
// ou il ne s'agit pas de public/index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/MyTableVue', function(req, res) {
    res.sendFile(__dirname + '/public/TableVue.html');
});


// Test de la connexion à la base
app.get('/api/connection', function(req, res) {
	// Pour le moment on simule, mais après on devra
	// réellement se connecte à la base de données
	// et renvoyer une valeur pour dire si tout est ok
   mongoDBModule.connexionMongo(function(err, db) {
   	let reponse;

   	if(err) {
   		console.log("erreur connexion");
   		reponse = {
   			msg: "erreur de connexion err=" + err
   		}
   	} else {
   		reponse = {
   			msg: "connexion établie"
   		}
   	}
   	res.send(JSON.stringify(reponse));

   });
});


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

    next();
});

app.get('/api/plugins/count', function(req, res) {
   
    let name = req.query.name || '';

    mongoDBModule.countPlugins(name, function(data) {
        var objdData = {
            msg:"plugins count",
            data: data
        }
        res.send(JSON.stringify(objdData));
    });
});

// On va récupérer des plugins par un GET (standard REST) 
app.get('/api/plugins', function(req, res) { 

 	mongoDBModule.findPlugins(function(data,count) {
 		var objdData = {
 			msg:"plugin recherchés avec succès",
 			data: data,
			count:count
 		}
 		res.send(JSON.stringify(objdData)); 
 	}); 
});

// Récupération d'un seul plugin par son id
app.get('/api/plugins/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.findPluginById(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
 
});

// Creation d'un plugin par envoi d'un formulaire
// On fera l'insert par un POST, c'est le standard REST
app.post('/api/plugins', multerData.fields([]), function(req, res) {
 	mongoDBModule.createPlugin(req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});
