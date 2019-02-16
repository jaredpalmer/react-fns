import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as qs from 'qs';

import { Mailto } from '../Mailto';

describe('<Mailto />', () => {
  describe('<Mailto render />', () => {
    const node = document.createElement('div');

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(node);
    });

    it('renders element', () => {
      ReactDOM.render(
        <Mailto
          email="test@testing.com"
          subject="React-fns"
          body="Testing Mailto"
          cc={['test2@testing.com', 'test3@testing.com']}
          bcc={['test4@testing.com', 'test5@testing.com']}
        >
          test@testing.com
        </Mailto>,
        node
      );
      expect(node.innerHTML.includes('test@testing.com')).toBe(true);
      expect(node.getElementsByTagName('a')[0].getAttribute('href')).toContain(
        'mailto:test@testing.com'
      );
      expect(node.getElementsByTagName('a')[0].getAttribute('href')).toContain(
        qs.stringify('test4@testing.com')
      );
    });
  });
});
