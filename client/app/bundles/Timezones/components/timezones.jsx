import PropTypes from 'prop-types';
import React from 'react';
import TimezoneForm from './timezone_form';
import TimezoneList from './timezone_list';
import update from 'immutability-helper';
import google_maps from '@google/maps';

export default class Timezones extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      timezone_name: '',
      timezones: [{name: "Los_Angeles, CA, US", timezoneId: 'America/Los_Angeles'}, {name: "Tokyo, Japan", timezoneId: 'Asia/Tokyo'}]
    };
    this.googleMapsClient = google_maps.createClient({key: 'AIzaSyDWHjfjxDM1dn-Hcz2sjr8g24M_plSBrG0'});
  }

  handleFormSubmit (timezone) {
    this.googleMapsClient.geocode({
      address: this.state.timezone_name
    }, function(err, response) {
      if (!err) {
        // Get lat lng

        // Get timezone from lat lng

        // Update State

        // Currently WIP: need to update state AFTER timezone api call
        const timezones = update(this.state.timezones, { $push: [
            {name: response.json.results[0].formatted_address, timezoneId: 'test'}]});

        this.getTimezoneId(response.json.results[0].geometry.location.lat,
            response.json.results[0].geometry.location.lat);

        this.setState({timezones: timezones})
      }
      else {
        console.log('Could not find a timezone from that address or city. Error:');
        console.log(err);
      }
    }.bind(this));
  }

  getTimezoneId(lat, lng){
    // Improvements: can transfer this to a utils file, and pass in a callback to update the state!

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
          var offsets = output.dstOffset * 1000 + output.rawOffset * 1000 // get DST and time zone offsets in milliseconds
          var localdate = new Date(timestamp * 1000 + offsets) // Date object containing current time of Tokyo (timestamp + dstOffset + rawOffset)
          console.log(localdate.toLocaleString()) // Display current Tokyo date and time
        }
      }
      else{
        alert('Request failed.  Returned status of ' + xhr.status)
      }
    }
    xhr.send() // send request
  }



  handleUserInput (obj) {
    this.setState(obj)
  }

  render() {
    return (
      <div>
        <TimezoneForm onFormSubmit={() => this.handleFormSubmit()}
                      onUserInput={(obj) => this.handleUserInput(obj)}
                      input_timezone_name={this.state.timezone_name}
        />
        <TimezoneList timezones={this.state.timezones}/>
      </div>
    );
  }
}
