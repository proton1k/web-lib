import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Tag from './index';

storiesOf('Tag', module)
  .add('Default', () => (
    <Tag label='Label' id={0} />
  ))
  .add('styles', () => (
    <div>
      <div>
        <Tag label='Short / default' id={1}
          onClick={action('clicked')}
          onClose={action('closed')}
        />
      </div>
      <div>
        <Tag label='Active' id={2}
          onClick={action('clicked')}
          onClose={action('closed')}
        />
      </div>
      <div>
        <Tag label='Inactive' id={3} inactive
          onClose={action('closed')}
        />
      </div>
      <div>
        <Tag label='Extended' id={4} extended
          onClick={action('clicked')}
          onClose={action('closed')}
        />
      </div>
      <div>
        <Tag label='Extended' id={4}
          className='extended'
          onClick={action('clicked')}
          onClose={action('closed')}
        />
      </div>
      <div>
        <Tag label='Clickable' id={4}
          onClick={action('clicked')}
          onClose={action('closed')}
        />
      </div>
      <div>
        <Tag label='not Clickable' id={4} />
      </div>
    </div>
  ))
  .add('close icons', () => (
    <div>
      <div>
        <Tag label='Default' id={5}
          onClick={action('clicked')}
          onClose={action('closed')}
        />
      </div>
      <div>
        <Tag label='No close icon' id={6}
          onClick={action('clicked')}
          onClose={action('closed')}
          hideClose
        />
      </div>
      <div>
        <Tag label='Custom close icon' id={7}
          onClick={action('clicked')}
          onClose={action('closed')}
          closeIcon={'★'}
        />
      </div>
    </div>
  ));