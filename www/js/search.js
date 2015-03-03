var appsearch = {

searchrestaurants: function(){
    
    $.ajax({
        type: 'GET'
        url: 'https://api.eet.nu/venues/1'
        succes: function(restaurants){
            $.each(restaurants, function(i, restaurant) {
                $("#restaurants").append('<li>my resaurants</li>'); 
            });
            
        }
    });
    
    }
};

