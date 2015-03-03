var appsearch ={

search: function(){
    
    var $restaurants = $('#restaurants');
    
    $.ajax({
        type: 'GET'
        url: 'https://api.eet.nu/venues'
        succes: function(restaurants){
            $.each(restaurants, function(i, restaurant) {
                $restaurants.append('<li>my resaurants</li>'); 
            });
            
        }
    });
    
});
};

