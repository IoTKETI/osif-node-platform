
var Docker = require('node-docker-api').Docker;

var docker = new Docker({socketPath: '/var/run/docker.sock'});



docker.image.list({all:false})
  .then(function(images){

    var imageList = [];
    images.map(function(item){
      var image = {
        id : item.id,
        name : item.data.RepoTags[0]
      };
      imageList.push(image);
    });


    console.log( imageList.length , 'images');
    imageList.map(function(item, index){
      console.log( index, item.id.substring(7, 19), item.name );
    });




  });


docker.container.list({all:true})
  .then(function(containers){

    console.log( containers );


    var res= docker.container.get('2cad023924db506b12b23ef1c7e29061df6336ab983bb98d71e4e035b216d83d');



     res.stop()
       .then(function(container){
         console.log(container);
       });



  })
  .catch(function(err){
    console.log( err );
  });


