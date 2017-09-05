import PropTypes from 'prop-types';
import React from 'react';
import Timezone from './Timezone';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

export default class TimezoneList extends React.Component {

  handleRemoval = (obj) => {
    this.props.onRemoval(obj);
  };

  render() {
    return (
      <ReactCSSTransitionGroup
          transitionName={ {
            enter: 'animated-fast',
            enterActive: 'flipInX',
            leave: 'animated-fast',
            leaveActive: 'flipOutX'
          } }
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
          className='timezones'>
        {this.props.timezones.map((timezone, i) => {
          return(
              <Timezone key={i}
                        name={timezone.name}
                        timezoneId={timezone.timezoneId}
                        animate={timezone.animate}
                        onRemoval={this.handleRemoval}
              />
              )
        })
        }
      </ReactCSSTransitionGroup>
    );
  }
}
