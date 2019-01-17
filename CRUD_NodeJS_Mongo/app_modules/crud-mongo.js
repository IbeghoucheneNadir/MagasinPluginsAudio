var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var assert = require('assert');
//var url = 'mongodb://localhost:27017/test';

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

exports.connexionMongo = function(callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		
		assert.equal(null, err);
		callback(err, db);
	});
}

exports.countPlugins = function(name,callback) {
    MongoClient.connect(url, function(err, client) {
        var db = client.db(dbName);

        console.log("db " + db)
        if(!err){
        	if(name==''){
                db.collection('plugins')
                    .find({ "screenshot_href":{$ne:null},$where:"this.screenshot_href.length >0"})
                    .count()
                    .then(rep => callback(rep));
			}else {
                let query = {
                    "name" : {$regex:".*"+name+".*",$options:"i"}
                }
                db.collection('plugins')
					.find(query)
                    .count()
                    .then(rep => callback(rep));

			}
        }
    });
};

// Récupérer tout les plugins 

exports.findPlugins = function(page, pagesize, name, callback) {
    MongoClient.connect(url, function(err, client) {

        var db = client.db(dbName);

    if(!err){
        if(name == ''){
            db.collection('plugins')
                .find({ "screenshot_href":{$ne:null},$where:"this.screenshot_href.length >0"})
                .skip(page*pagesize)
                .limit(pagesize)
                .toArray()
                .then(arr=>{
                    db.collection('plugins')
                        .count()
                        .then(rep=>callback(arr,rep))
                });
        }
     
        else{
                let query = {
                    "name" : {$regex:".*"+name+".*",$options:"i"}
                }
                db.collection('plugins')
                    .find(query)
                    .limit(pagesize)
                    .toArray()
                    .then(arr=>{
                        db.collection('plugins')
                            .find(query)
                            .skip(page*pagesize)
                            .count()
                            .then(rep=>callback(arr,rep))
                      });
                 }
            }
        else{
            callback(-1);
        }
    });
};

exports.findPluginById = function(id, callback) {
    MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
        if(!err) {
        	// La requete mongoDB

            let myquery = { "_id": ObjectId(id)};

            db.collection("plugins") 
            .findOne(myquery, function(err, data) {
            	let reponse;

                if(!err){
                    reponse = {
                    	succes: true,
                        plugin : data,
                        error : null,
                        msg:"Details du plugin envoyés"
                    };
                } else{
                    reponse = {
                    	succes: false,
                        plugin : null,
                        error : err,
                        msg: "erreur lors du find"
                    };
                }
                callback(reponse);
            });
        } else {
        	let reponse = reponse = {
                    	succes: false,
                        plugin : null,
                        error : err,
                        msg: "erreur de connexion à la base"
                    };
            callback(reponse);
        }
    });
}
