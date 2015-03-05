

var searchRestaurants ={

    getCurrentLocation: function(){
         var Geo={};

        if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(success, error);
        }

        //Get the latitude and the longitude;
        function success(position) {
            Geo.lat = position.coords.latitude;
            Geo.lng = position.coords.longitude;
            alert(Geo.lat, Geo.lng);
        }

        function error(){
            console.log("Geocoder failed");
        }

       
    
    }



};


    
        
    

//    // onSuccess Geolocation
//    //
//    function onSuccess(position) {
//        var element = document.getElementById('geolocation');
//        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
//                            'Longitude: '          + position.coords.longitude             + '<br />' +
//                            'Altitude: '           + position.coords.altitude              + '<br />' +
//                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
//                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
//                            'Heading: '            + position.coords.heading               + '<br />' +
//                            'Speed: '              + position.coords.speed                 + '<br />' +
//                            'Timestamp: '          + position.timestamp                    + '<br />';
//    }
//
//    // onError Callback receives a PositionError object
//    //
//    function onError(error) {
//        alert('code: '    + error.code    + '\n' +
//              'message: ' + error.message + '\n');
//    }
//
//$('#search').click(function (e) {
//        $('#restaurants').append('<li>test restaurant</li>');
//});
//  