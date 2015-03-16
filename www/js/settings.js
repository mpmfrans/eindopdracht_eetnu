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
var settings = {
    
    // Save user settings
    saveSettings: function() {
         localStorage.setting1 = $('#setting-1').val();
         localStorage.setting2 = $('#setting-2').val();
         localStorage.meters = $('#slider-1').val();
         localStorage.kilometers = $('#slider-2').val();
        
         confirm("Settings are saved");
    },
    
    // Load user settings on startup
    loadSettings: function() {
        var setting1 = window.localStorage.getItem("setting1");
        var setting2 = window.localStorage.getItem("setting2");
        var meters = window.localStorage.getItem("meters");
        var kilometers = window.localStorage.getItem("kilometers");
        
        // The flip settings
        document.getElementById("setting-1").value = setting1;
        document.getElementById("setting-2").value = setting2;
        
         // The meters range slider setting and refresh
        $("#slider-1").attr('value', meters);
        //$("#slider-1").slider('refresh');
        
        // The kilometers range slider setting and refresh
        $("#slider-2").attr('value', kilometers);
       // $("#slider-2").slider('refresh');
        
        // Refresh flip settings
        $(".setting").slider('refresh'); 
        
        
       
    },
    
       clearSettings: function() {
        
        // The flip settings
        document.getElementById("setting-1").value = "off";
        document.getElementById("setting-2").value = "off";
        
         // The meters range slider setting and refresh
        $("#slider-1").attr('value', 0);
        //$("#slider-1").slider('refresh');
        
        // The kilometers range slider setting and refresh
        $("#slider-2").attr('value', 0);
       // $("#slider-2").slider('refresh');
        
        // Refresh flip settings
        $(".setting").slider('refresh'); 
        
        settings.saveSettings();
           
    },
};    
    
//      showSettings: function() {
//        $(function() {
//
//        var setting1 = window.localStorage.getItem("setting1");
//        var setting2 = window.localStorage.getItem("setting2");
//        var range = window.localStorage.getItem("range");
//        
//        alert(setting1 + setting2 + range);
//            });
//    },



