var searchRestaurants = {
    
    getCurrentLocation: function(index, query, filter) {
        
        var longitude = null;
        var latitude = null;
        var restaurant_list = $("#restaurants");
        var search_content = $("#search_content");
        var meters = localStorage.getItem("meters") / 1000;
        var kilometers = localStorage.getItem("kilometers");
        var search_query = query;
        
        var total_search_range = Number(kilometers) + Number(meters);
        
        var filter = $('input[name=radio-choice-1]:checked', '#filter_form').val()
        localStorage.setItem("filter", filter);
   
        
        restaurant_list.empty();
    
        if (navigator.geolocation) {
           var id = navigator.geolocation.getCurrentPosition(success, error);
        }
        
        

        //Get the latitude and the longitude;
        function success(position) {
            
            if(localStorage.getItem("latitude") == null && localStorage.getItem("longitude") == null){
                //console.log(longitude + " " + latitude);
                
                localStorage.setItem("longitude", position.coords.longitude);
                localStorage.setItem("latitude", position.coords.latitude);
                longitude = localStorage.getItem("longitude");
                latitude = localStorage.getItem("latitude");
                
                console.log(longitude + " " + latitude);
            }
//          else if(localStorage.getItem("latitude") == position.coords.latitude && localStorage.getItem("longitude") == position.coords.longitude){
//              Geo.long = localStorage.getItem("longitude");
//              Geo.lat = localStorage.getItem("latitude");
//                
//                console.log("same");
//            }else{
//                Geo.long = position.coords.longitude;
//                Geo.lat = position.coords.latitude;  
//                console.log("different");
//            }
        
            if(index == null || index == "null"){
                var count = 1;
            }else{
                 count =  index;
            }
            
            if(search_query == null || search_query == "null" && filter == null || filter == "null"){
                var venues_url = "https://api.eet.nu/venues?geolocation=" + position.coords.latitude + "," + position.coords.longitude + "&max_distance="+ total_search_range           +"&page="+count+"&per_page=20&sort_by="+filter;
            }else{
                venues_url = "https://api.eet.nu/venues?query="+search_query+"&max_distance="+ total_search_range +"&geolocation=" + position.coords.latitude + "," + position.coords.longitude + "&page="+count+"&per_page=20&sort_by="+filter;
            }
                
                $.ajax({
                type: 'GET',
                url: venues_url,
                    
                    
               
                success: function(data){
                    
                    //restaurant_list.append("<li><h3>Search results:</h3>"+"<span style='float:right'><label for='province'>Province</label></span></li>");
                    
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
                       restaurant_list.append($("<li><a href='#details_page' id='restaurant_details' data-icon='arrow-r' data-transition='none' data-role='listview' data-id="+id+" >"+name+"</a></li>"));
                       restaurant_list.listview('refresh');  
                        
                    });
                    
                    if(count == 1 && count < total_pages){
                        
                        restaurant_list.append("<p>["+count+"-"+total_pages+"]</p>");
                        restaurant_list.append("<fieldset class='ui-grid-a'>");
                        restaurant_list.append("<div class='ui-block-a'><button id='next' data-role='button' class='ui-btn' data-inline='true'>next</button></div>");
                        restaurant_list.append("</fieldset>");
                        
                        $("#next").on('click', function(){
                            count++; 
                            searchRestaurants.getCurrentLocation(count, search_query);                                 
                        });
                    
                    }else if(count >= 2 && count < total_pages){
                        restaurant_list.append("<p>["+count+"-"+total_pages+"]</p>");
                        restaurant_list.append("<fieldset class='ui-grid-a'>");
                        restaurant_list.append("<div class='ui-block-a'><button id='previous' class='ui-btn' data-inline='true' data-role='button'>previous</button></div>");
                        restaurant_list.append("<div class='ui-block-b'><button id='next' data-role='button' class='ui-btn' data-inline='true'>next</button></div>");
                        restaurant_list.append("</fieldset>");    
                        
                        $("#next").on('click', function(){
                            count++;   
                            searchRestaurants.getCurrentLocation(count, search_query);                                
                        });
                        $("#previous").on('click', function(){
                            count--;  
                            searchRestaurants.getCurrentLocation(count, search_query);                 
                                         
                        });
                        
                    }else if(count == total_pages && count != 1){
                        restaurant_list.append("<p>["+count+"-"+total_pages+"]</p>");
                        restaurant_list.append("<fieldset class='ui-grid-a'>");
                        restaurant_list.append("<div class='ui-block-a'><button id='previous' class='ui-btn' data-inline='true' data-role='button'>previous</button></div>");
                        restaurant_list.append("</fieldset>");
                        $("#previous").on('click', function(){
                            count--;    
                            searchRestaurants.getCurrentLocation(count, search_query);                               
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

$(document).on('click', '#restaurants li a', function(e){
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
            var rating_res = restaurant.rating;
            var street = restaurant.address.street;
            var facebook = restaurant.facebook_url;
            var zipcode = restaurant.address.zipcode;
            var city = restaurant.address.city;
            var category_res = restaurant.category;
            longitude = localStorage.getItem("longitude");
            latitude = localStorage.getItem("latitude");
            
            if(rating_res == null || rating_res == "null"){
                rating_res = 0;
            }
                
                  
            if(website_url != null && website_url != "null"){
                if(website_url.substring(website_url.length-1 , website_url.length) == "/"){
                    website_url = website_url.substring(0 , website_url.length-1);
                }    
            }
            
            $("#details_content").append("<h1>"+name+"</h1><h3>"+category_res+"</h3>");
            $("#details_content").append("<p>Street: "+street+"</p>");
            $("#details_content").append("<p>Zipcode: "+zipcode+"</p>");
            $("#details_content").append("<p>City: "+city+"</p>");
            $("#details_content").append('<p>Telephone: <a href="tel:'+telephone+'">'+telephone+'</a></p>');
            $("#details_content").append("<p id='website_url'>Website: <a href="+website_url+">"+website_url+"</a></p>"); 
            $("#details_content").append('<p  id="facebook">Facebook: <a href="'+facebook+'">'+facebook+'</a></p>');
            $("#details_content").append("<div class='rating_bar'><div class='rating' style='width:"+rating_res+"%;'></div></div></br>"); 
            $("#details_content").append("<div id='rate_number'</div>"); 
            $("#details_content").append('</br><a href="http://maps.google.com/?saddr='+latitude+','+longitude+'&daddr='+zipcode+' '+street+','+city+'">Start Navigation</a>');
            
            if(website_url == null || website_url == "null"){
                $("#website_url").hide();
            }
            
            if(facebook == null || facebook == "null"){
                $("#facebook").hide();
            }
        
            $('#rate_number').text("Rating: "+rating_res /10);
            
            

            
        }        
    
    });
   
});

//$(document).on('','#search-mini',function(e){
//        var value = $(this).val();
//        var filter = localStorage.getItem("filter");
//        localStorage.setItem("search_query", value);
//        searchRestaurants.getCurrentLocation(null, value, filter);
//});

$(document).keypress(function(e) {
    if(e.which == 13) {
        var value = $("#search-mini").val();
        var filter = localStorage.getItem("filter");
        localStorage.setItem("search_query", value);
        searchRestaurants.getCurrentLocation(null, value, filter);
    }
});

$(document).on('submit','#search-mini',function(e){
        var value = $(this).val();
        var filter = localStorage.getItem("filter");
        localStorage.setItem("search_query", value);
        searchRestaurants.getCurrentLocation(null, value, filter);
});

$(document).on('tap', '.ui-input-clear', function () {
   var filter = localStorage.getItem("filter");
   searchRestaurants.getCurrentLocation(null, null, filter);
});

$(document).on('change', '[type="radio"]', function(){ 
    var filter = $('input[name=radio-choice-1]:checked', '#filter_form').val()
    localStorage.setItem("filter", filter); 
    searchRestaurants.getCurrentLocation(null, localStorage.getItem("search_query"), filter);
}); 

$(document).on('tap', '#filter_back', function(){
        parent.history.back();
});




    
        
    
