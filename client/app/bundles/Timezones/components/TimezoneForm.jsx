import PropTypes from 'prop-types';
import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


export default class TimezoneForm extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      name: this.props.name,
    };
  }

  handleChange = (value) => {
    console.log('change!');
    console.log(value);
    const obj = {};
    obj['name'] = value;
    this.props.onUserInput(obj);
  };

  handleSelect = (address, placeId) => {
    console.log('submit!');
    this.handleChange(address);
    this.props.onFormSubmit(address);
  };

  render() {
    const inputProps = {
      value: this.props.name,
      onChange: (value) => {this.handleChange(value);},
      type: 'search',
      placeholder: 'Search timezone by city, country or address...',
      autoFocus: true,
      disabled: this.props.loading,
      ref: (input) => { input && input.focus() }
    };
    const cssClasses = {
      input: 'form-control form-control-lg'
    };
    const AutocompleteItem = ({ formattedSuggestion }) => (
        <div>
          <i className='fa fa-map-marker'/>{' '}
          <strong>{formattedSuggestion.mainText}</strong>{' '}
          <small className="text-muted">{formattedSuggestion.secondaryText}</small>
        </div>
    );

    return (
      <div className="row">
        <div className="offset-sm-3 col-sm-6">
          <form>
            <div className="form-group">
              <PlacesAutocomplete
                  inputProps={inputProps}
                  classNames={cssClasses}
                  onSelect={this.handleSelect}
                  onEnterKeyDown={this.handleSelect}
                  autocompleteItem={AutocompleteItem}
                  googleLogo={false}
                  highlightFirstSuggestion={true}
              />
              {this.props.loading ? <div><i className="fa fa-spinner fa-spin fa-2x fa-fw loading-spinner" /></div> : null}
              {/*<input type="submit" value="Select" name="commit" disabled={!this.props.formValid}/>*/}
            </div>
          </form>
        </div>

      </div>
    );
  }
}
