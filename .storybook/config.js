import {configure} from '@kadira/storybook';
import '../src/styles/main.scss';

function loadStories() {
  require('../src/components/Button/stories');
  require('../src/components/Box/stories');
  require('../src/components/Loader/stories');
  require('../src/components/FontLoader/stories');
  require('../src/components/Input/stories');
  require('../src/components/TextareaInput/stories');
  require('../src/components/Checkbox/stories');
  require('../src/components/CheckboxGroup/stories');
  require('../src/components/RadioGroup/stories');
  require('../src/components/Tag/stories');
  require('../src/components/Tags/stories');
  require('../src/components/Select/stories');
  require('../src/components/InputRange/stories');
  require('../src/components/Multiselect/stories');
  require('../src/components/SelectWithLevels/stories');
  require('../src/components/DoubleSelect/stories');
  require('../src/components/AlertBar/stories');
  require('../src/components/StatsCircle/stories');
  require('../src/components/FormImageUploader/stories');
}

configure(loadStories, module);
