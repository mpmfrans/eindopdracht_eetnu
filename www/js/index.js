/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

$(document).on('swiperight', '#clear_settings', function(event){

    settings.clearSettings();


});
// Code below can be used to implement swipeleft and swipe right on all pages.

$(document).on('swipeleft swiperight', '#slider-1', function(event) {
        event.stopPropagation();
        event.preventDefault();
});
    
    $(document).on('swipeleft swiperight', '#slider-2', function(event) {
        event.stopPropagation();
        event.preventDefault();
});

$(document).on('swipeleft swiperight', 'div.ui-page', function(event){
        var activePage = $("body").pagecontainer("getActivePage");
    
        if(activePage[0].id == "index_page"){
         if (event.type == "swipeleft"){
            $("body").pagecontainer( "change", "#search_page", {transition: 'none'});
            return;
         }
         if (event.type == "swiperight"){
             return;
         }
     }
     if(activePage[0].id  == "search_page"){
         if (event.type == "swipeleft"){
            $("body").pagecontainer( "change", "#settings_page", {transition: 'none'});
            return;
         }
         if (event.type == "swiperight"){
             $("body").pagecontainer( "change", "#index_page", {transition: 'none'});
             return;
         }
     }                   
                         
    if(activePage[0].id == "settings_page"){
         if (event.type == "swipeleft"){
            return;
         }
         if (event.type == "swiperight"){
            $("body").pagecontainer( "change", "#search_page", {transition: 'none'});
            return;
         }
     }
    
    // searchRestaurants.getCurrentLocation(null, null, filter);
});

$(document).on('swipeleft swiperight', 'div.ui-page', function(event){
        var activePage = $("body").pagecontainer("getActivePage");
    
     if(activePage[0].id  == "about_page"){
         if (event.type == "swipeleft"){
            $("body").pagecontainer( "change", "#index_page", {transition: 'none'});
            return;
         }
         if (event.type == "swiperight"){
             $("body").pagecontainer( "change", "#index_page", {transition: 'none'});
             return;
         }
     }
     if(activePage[0].id  == "contact_page"){
         if (event.type == "swipeleft"){
            $("body").pagecontainer( "change", "#index_page", {transition: 'none'});
            return;
         }
         if (event.type == "swiperight"){
             $("body").pagecontainer( "change", "#index_page", {transition: 'none'});
             return;
         }
     }
    // searchRestaurants.getCurrentLocation(null, null, filter);
});




$(document).on('tap', '#eetnupanellink', function(event){

    $.mobile.activePage.find('#eetnupanel').panel("open");

});







