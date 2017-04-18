import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';
import {Notification} from 'react-notification';
import {hideAlertBar} from '../../actions/alertbar-actions';

class AlertBar extends Component {
  static PropTypes = {
    location: PropTypes.object.isRequired,

    type: PropTypes.string.isRequired,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    dismissAfter: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired,
    hideAlertBar: PropTypes.func.isRequired,
    hideOnRouteChange: PropTypes.bool.isRequired
  };

  static defaultProps = {
    type: 'success',
    message: '',
    dismissAfter: false,
    hideOnRouteChange: true,
    action: ' '
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      if (nextProps.isActive && nextProps.hideOnRouteChange) {
        nextProps.hideAlertBar();
      }
    }
  }

  render() {
    const {type, hideAlertBar, message, dismissAfter, ...rest} = this.props;

    const activeClasses = cn({
      shown: true,
      [`alert-${type}`]: Boolean(type)
    });

    const classes = cn({
      'alert-bar': true
    });

    const iconClasses = cn({
      'ion-checkmark-round': type === 'success',
      'ion-close-circled': type === 'error',
      'ion-alert-circled': type === 'warning'
    });

    const messageBody =
      <div>
        <i className={iconClasses}/>
        <span>{message}</span>
      </div>;

    return (
      <Notification
        {...rest}
        message={messageBody}
        style={false}
        isLast={false} // https://github.com/pburtchaell/react-notification/pull/108 someone did pull request and added check that clear timeout on willReceiveProps
        dismissAfter={dismissAfter}
        activeClassName={activeClasses}
        className={classes}
        onDismiss={dismissAfter ? hideAlertBar : null}
        onClick={hideAlertBar}
      />
    );
  }
}

export default connect(({alertbar}) => ({
  ...alertbar
}), {hideAlertBar})(AlertBar);
