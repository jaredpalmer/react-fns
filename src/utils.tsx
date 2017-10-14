import * as React from 'react';

export const isEmptyChildren = (children: any) =>
  React.Children.count(children) === 0;
