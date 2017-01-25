import React, {PropTypes, Component} from 'react';
import Loader from '../Loader';
import cn from 'classnames';

class Button extends Component {

  static propTypes = {
    href: PropTypes.string,
    target: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    extended: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'large', 'xlarge']),
    color: PropTypes.oneOf([
      'green',
      'red',
      'ln',
      'fb',
      'tw',
      'white',
      'danger'
    ]),
    base: PropTypes.bool
  };

  static defaultProps = {
    type: 'button',
    className: '',
    loading: false,
    disabled: false,
    extended: false,
    base: false
  };

  render() {
    const {
      className, type, loading, disabled, children, onClick, href, target
    } = this.props;

    const isDisabled = disabled || loading;

    const classes = cn({
      'base': this.props.base,
      [`button-${this.props.color}`]: this.props.color,
      [this.props.size]: this.props.size,
      'extended': this.props.extended,
      'button-disabled': isDisabled
    }, className);

    if (typeof href === 'string' && href.length > 0) {
      return  <a href={href} className='button' target={target}>{children}</a>;

    } else {

      return (
        <button
          type={type}
          className={classes}
          onClick={onClick}
          disabled={isDisabled}
        >
          {loading && <Loader size='tiny'/>}
          {children}
        </button>
      );

    }
  }
}

export default Button;