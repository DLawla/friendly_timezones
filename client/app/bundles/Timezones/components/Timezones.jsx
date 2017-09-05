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
      name: '',
      timezoneId: '',
      lat: null,
      lng: null,
      formErrors: '',
      formValid: false,
      timezones: [{name: "Los_Angeles, CA, US", timezoneId: 'America/Los_Angeles', lat: 12, lng: 13},
        {name: "Tokyo, Japan", timezoneId: 'Asia/Tokyo', lat: 14, lng: 15}]
    };
    // Init google maps client
    this.googleMapsClient = google_maps.createClient({key: 'AIzaSyDWHjfjxDM1dn-Hcz2sjr8g24M_plSBrG0'});
  }

  validateForm () {
    this.setState({formValid: this.state.name.length > 2})
  }

  resetComponent () {
    this.setState({name: '', lat: null, lng: null}, this.validateForm)
  }

  handleFormSubmit = (timezone) => {
    // Summary:
    // Get lat lng
    // Get timezone from lat lng
    // Update State

    this.googleMapsClient.geocode({
      address: this.state.name
    }, (err, response) => {
      if (!err) {
        let lat = response.json.results[0].geometry.location.lat;
        let lng = response.json.results[0].geometry.location.lng;
        this.setState({lat: lat, lng: lng, name: response.json.results[0].formatted_address});

        // If this timezone already exists,
        // reset the form,
        // animate the duplicate timezone,
        // and return early

        var duplicate_found = false;
        this.state.timezones.map((timezone, i) => {
          if (timezone.name == this.state.name) {
            duplicate_found = true;
            const timezones = this.state.timezones;
            timezones[i].animate = true;
            this.setState({timezones: timezones, name: '', lat: null, long: null});
            this.resetComponent();
          }
        });

        if (duplicate_found) {
          return
        }


        // Get timezone ID and add new timezone component
        getTimezoneId(lat, lng, (timezoneId) => {
          const timezones = update(this.state.timezones, { $push: [
            {name: this.state.name,
              timezoneId: timezoneId,
              lat: this.state.lat,
              lng: this.state.lng,
            }]});
          this.setState({timezones: timezones});
          this.resetComponent();
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
    this.setState(obj, this.validateForm)
  };

  handleRemoval = (obj) => {
    const timezones = this.state.timezones.filter((timezone) => {
      return (timezone.name != obj.name);
    });
    this.setState({timezones: timezones});
  };

  render() {
    return (
      <div>
        <TimezoneForm onFormSubmit={this.handleFormSubmit}
                      onUserInput={this.handleUserInput}
                      name={this.state.name}
                      formValid={this.state.formValid}
        />
        <TimezoneList timezones={this.state.timezones}
                      onRemoval={this.handleRemoval}
      />
      </div>
    );
  }
}
