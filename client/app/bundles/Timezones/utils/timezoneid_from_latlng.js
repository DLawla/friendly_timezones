export const timezoneIdFromLatLng = function(lat, lng) {
  // Get the timezone from the lat and lng
  var loc = lat + ', ' + lng
  var targetDate = new Date() // Current date/time of user computer
  var timestamp = targetDate.getTime()/1000 + targetDate.getTimezoneOffset() * 60 // Current UTC date/time expressed as seconds since midnight, January 1, 1970 UTC
  var apikey = 'AIzaSyAN467EAPM69MHdE4oB2sNsiSw7NBynRLY'
  var apicall = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + loc + '&timestamp=' + timestamp + '&key=' + apikey

  var xhr = new XMLHttpRequest() // create new XMLHttpRequest2 object
  xhr.open('GET', apicall) // open GET request
  xhr.onload = function(){
    if (xhr.status === 200){ // if Ajax request successful
      var output = JSON.parse(xhr.responseText) // convert returned JSON string to JSON object
      console.log(output)
      console.log(output.status) // log API return status for debugging purposes
      if (output.status == 'OK'){ // if API reports everything was returned successfully
        console.log('here!');
        return {timezoneId: output.timeZoneId}
      }
    }
    else{
      return {timezoneId: null}
    }
  }
  xhr.send() // send request
};