/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as qs from 'qs';

export interface SmsProps extends React.HTMLAttributes<HTMLAnchorElement> {
  /** Phone number */
  phone: string;
  /** Email body text */
  body?: string;
}

export const Sms: React.SFC<SmsProps> = ({
  phone,
  body,
  children,
  ...props,
}) => {
  return (
    <a
      href={`sms:${phone}?${qs.stringify({
        body,
      })}`}
      {...props}
    >
      {children}
    </a>
  );
};

Sms.displayName = 'Sms';
