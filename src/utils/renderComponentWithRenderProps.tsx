import * as React from 'react';
import { SharedRenderProps } from '../types';
import { isEmptyChildren } from './isEmptyChildren';

export function renderComponentWithRenderProps<S>(
  { render, component, children }: SharedRenderProps<S>,
  state: S
) {
  if (component) {
    return React.createElement(component as any, state);
  }

  if (render) {
    return render(state);
  }

  if (children) {
    if (typeof children === 'function') {
      return children(state);
    }

    if (!isEmptyChildren(children)) {
      return React.Children.only(children);
    }
  }

  return null;
}
