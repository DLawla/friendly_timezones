import PropTypes from 'prop-types';
import React from 'react';
import Timezone from './timezone';

export default class TimezoneList extends React.Component {
  render() {
    return (
      <div>
        <Timezone name="Auckland, NZ"/>
        <Timezone name="Chicago, IL, USA"/>
      </div>
    );
  }
}
