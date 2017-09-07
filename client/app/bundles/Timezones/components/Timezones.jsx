import PropTypes from 'prop-types';
import React from 'react';
import TimezoneErrors from './TimezoneErrors';
import TimezoneForm from './TimezoneForm';
import TimezoneList from './TimezoneList';
import update from 'immutability-helper';
import google_maps from '@google/maps';
import {getTimezoneId} from '../utils/timezoneid_finder';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
      loading: false,
      timezones: [{name: "Geneva, Switzerland", timezoneId: 'Europe/Zurich', lat: 14, lng: 15},
        {name: "Auckland, New Zealand", timezoneId: 'Pacific/Auckland', lat: 14, lng: 15},
      ]
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

  handleFormSubmit = (new_name) => {
    this.setState({loading: true});

    let duplicate_found = false;
    this.state.timezones.map((timezone, i) => {
      if (timezone.name === new_name) {
        duplicate_found = true;
        const timezones = this.state.timezones;
        timezones[i].duplicate_found = true;
        this.setState({timezones: timezones, name: '', lat: null, long: null});
        this.resetComponent();
      }
    });

    if (duplicate_found) {
      this.setState({loading: false});
      return;
    }

    geocodeByAddress(this.state.name)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          this.setState({loading: false});
          this.handleAddingNew(latLng)
        })
        .catch(error => {
          this.setState({loading: false});
          this.handleGeocodeFailure();
          this.resetComponent();
        });
  };

  handleAddingNew = (latLng) => {
    getTimezoneId(latLng.lat, latLng.lng, (timezoneId) => {
      const timezones = update(this.state.timezones, { $push: [
        {name: this.state.name,
          timezoneId: timezoneId,
          lat: this.state.lat,
          lng: this.state.lng,
        }]});
      this.setState({timezones: timezones});
      this.resetComponent();
    });
  };

  handleGeocodeFailure(){
    this.setState({formErrors: 'We can\'t seem to find that place in our atlas.' })
    setTimeout(() => {
      this.setState({formErrors: ''})
    }, 5000);
  }

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
    let errors = null;
    if (this.state.formErrors.length > 0) {
      errors = <TimezoneErrors formErrors={this.state.formErrors}/>
    }
    return (
      <div>
        <TimezoneForm onFormSubmit={this.handleFormSubmit}
                      onUserInput={this.handleUserInput}
                      name={this.state.name}
                      formValid={this.state.formValid}
                      loading={this.state.loading}
        />
        {errors}
        <TimezoneList timezones={this.state.timezones}
                      onRemoval={this.handleRemoval}
      />
      </div>
    );
  }
}
