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
            enterActive: 'flipInX'
          } }
          transitionLeave={false}
          transitionEnterTimeout={1000}
          className='timezones'>
        {this.props.timezones.map((timezone, i) => {
          return(
              <Timezone key={i}
                        name={timezone.name}
                        timezoneId={timezone.timezoneId}
                        duplicate_found={timezone.duplicate_found}
                        onRemoval={this.handleRemoval}
              />
              )
        })
        }
      </ReactCSSTransitionGroup>
    );
  }
}
