var searchRestaurants = {
    
    getCurrentLocation: function(index, query, filter) {
              
        var Geo = {};
       
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
        
            if(index == null || index == "null"){
                var count = 1;
            }else{
                 count =  index;
            }
            
            if(search_query == null || search_query == "null" && filter == null || filter == "null"){
                var venues_url = "https://api.eet.nu/venues?geolocation=" + position.coords.latitude + "," + position.coords.longitude + "&max_distance="+ total_search_range +"&page="+count+"&per_page=20&sort_by="+filter;
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
                       restaurant_list.append($("<li><a href='#details_page' id='restaurant_details' data-icon='arrow-r'  data-role='listview' data-id="+id+">"+name+"</a></li>"));
                       restaurant_list.listview('refresh');  
                        
                    });
                    
                    if(count == 1 && count < total_pages){
                        
                        restaurant_list.append("<p>["+count+"-"+total_pages+"]</p>");
                        restaurant_list.append("<fieldset class='ui-grid-a'>");
                        restaurant_list.append("<div class='ui-block-a'><button id='next' data-role='button' class='ui-btn' data-inline='true'>next</button></div>");
                        restaurant_list.append("</fieldset>");
                        
                        $("#next").on('tap', function(){
                            count++; 
                            searchRestaurants.getCurrentLocation(count, search_query);                                 
                        });
                    
                    }else if(count >= 2 && count < total_pages){
                        restaurant_list.append("<p>["+count+"-"+total_pages+"]</p>");
                        restaurant_list.append("<fieldset class='ui-grid-a'>");
                        restaurant_list.append("<div class='ui-block-a'><button id='previous' class='ui-btn' data-inline='true' data-role='button'>previous</button></div>");
                        restaurant_list.append("<div class='ui-block-b'><button id='next' data-role='button' class='ui-btn' data-inline='true'>next</button></div>");
                        restaurant_list.append("</fieldset>");    
                        
                        $("#next").on('tap', function(){
                            count++;   
                            searchRestaurants.getCurrentLocation(count, search_query);                                
                        });
                        $("#previous").on('tap', function(){
                            count--;  
                            searchRestaurants.getCurrentLocation(count, search_query);                 
                                         
                        });
                        
                    }else if(count == total_pages && count != 1){
                        restaurant_list.append("<p>["+count+"-"+total_pages+"]</p>");
                        restaurant_list.append("<fieldset class='ui-grid-a'>");
                        restaurant_list.append("<div class='ui-block-a'><button id='previous' class='ui-btn' data-inline='true' data-role='button'>previous</button></div>");
                        restaurant_list.append("</fieldset>");
                        $("#previous").on('tap', function(){
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
            var rating_res = restaurant.rating / 10;
            var street = restaurant.address.street;
            var zipcode = restaurant.address.zipcode;
            var city = restaurant.address.city;
            var category_res = restaurant.category;
            
            
            $("#details_content").append("<h1>"+name+"</h1><h3>"+category_res+"</h3>");
            $("#details_content").append("<p>Street: "+street+"</p>");
            $("#details_content").append("<p>Zipcode: "+zipcode+"</p>");
            $("#details_content").append("<p>City: "+city+"</p>");
            $("#details_content").append('<p>Telephone: <a href="tel:'+telephone+'">'+telephone+'</a></p>');
            $("#details_content").append("<p>Website: <a href="+website_url+">"+website_url+"</a></p>"); 
            $("#details_content").append("<div id='jRate'></div><div id='rate_number'></div>"); 
            $("#details_content").append("<div id='htmlRating' data-role='igrating' data-value='2'></div>"); 
            
                
            
            
            //$("#jRate").jRate({
//                    startColor: 'orange',
//		            endColor: 'orange',
//                    width: 30,
//		            height: 30,
//                    min: 0,
//		            max: 10,
//                    rating: rating_res,
//                    readOnly: true
//            });
            $('#rate_number').text("Rating: "+rating_res);
            
            
        }        
    
    });
   
});

$(document).on('input','#search-mini',function(e){
        var value = $(this).val();
        var filter = localStorage.getItem("filter");
        localStorage.setItem("search_query", value);
        searchRestaurants.getCurrentLocation(null, value, filter);
});

$(document).on('tap','#search-mini',function(e){
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
}); 

$(document).on('tap', '#filter_back', function(){
        parent.history.back();
});




    
        
    
