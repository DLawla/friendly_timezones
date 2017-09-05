import PropTypes from 'prop-types';
import React from 'react';

export default class TimezoneForm extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = { name: this.props.name };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onFormSubmit();
  };

  handleChange = (e) => {
    const timezone_name = e.target.name;
    const obj = {};
    obj[timezone_name] = e.target.value;
    this.props.onUserInput(obj);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            id="name"
            name="name"
            type="text"
            value={this.props.name}
            onChange={this.handleChange}
          />
          <input type="submit" value="Select" name="commit" disabled={!this.props.formValid}/>
        </form>
      </div>
    );
  }
}
