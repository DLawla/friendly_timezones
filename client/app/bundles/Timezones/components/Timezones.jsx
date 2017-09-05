import PropTypes from 'prop-types';
import React from 'react';
import TimezoneForm from './TimezoneForm';
import TimezoneList from './TimezoneList';
import update from 'immutability-helper';
import google_maps from '@google/maps';
import {getTimezoneId} from '../utils/timezoneid_finder';

export default class Timezones extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      timezone_name: '',
      timezone_id: '',
      lat: null,
      lng: null,
      timezones: [{name: "Los_Angeles, CA, US", timezoneId: 'America/Los_Angeles', lat: 12, lng: 13},
        {name: "Tokyo, Japan", timezoneId: 'Asia/Tokyo', lat: 14, lng: 15}]
    };
    // Init google maps client
    this.googleMapsClient = google_maps.createClient({key: 'AIzaSyDWHjfjxDM1dn-Hcz2sjr8g24M_plSBrG0'});
  }

  handleFormSubmit = (timezone) => {
    // Summary:
    // Get lat lng
    // Get timezone from lat lng
    // Update State

    this.googleMapsClient.geocode({
      address: this.state.timezone_name
    }, (err, response) => {
      if (!err) {
        let lat = response.json.results[0].geometry.location.lat;
        let lng = response.json.results[0].geometry.location.lng;
        this.setState({lat: lat, lng: lng, timezone_name: response.json.results[0].formatted_address});

        getTimezoneId(lat, lng, (timezoneId) => {
          const timezones = update(this.state.timezones, { $push: [
            {name: this.state.timezone_name,
              timezoneId: timezoneId,
              lat: this.state.lat,
              lng: this.state.lng}]});
          this.setState({timezones: timezones})
          }
        );
      }
      else {
        console.log('Could not find a timezone from that address or city. Error:');
        console.log(err);
      }
    });
  };

  handleUserInput = (obj) => {
    this.setState(obj)
  };

  render() {
    return (
      <div>
        <TimezoneForm onFormSubmit={this.handleFormSubmit}
                      onUserInput={this.handleUserInput}
                      input_timezone_name={this.state.timezone_name}
        />
        <TimezoneList timezones={this.state.timezones}/>
      </div>
    );
  }
}
