var searchRestaurants ={
    
    getCurrentLocation: function(){
            
        var Geo={};
        var search_range = localStorage.getItem("range");
    
        if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(success, error);
        }

        //Get the latitude and the longitude;
        function success(position) {
            Geo.lat = position.coords.latitude;
            Geo.lng = position.coords.longitude;
            
            var restaurants = $("#restaurants");
            
            $.ajax({
                type: 'GET',
                url: "https://api.eet.nu/venues?max_distance=" + search_range + "&geolocation=" + Geo.lat + "," + Geo.lng + "" ,
                success: function(data){
                    restaurants.append("<h3>Search results:</h3>");
                    $.each(data.results, function(i, restaurant){
                        var name = restaurant.name;
                        var category = restaurant.category;
                        var telephone = restaurant.telephone;
                        
                        restaurants.append($("<div data-role='collapsible' data-collapsed='true'><h3>"+name+"   Category: "+category+"</h3><span> Telephone: "+telephone+"</span></div>"));
                        restaurants.find('div[data-role=collapsible]').collapsible();  
                        });
                }
            }); 
        }

        function error(){
            alert("Geocoder failed");
        }          
    } 
};

 





    
        
    
