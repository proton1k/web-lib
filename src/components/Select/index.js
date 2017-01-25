import React, {PropTypes, Component} from 'react';
import ReactSelect from 'react-select';
import cn from 'classnames';

/*********
 * loadOptions - returns a promise or calls a callback with
 *               the options: function(input, [callback])
 * onChange - callback on every change of input value
 * onSelect - callback on selecting a value in the list
 * onBlur, onFocus - for the cursor placed inside/outside input
 * optionRenderer - function that gets used to render the content of an option
 * isLoading - whether the Select is loading externally or not
 * noResultsText - displayed when there are no matching search results
 *                 or a falsy value to hide it
 * simpleValue - comma-separated string of values if true or
 *               an array of selected options if false
 * clearable - should it be possible to reset value
 * searchable - whether to enable searching feature or not
 *********/
class Select extends Component {

  constructor(props) {
    super(props);
    this.arrowRenderer = this.arrowRenderer.bind(this);
    this.optionRenderer = this.optionRenderer.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  static propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    inputProps: PropTypes.object,
    loadOptions: PropTypes.bool,
    options: PropTypes.array,
    optionRenderer: PropTypes.bool,
    onInputChange: PropTypes.func,  // does NOT mutate redux-form Field data
    onSelect: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    isLoading: PropTypes.bool,
    noResultsText: PropTypes.bool,
    matchPos: PropTypes.oneOf(['start', 'any']),
    matchProp: PropTypes.oneOf(['label', 'value', 'any']),
    arrowRenderer: PropTypes.func,
    multi: PropTypes.bool,
    simpleValue: PropTypes.bool,
    disabled: PropTypes.bool,
    clearable: PropTypes.bool,
    searchable: PropTypes.bool,
    clearIcon: PropTypes.string,
    valueKey: PropTypes.string,
    labelKey: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    clearIconHTML: PropTypes.string,  // DANGER !
    noArrow: PropTypes.bool,
    renderTags: PropTypes.bool,

    input: PropTypes.shape({
      name: PropTypes.string,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,  // mutates the redux-form Field data
      onDragStart: PropTypes.func,
      onDrop: PropTypes.func,
      onFocus: PropTypes.func,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    }),

    meta: PropTypes.shape({
      active: PropTypes.bool,
      asyncValidating: PropTypes.bool,
      autofilled: PropTypes.bool,
      dirty: PropTypes.bool,
      dispatch: PropTypes.func,
      error: PropTypes.string,
      invalid: PropTypes.bool,
      pristine: PropTypes.bool,
      submitting: PropTypes.bool,
      touched: PropTypes.bool,
      valid: PropTypes.bool,
      visited: PropTypes.bool,
      warning: PropTypes.string
    })
  };

  // find all default values here:
  // https://github.com/JedWatson/react-select
  static defaultProps = {
    input: {},
    meta: {},
    value: '',  // react-select expects a defined value
    valueKey: 'value',
    labelKey: 'label',
    matchPos: 'start',
    matchProp: 'label',
    options: undefined,
    isLoading: false,
    simpleValue: false,
    disabled: false,
    clearable: true,
    searchable: true,
    arrowRenderer: undefined,
    renderTags: true,
    clearIconHTML: '<i class="mb-icons-cross"/>'  // DANGER !
  };

  arrowRenderer({onMouseDown}) {
    const {arrowRenderer, noArrow} = this.props;

    if (noArrow) return <span/>;
    if (!noArrow && !!arrowRenderer) return arrowRenderer();
    if (!noArrow && !arrowRenderer) {
      return <span className='Select-arrow' onMouseDown={onMouseDown}/>;
    }
  }

  // WARNING !
  // The box with items which has any number of categories in the beginning
  // of the list will render scrolled to 1st disabled=false item.
  optionRenderer(option, key) {
    const {labelKey} = this.props;

    if (option.isCategory) {
      return (
        <div className='category' key={key}>
          <span>{option[labelKey]}</span>
        </div>
      );
    }
    return (
      <div className='option' key={key}>
        <span>{option[labelKey]}</span>
      </div>
    );
  }

  // to make it work with redux-form:
  // https://github.com/erikras/redux-form/issues/82
  // https://github.com/JedWatson/react-select/issues/1129
  onBlur(e) {
    const {onBlur, value, input, simpleValue, valueKey} = this.props;

    // the redux-form expects a value on blur
    if (typeof onBlur === 'function') return onBlur(e);

    if (!onBlur && typeof input.onBlur === 'function') {

      const val = value || input.value;

      if (typeof val === 'string') {
        const loc = this.props.options.find(l => l[valueKey] === val);
        return input.onBlur(
          simpleValue && loc && loc[valueKey] ? loc[valueKey] : loc
        );
      }

      return input.onBlur(val);
    }

  }

  render() {
    const {
      meta, input, placeholder, loadOptions, options, onInputChange, onSelect,
      value, name, isLoading, label, id,
      onFocus, clearable, searchable, matchPos, matchProp, clearIconHTML,
      disabled, simpleValue, multi, noResultsText, inputProps,
      valueKey, labelKey
    } = this.props;

    const {error, invalid, valid, touched, dirty} = meta;

    // option ~= {label, value, [disabled, isCategory]}
    const updOptions = options.map(option => {
      if (option.isCategory) {
        return {
          [labelKey]: option[labelKey],
          [valueKey]: option[valueKey],
          disabled: true,
          isCategory: true
        };
      }
      return option;
    });

    const css = cn({
      'select-wrapper': true,
      'select-input': true,
      'select-input-error': (touched && invalid),
      'select-input-success': (touched && valid)
    });

    const inputMessageCss = cn({
      'input-message': true,
      'input-message-error': (touched && invalid),
      'input-message-success': (touched && valid)
    });

    // 'react-select' expects a function in props.valueComponent
    // If not multi - then should not pass this prop at all
    const valueComponent = {};
    if (!this.props.renderTags) valueComponent.valueComponent = () => null;

    // ? use focusedOptionIndex for dropdown box item focus

    return (
      <div className={css}>

        {label && <label htmlFor={id}>{label}</label>}

        <ReactSelect
          {...valueComponent}
          inputProps={inputProps}
          valueKey={valueKey}
          labelKey={labelKey}
          name={name || input.name}
          placeholder={placeholder}
          value={value || input.value}
          options={updOptions}
          onInputChange={onInputChange}
          onChange={onSelect || input.onChange}
          onBlur={this.onBlur.bind(this)}
          onFocus={onFocus || input.onFocus}
          loadOptions={loadOptions}
          optionRenderer={this.optionRenderer}
          isLoading={isLoading}
          noResultsText={noResultsText}
          matchPos={matchPos}
          matchProp={matchProp}
          arrowRenderer={this.arrowRenderer.bind(this)}
          multi={multi}
          simpleValue={simpleValue}
          disabled={disabled}
          clearable={clearable}
          searchable={searchable}
          dangerouslySetInnerHTML={{__html: clearIconHTML}}  // DANGER !
        />

        <span className={inputMessageCss}>
          {(dirty || touched) && invalid && error}
        </span>

      </div>
    );
  }

}

export default Select;