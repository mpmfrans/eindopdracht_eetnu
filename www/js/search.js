

$(function(){

 $.ajax({
            type: 'GET',
            url: 'https://api.eet.nu/venues?max_distance=10&geolocation=51.8589731,5.6046912',
            success: function(data){
                alert("found");
            }
        
        });


});

var searchRestaurants ={

    getCurrentLocation: function(){
         var Geo={};
         var searchRange = localStorage.getItem("range");

        if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(success, error);
        }

        //Get the latitude and the longitude;
        function success(position) {
            Geo.lat = position.coords.latitude;
            Geo.lng = position.coords.longitude;
            
            //alert(Geo.lat + " " + Geo.lng);
        }

        function error(){
            //alert("Geocoder failed");
        } 
    }   



};




    
        
    

//
//$('#search').click(function (e) {
//        $('#restaurants').append('<li>test restaurant</li>');
//});
//  