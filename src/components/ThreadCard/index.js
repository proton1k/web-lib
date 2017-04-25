import React, {Component, PropTypes} from 'react'
import {distanceInWordsToNow, isValid as isValidDate} from 'date-fns'
import cn from 'classnames'

import DEFAULT_PROFILE_IMAGE from '../../../src/assets/img/default-logo.png'

class ThreadCard extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    date: PropTypes.string,
    isRead: PropTypes.bool.isRequired,
    onClick: PropTypes.func
  };

  static defaultProps = {
    image: DEFAULT_PROFILE_IMAGE,
    date: null
  };

  render () {
    const {image, title, subtitle, date, isRead} = this.props

    const listItemCss = cn({
      'list-item': true,
      'box': true,
      'box-shadow': true,
      'is-read': isRead
    })

    return (
      <li className='list-wrapper' onClick={this.handleClick}>
        <div className={listItemCss}>

          <div className='list-body'>
            <div className='list-thumb large'>
              <img alt='Avatar'
                src={image}
                onError={(e) => { e.target.src = DEFAULT_PROFILE_IMAGE }}
              />
            </div>

            <div className='list-info'>
              <div className='list-item-subtitle'>
                {subtitle}
              </div>
              <h2 className='list-item-title'>
                {title}
              </h2>
            </div>
          </div>

          <div className='list-controlls text-right'>
            <div className='expire'>
              {date && isValidDate(date) && distanceInWordsToNow(date)}
            </div>
          </div>

        </div>
      </li>
    )
  }

  handleClick = (e) => {
    if (e) e.preventDefault()

    if (this.props.onClick) {
      this.props.onClick()
    }
  }
}

export default ThreadCard
