import PropTypes from 'prop-types';
import React from 'react';
import Timezone from './timezone';

export default class TimezoneList extends React.Component {
  render() {
    return (
      <div className='timezones'>
        {this.props.timezones.map((timezone, i) => {
          return(
              <Timezone key={i} name={timezone.name} lat={timezone.lat} lng={timezone.lng}/>
              )
        })
        }
      </div>
    );
  }
}
