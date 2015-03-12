        $(document).on('tap','#take_a_picture',function(e){
        
     if (navigator.camera) {
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
                                                           
                                                           saveToPhotoAlbum : true});
     }
    
    function onSuccess(imageURI) {
        var image = document.getElementById('myImage');
        image.src = imageURI;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
});
       