import * as React from 'react';
import { isEmptyChildren } from './index';
import { SharedRenderProps } from '../types';

/**
 * Renders a component (or render prop/children) by using the following conditioning order:
 * - component
 * - render prop
 * - children as function
 * - children as component
 */
export function render<P>(
  { component, render: renderProp, children }: SharedRenderProps<P>,
  state: P
) {
  return component
    ? React.createElement(component as any, state)
    : renderProp
      ? (renderProp as any)(state)
      : children
        ? typeof children === 'function'
          ? children(state)
          : !isEmptyChildren(children) ? React.Children.only(children) : null
        : null;
}
