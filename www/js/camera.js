$(document).on('tap','#take_a_picture',function(e){
    
     navigator.camera.getPicture(onPhotoDataSuccess, onFail, { 
        quality: 50,
        destinationType : destinationType.FILE_URI,
        saveToPhotoAlbum : true,
    });
    
    function onPhotoDataSuccess(imageURI) {
  var gotFileEntry = function(fileEntry) {
    //alert("got image file entry: " + fileEntry.fullPath);
    var gotFileSystem = function(fileSystem) {

        fileSystem.root.getDirectory("MyAppFolder", {
            create : true
        }, function(dataDir) {
          var d = new Date();
          var n = d.getTime();
          //new file name
          var newFileName = n + ".jpg";
console.log("Saved image" + dataDir);
            // copy the file
            fileEntry.moveTo(dataDir, newFileName, null, fsFail);

        }, dirFail);

    };
    // get file system to copy or move image file to
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem,
        fsFail);
};
// resolve file system for image
window.resolveLocalFileSystemURI(imageURI, gotFileEntry, fsFail);

// file system fail
var fsFail = function(error) {
    alert("failed with error code: " + error.code);

};

var dirFail = function(error) {
    alert("Directory error code: " + error.code);

};
}
    
     // Called if something bad happens.
    function onFail(message) {
        alert('Failed because: ' + message);
    }
    
    
        

});
       