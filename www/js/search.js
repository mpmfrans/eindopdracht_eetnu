


var searchRestaurants = {
    
    getCurrentLocation: function(index) {
              
        var Geo = {};
        var meters = localStorage.getItem("meters") / 1000;
        var kilometers = localStorage.getItem("kilometers");
        var restaurant_list = $("#restaurants");
        var search_content = $("#search_content");
        
        var total_search_range = Number(kilometers) + Number(meters);
        
        restaurant_list.empty();
    
        if (navigator.geolocation) {
           var id = navigator.geolocation.getCurrentPosition(success, error);
        }

        //Get the latitude and the longitude;
        function success(position) {
        
            if(index == null || index == "null"){
                var count = 1;
            }else{
                 count =  index;
            }
                
                $.ajax({
                type: 'GET',
                url: "https://api.eet.nu/venues?geolocation=" + position.coords.latitude + "," + position.coords.longitude + "&max_distance="+ total_search_range +"&page="+count+"&per_page=30",
               
                success: function(data){
                    
                    restaurant_list.append("<li><h3>Search results:</h3>"+"<span style='float:right'><label for='province'>Province</label></span></li>");
                    
                    var total_pages = data.pagination.total_pages;
                               
                    $.each(data.results, function(i, restaurant){
                        var name = restaurant.name;
                        var category = restaurant.category;
                        var telephone = restaurant.telephone;
                        var id = restaurant.id;
                        /*
                           Following code can be used to create collapsible items    

                           restaurants.append($("<div data-role='collapsible' data-collapsed='true' data-mini='true'><h3>"+name+"Category: "+ category+
                                                "</h3><span> Telephone: " + telephone +"</span></div>"));
                           restaurants.find('div[data-role=collapsible]').collapsible();    
                        */
                       restaurant_list.append($("<li><a href='#details_page' id='restaurant_details' data-icon='arrow-r' data-role='listview' data-id="+id+">"+name+"</a></li>"));
                       restaurant_list.listview('refresh');  
                        
                    });
                    
                  
                   
                    if(count == 1 && count < total_pages){
                        
                        restaurant_list.append("<p>["+count+"-"+total_pages+"]</p>");
                        restaurant_list.append("<fieldset class='ui-grid-a'>");
                        restaurant_list.append("<div class='ui-block-a'><button id='next' data-role='button' class='ui-btn' data-inline='true'>next</button></div>");
                        restaurant_list.append("</fieldset>");
                        
                        $("#next").on('tap', function(){
                            count++; 
                            searchRestaurants.getCurrentLocation(count);                                 
                        });
                    
                    }else if(count >= 2 && count < total_pages){
                        restaurant_list.append("<p>["+count+"-"+total_pages+"]</p>");
                        restaurant_list.append("<fieldset class='ui-grid-a'>");
                        restaurant_list.append("<div class='ui-block-a'><button id='previous' class='ui-btn' data-inline='true' data-role='button'>previous</button></div>");
                        restaurant_list.append("<div class='ui-block-b'><button id='next' data-role='button' class='ui-btn' data-inline='true'>next</button></div>");
                        restaurant_list.append("</fieldset>");    
                        
                        $("#next").on('tap', function(){
                            count++;   
                            searchRestaurants.getCurrentLocation(count);                                
                        });
                        $("#previous").on('tap', function(){
                            count--;  
                            searchRestaurants.getCurrentLocation(count);                 
                                         
                        });
                        
                    }else if(count == total_pages && count != 1){
                        restaurant_list.append("<p>["+count+"-"+total_pages+"]</p>");
                        restaurant_list.append("<fieldset class='ui-grid-a'>");
                        restaurant_list.append("<div class='ui-block-a'><button id='previous' class='ui-btn' data-inline='true' data-role='button'>previous</button></div>");
                        restaurant_list.append("</fieldset>");
                        $("#previous").on('tap', function(){
                            count--;    
                            searchRestaurants.getCurrentLocation(count);                               
                        });
                    }
                   
                }
                });
        } 
     
        function error(){
            alert("Get current geolocation failed");
        } 
        
    }
};

$(document).on('tap', '#restaurants li a', function(e){
    var RestaurantId = ($(this).data("id"));
    localStorage.setItem("RestaurantDetail", RestaurantId);
});


$(document).on("pagebeforeshow","#details_page",function(event){
    
     $("#details_content").empty();
    
     $.ajax({
        type: 'GET',
        url: "https://api.eet.nu/venues/" + localStorage.getItem("RestaurantDetail"),
        
        success: function(restaurant){
            var name = restaurant.name;
            var telephone = restaurant.telephone;
            var website_url = restaurant.website_url;
            
            $("#details_content").append("<h1>"+name+"</h1>");
            $("#details_content").append('<a href="tel:'+telephone+'">'+telephone+'</a></br></br>');
            $("#details_content").append("<a href="+website_url+">"+website_url+"</a>");
            
        }        
    
    });
   
});



    
        
    
