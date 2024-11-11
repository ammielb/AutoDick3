import * as React from 'react';
import renderer from 'react-test-renderer';

import { Timer} from '../Timer';

it(`renders correctly`, () => {
  const tree = renderer.create(   <Timer timeSet={133}></Timer>).toJSON();

  expect(tree).toMatchSnapshot();
});

