import React from 'react';
import moment from 'moment-timezone';
import { mod } from '../utils/mod';

export default class Timezone extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    const time_now = moment(new Date());
    this.state = {
      name: this.props.name,
      timezoneId: this.props.timezoneId,
      animate: false,
      local_time: time_now.tz(this.props.timezoneId),
      local_time_formatted: time_now.tz(this.props.timezoneId).format('hh:mm:ss a z'),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
        () => this.tick(),
        1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const time_now = moment(new Date());
    this.setState({
      local_time: time_now.tz(this.props.timezoneId),
      local_time_formatted: time_now.tz(this.props.timezoneId).format('hh:mm:ss a z'),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);

    if (!this.props.duplicate_found && nextProps.duplicate_found){
      this.handleAnimate();
    }
  }

  handleAnimate() {
    this.setState({animate: true});
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
    let animate_class = '';

    if (this.state.animate) {
      animate_class = ' animated shake';
    }

    return (
        <div className={"timezone" + animate_class}>
          <div>
            {this.state.name} [{this.state.timezoneId}] {this.state.local_time_formatted}
            <button onClick={this.handleRemoval}
                    className="btn btn-removal">
              <em className="fa fa-times text-danger"/>
            </button>
          </div>

          <table>
            <tbody>
            <tr>
              {[...Array(24)].map((x, i) => {
                    let time = mod(this.state.local_time.format('hh') - 12 + i, 24);
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
