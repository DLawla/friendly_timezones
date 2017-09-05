export const getTimezoneId = function(lat, lng, success_callback) {
  // Taken from here: http://www.javascriptkit.com/dhtmltutors/local-time-google-time-zone-api.shtml
  var loc = lat + ', ' + lng;
  var targetDate = new Date(); // Current date/time of user computer
  var timestamp = targetDate.getTime()/1000 + targetDate.getTimezoneOffset() * 60; // Current UTC date/time expressed as seconds since midnight, January 1, 1970 UTC
  var apikey = 'AIzaSyAN467EAPM69MHdE4oB2sNsiSw7NBynRLY';
  var apicall = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + loc + '&timestamp=' + timestamp + '&key=' + apikey;

  var xhr = new XMLHttpRequest(); // create new XMLHttpRequest2 object
  xhr.open('GET', apicall); // open GET request
  xhr.onload = function(){
    if (xhr.status === 200){ // if Ajax request successful
      var output = JSON.parse(xhr.responseText); // convert returned JSON string to JSON object
      if (output.status == 'OK'){ // if API reports everything was returned successfully
        success_callback(output.timeZoneId);
      }
    }
    else{
      alert('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send() // send request
};