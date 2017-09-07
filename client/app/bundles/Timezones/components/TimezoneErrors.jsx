import React from 'react';

export default class TimezoneErrors extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      visible: true
    };
    this.scheduleRemoval()
  }

  scheduleRemoval = () => {
    setTimeout(() => {
      this.setState({visible: false})
    }, 4000);
  };

  render() {
    if (this.state.visible) {
      return (<div className="text-danger animated flipInX">{this.props.formErrors}</div>);
    }
    else {
      return (<div className="text-danger animated flipOutX">{this.props.formErrors}</div>);
    }
  }
};
