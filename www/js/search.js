var searchRestaurants = {
    
    getCurrentLocation: function(index) {
            
        var Geo = {};
        var search_range = localStorage.getItem("range");
    
        if (navigator.geolocation) {
           var id = navigator.geolocation.watchPosition(success, error);
        }

        //Get the latitude and the longitude;
        function success(position) {
            //Geo.lat = position.coords.latitude;
            //Geo.lng = position.coords.longitude;
            
           
            
            //console.log(str_index);
            var restaurants = $("#restaurants");
        
            if(index == null || index == "null"){
                var count = 1;
            }else{
                 count =  index;
            }
//            
            console.log(count);
            //localStorage.setItem("counter", counter);
             
                
                $.ajax({
                type: 'GET',
                url: "https://api.eet.nu/venues?geolocation=" + position.coords.latitude + "," + position.coords.longitude + "&max_distance="+ search_range +"&page="+count+"&per_page=30",
               
                success: function(data){
                    
                    restaurants.empty();
                    restaurants.append("<h3>Search results:</h3>");
                    var total_pages = data.pagination.total_pages;
                    //var next_page = '"'+ data.pagination.next_page + '"';
                   // var current_page = data.pagination.current_page;
                   
                    
                    console.log(total_pages);
//console.log(current_page);
                    //console.log(next_page);
                    
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
                        restaurants.append("<br><div><button id='next' class='ui-btn' data-inline='true'>next</button></div>");
                        $("#next").click( function(){
                            count++;                 
                            searchRestaurants.getCurrentLocation(count);                 
                                         
                        });
                    
                    }else if(count >= 2 && count < total_pages){
                        restaurants.append("<br><div><button id='next' class='ui-btn'>next</button><button id='previous' class='ui-btn'>previous</button></div>");
                        $("#next").click( function(){
                            count++;                 
                            searchRestaurants.getCurrentLocation(count);                 
                                         
                        });
                        $("#previous").click( function(){
                            count--;                 
                            searchRestaurants.getCurrentLocation(count);                 
                                         
                        });
                    }else if(count == total_pages){
                        restaurants.append("<br><div><button id='previous'>previous</button></div>");
                        $("#previous").click( function(){
                            count--;                 
                            searchRestaurants.getCurrentLocation(count);                 
                                         
                        });
                    
                    
                    }
                   
                    }
                });
            
            navigator.geolocation.clearWatch(id);
            } 
     
        function error(){
            alert("Geocoder failed");
        }  
    }
};

 





    
        
    
