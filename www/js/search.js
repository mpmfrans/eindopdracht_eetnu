var Geo={};
var search_range = localStorage.getItem("range");
var search_url = "'https://api.eet.nu/venues?max_distance=" + search_range + "&geolocation=51.8589731,5.6046912'" ;

$(function(){

            $.ajax({
                type: 'GET',
                url: search_url,
                success: function(data){
                    alert("found");
                }

            });
});

var searchRestaurants ={

    getCurrentLocation: function(){
        
        if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(success, error);
        }

        //Get the latitude and the longitude;
        function success(position) {
            Geo.lat = position.coords.latitude;
            Geo.lng = position.coords.longitude;
        }

        function error(){
            alert("Geocoder failed");
        }        
    }   
};





    
        
    

//
//$('#search').click(function (e) {
//        $('#restaurants').append('<li>test restaurant</li>');
//});
//  