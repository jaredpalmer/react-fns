import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Sms } from '../Sms';

describe('<Sms />', () => {
  describe('<Sms render />', () => {
    const node = document.createElement('div');

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(node);
    });

    it('renders element', () => {
      ReactDOM.render(
        <Sms phone="1234567890" body="testing">
          1234567890
        </Sms>,
        node
      );
      expect(node.innerHTML.includes('1234567890')).toBe(true);
      expect(node.getElementsByTagName('a')[0].getAttribute('href')).toContain(
        '1234567890'
      );
    });
  });
});
