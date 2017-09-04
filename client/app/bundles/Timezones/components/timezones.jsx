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
      timezones: [{name: "America/Los_Angeles", lat: '46', lng: '120'}, {name: "America/Toronto", lat: '47', lng: '121'}]
    };
    this.googleMapsClient = google_maps.createClient({key: 'AIzaSyDWHjfjxDM1dn-Hcz2sjr8g24M_plSBrG0'});
  }

  handleFormSubmit (timezone) {
    this.googleMapsClient.geocode({
      address: this.state.timezone_name
    }, (err, response) => {
      if (!err) {
        console.log(response.json.results[0].formatted_address);
        console.log(response.json.results[0].geometry.location.lat);
        console.log(response.json.results[0].geometry.location.lng);
        // const timezones = update(this.state.timezones, {$push: [{name: response.json.results[0].formatted_address}]});

        // const timezones = update(this.state.timezones, { $push: [{name: this.state.timezone_name}]});
        // console.log(timezones);
        // this.setState({timezones: timezones})

        // lat: response.json.results[0].geometry.location.lat,
        // lng: response.json.results[0].geometry.location.lng
        // console.log(timezones);
        const timezones = update(this.state.timezones, { $push: [
            {name: response.json.results[0].formatted_address,
              lat: response.json.results[0].geometry.location.lat,
              lng: response.json.results[0].geometry.location.lng}]});
        this.setState({timezones: timezones})
      }
      else {
        console.log(err);
        console.log('Could not find a timezone from that address or city');
      }
    }).bind(this);
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
