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
    // Application Constructor
    saveSettings: function() {
         localStorage.setting1 = $('#flip-1').val();
         localStorage.setting2 = $('#flip-2').val();
         localStorage.range = $('#slider-1').val();
         alert("Settings saved.");
    },
    
    loadSettings: function() {
        
        var setting1 = window.localStorage.getItem("setting1");
        var setting2 = window.localStorage.getItem("setting2");
        var range = window.localStorage.getItem("range");
        
        document.getElementById("flip-1").value = setting1;
        $('#flip-1').slider('refresh');
        document.getElementById("flip-2").value = setting2;
        $('#flip-2').slider('refresh');
        document.getElementById("slider-1").value = range;
        $('#slider-1').slider('refresh');
    },
    
      showSettings: function() {
        
        var setting1 = window.localStorage.getItem("setting1");
        var setting2 = window.localStorage.getItem("setting2");
        var range = window.localStorage.getItem("range");
        
        alert(setting1 + setting2 + range);
    }

};


