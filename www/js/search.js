$("#search").on('click', function(){
    $.ajax({
        type: 'GET'
        url: 'https://api.eet.nu/venues?ids=1'
        succes: function(restaurants){
            $.each(restaurants, function(i, restaurant) {
                $("#restaurants").append('<li>my resaurants</li>'); 
            }); 
        }
    });
});

