var express = require('express');
var router = express.Router();
var fs = require('fs');
var redis = require('redis');
var client = redis.createClient({host:'redis'});

var metadata=[];



client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});
var counterAlbum = 0;
client.hmset("albums:1","idAlbum","1","name", "cat","front_image","/images/img1.jpg");
counterAlbum = counterAlbum+1;
client.hmset("albums:2","idAlbum","2","name", "dog","front_image","/images/dog1.jpg");
counterAlbum=counterAlbum+1;

client.hmset("albums:3","idAlbum","3","name", "tiger","front_image","/images/dog3.jpg");
counterAlbum=counterAlbum+1;

for (var i = 1 ; i <= counterAlbum ; i++){
  client.hgetall('albums:'+i,function(err,results){
    if(err){
      console.log("Something went wrong")
    }
    else {
      metadata.push(results);
      console.log(results.name);
    }
  });
}



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Carrousel',data:metadata});
});


module.exports = router;
