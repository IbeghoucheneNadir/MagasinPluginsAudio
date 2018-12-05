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

exports.findPlugins = function(callback) {
    MongoClient.connect(url, function(err, client) {

			var db = client.db(dbName);

			console.log("db " + db)
        if(!err){
                    db.collection('plugins')
                        .find()
                        .toArray()
                        .then(arr=>{
                            db.collection('plugins')
								.find()
                                .count()
                                .then(rep=>callback(arr,rep))
					});
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


exports.createPlugin = function(formData, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

	    if(!err) {
	 /*
			let toInsert = {
                a : formData.a,
                name : formData.name, 
                plugin_id :formData.plugin_id
            };
            */
            let toInsert = {
                a : "ffdggffsg",
                name : "dfzgzeg", 
                plugin_id :"efverrb"
            };
            
			console.dir(JSON.stringify(toInsert));
		    db.collection("plugins")
		    .insert(toInsert, function(err, insertedId) {
		    	let reponse;

		    	console.log('++++'+insertedId)

		        if(!err){
		            reponse = {
		                succes : true,
		                result: insertedId.ops[0]._id,
		                error : null,
		                msg: "Ajout réussi " + insertedId.ops[0]._id
		            };
		        } else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à l'insertion"
		            };
		        }
		        callback(reponse);
		    });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de l'insertion, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}