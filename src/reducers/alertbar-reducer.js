import {ALERT, SHOW, HIDE} from '../constants';

const defaultState = {
  isActive: false,
  message: '',
  action: '',
  dismissAfter: false,
  hideOnRouteChange: true,
  type: ' '
};

export default (state = defaultState, action) => {

  const {type, payload} = action;

  switch (type) {

    case ALERT + SHOW: {
      const {
        message,
        type = 'success',
        dismissAfter,
        action,
        hideOnRouteChange = true
      } = payload.notification;

      return {
        ...state,
        isActive: true,
        message: message || '',
        type: type || 'success',
        dismissAfter: dismissAfter || (type === 'success' ? 3000 : false),
        action: action || ' ',
        hideOnRouteChange
      };
    }

    case ALERT + HIDE:
      return {...state, isActive: false, dismissAfter: false};

  }

  return state;
};