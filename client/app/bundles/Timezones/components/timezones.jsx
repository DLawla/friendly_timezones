import PropTypes from 'prop-types';
import React from 'react';
import TimezoneForm from './timezone_form';
import TimezoneList from './timezone_list';
import update from 'immutability-helper';

export default class Timezones extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      timezone_name: '',
      timezones: [{name: "America/Los_Angeles"}, {name: "America/Toronto"}]
    }
  }

  handleFormSubmit (timezone) {
    const timezones = update(this.state.timezones, { $push: [{name: this.state.timezone_name}]});
    this.setState({timezones: timezones})
  }

  handleUserInput (obj) {
    console.log(obj)
    this.setState(obj)
  }

  render() {
    return (
      <div>
        <TimezoneForm onFormSubmit={() => this.handleFormSubmit()}
                      onUserInput={(obj) => this.handleUserInput(obj)}
                      input_timezone_name={this.state.timezone_name} />
        <TimezoneList timezones={this.state.timezones}/>
      </div>
    );
  }
}
