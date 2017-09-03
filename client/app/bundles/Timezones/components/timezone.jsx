import React from 'react';
import moment from 'moment-timezone';
import { mod } from '../utils/mod';

export default class Timezone extends React.Component {
  render() {
    var time_now = moment(new Date());
    var local_time = time_now.tz(this.props.name).format('hh:mm a z');
    var local_time_int = parseInt(time_now.tz(this.props.name).format('hh'));
    return (
      <div className="timezone">
        {this.props.name} : {local_time}
        <table>
          <tbody>
            <tr>
              {[...Array(24)].map((x, i) => {
                    var time = mod(local_time_int - 12 + i, 24);
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
