$(document).on('tap','#take_a_picture',function(e){
    
     navigator.camera.getPicture(onPhotoDataSuccess, onFail, { 
        quality: 50,
        destinationType : destinationType.FILE_URI,
        saveToPhotoAlbum : true,
    });
    
    
        

});
       