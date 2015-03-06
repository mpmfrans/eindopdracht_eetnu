var searchRestaurants = {
    
    getCurrentLocation: function(index) {
            
        var Geo = {};
        var search_range = localStorage.getItem("range");
    
        if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(success, error);
        }

        //Get the latitude and the longitude;
        function success(position) {
            Geo.lat = position.coords.latitude;
            Geo.lng = position.coords.longitude;
            
            var str_index = index;
            
            //console.log(str_index);
            var restaurants = $("#restaurants");
        
            if(str_index == null || str_index == "null"){
                var count = 1;
            }else{
                count = parseInt(str_index);
            }
            
            //console.log(count);
            //localStorage.setItem("counter", counter);
             
                
                $.ajax({
                type: 'GET',
                url: "https://api.eet.nu/venues?geolocation=" + Geo.lat + "," + Geo.lng + "&max_distance="+ search_range +"&page=" + count,
                success: function(data){
                    
                    restaurants.empty();
                    restaurants.append("<h3>Search results:</h3>");
                    var total_pages = data.pagination.total_pages;
                    
                    $.each(data.results, function(i, restaurant){
                        var name = restaurant.name;
                        var category = restaurant.category;
                        var telephone = restaurant.telephone;
                        
                        restaurants.append($("<div data-role='collapsible' data-collapsed='true' data-mini='true'><h3>"+name+"   Category: "+ category+
                                             "</h3><span> Telephone: " + telephone +"</span></div>"));
                        restaurants.find('div[data-role=collapsible]').collapsible();  
                        
                        
                    });
                 //   count++;
                    
                  
                      // restaurants.append("<br><button id='next' onclick=searchRestaurants.getCurrentLocation(" + count + ");>next</button>"); 
                   
                    if(count == 1 && count < total_pages){
                        restaurants.append("<br><div><button id='next'>next</button></div>");
                        $("#next").click( function(){
                            count++;                 
                            searchRestaurants.getCurrentLocation(count);                 
                                         
                        });
                    
                    }else if(count >= 2 && count < total_pages){
                        restaurants.append("<br><div><button id='previous'>previous</button><button id='next'>next</button></div>");
                        $("#next").click( function(){
                            count++;                 
                            searchRestaurants.getCurrentLocation(count);                 
                                         
                        });
                        $("#previous").click( function(){
                            count--;                 
                            searchRestaurants.getCurrentLocation(count);                 
                                         
                        });
                    }else if(count == total_pages && total_pages != 1){
                        restaurants.append("<br><div><button id='previous'>previous</button></div>");
                        $("#previous").click( function(){
                            count--;                 
                            searchRestaurants.getCurrentLocation(count);                 
                                         
                        });
                    
                    
                    }
                    
                    
//                        
//                        
//                    }else if($("#next").is(":visible")){
//                         
//                        $("#next").click(function(){
//                            count++;
//                            searchRestaurants.getCurrentLocation(count);
//                        });
//                    }
                   
                    }
                });  
            }
        
        
        function error(){
            alert("Geocoder failed");
        }   
    }
};

 





    
        
    
