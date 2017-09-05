import React from 'react';
import moment from 'moment-timezone';
import { mod } from '../utils/mod';

export default class Timezone extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      name: this.props.name,
      timezoneId: this.props.timezoneId,
      animate: this.props.animate,
    };
    console.log('rendered')
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.animate && nextProps.animate){
      this.handleAnimate(nextProps)
    }
  }

  handleAnimate(nextProps) {
    this.setState({animate: nextProps.animate});
    setTimeout(() => {
      this.setState({animate: false})
    }, 1000);
  };

  handleRemoval = (e) => {
    const obj = {};
    obj['name'] = this.state.name;
    this.props.onRemoval(obj);
  };

  render() {
    const time_now = moment(new Date());
    const local_time = time_now.tz(this.props.timezoneId).format('hh:mm a z');
    const local_time_int = parseInt(time_now.tz(this.props.timezoneId).format('hh'));
    let animate_class = '';

    if (this.state.animate) {
      animate_class = ' animated shake';
    }

    return (
        <div className={"timezone" + animate_class}>
          <div>
            {this.props.name} [{this.props.timezoneId}] {local_time}
            <button onClick={this.handleRemoval}>Remove</button>
          </div>


          <table>
            <tbody>
            <tr>
              {[...Array(24)].map((x, i) => {
                    let time = mod(local_time_int - 12 + i, 24);
                    return (
                        <td key={i} data-time={time} className={"timezone-hour hour-" + time.toString()}>
                          {time}
                        </td>
                    )
                  }
              )}
            </tr>
            </tbody>
          </table>
        </div>
    );
  }
}
