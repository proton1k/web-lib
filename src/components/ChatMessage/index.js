import React, { Component, PropTypes } from 'react'
import { distanceInWordsToNow } from 'date-fns'
import defaultPicture from '../../assets/img/mb-logo.svg'

class Message extends Component {
  static propTypes = {
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }

  static defaultProps = {
    picture: defaultPicture
  }

  render () {
    const {picture, name, date, text} = this.props

    return (
      <div className='box box-shadow'>
        <div className='list-item'>
          <div className='list-body'>
            <div className='list-thumb small hide-m'>
              <img
                alt='User Picture'
                src={picture}
                onError={(e) => { e.target.src = defaultPicture }}
                width='40'
              />
            </div>
            <div className='list-info'>
              <h2 className='list-item-subtitle'>
                {name}
              </h2>
            </div>
          </div>
          <div className='list-controlls text-right'>
            <div className='expire hide-m'>
              {distanceInWordsToNow(date)}
            </div>
          </div>
        </div>
        <div className='message-text'>
          {text}
        </div>
      </div>
    )
  }
}

export default Message
