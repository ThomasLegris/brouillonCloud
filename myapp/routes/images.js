var express = require('express');
var router = express.Router();
var redis = require('redis');
var metadata=[];
var counterImages = 0;


/*create client redis */
var client = redis.createClient({host:'redis'});

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

/*set and get value in database */

client.hmset("images:1","idAlbum","1","name","cat1","src","/images/img1.jpg");
counterImages = counterImages+1;
client.hmset("images:2","idAlbum","1","name","cat2","src","/images/img2.jpg");
counterImages = counterImages+1;
client.hmset("images:3","idAlbum","1","name","cat3","src","/images/img3.png");
counterImages = counterImages+1;

for (var i = 1 ; i <= counterImages ; i++){
  client.hgetall('images:'+i,function(err,results){
    if(err){
      console.log("Something went wrong")
    }
    else {
      metadata.push(results);
      console.log(results.name);
    }
  });
}

/*Get the route and render the ui*/
router.get('/:id', function(req, res, next) {
  res.render('images', { idFolder: req.params.id, data:metadata });
});

module.exports = router;
