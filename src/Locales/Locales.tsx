/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { SharedRenderProps } from '../types';
import { isEmptyChildren } from '../utils';

export interface LocalesProps {
  locale: string;
}

// TypeScript's definitions don't include this, though it has decent support in
// modern browsers.
// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/getCanonicalLocales
declare namespace Intl {
  function getCanonicalLocales(localse: string[]): string[];
}

export class Locales extends React.Component<
  SharedRenderProps<LocalesProps>,
  LocalesProps
> {
  state: LocalesProps = { locale: this.preferredLocales() };

  preferredLocales(): string {
    if (navigator.languages && navigator.languages.length > 0) {
      return Intl.getCanonicalLocales(navigator.languages)[0];
    }
    return Intl.getCanonicalLocales([navigator.language])[0];
  }

  handleLanguageChange = () => {
    this.setState({
      locale: this.preferredLocales(),
    });
  };

  componentDidMount() {
    window.addEventListener('languagechange', this.handleLanguageChange);
  }

  componentWillUnmount() {
    window.removeEventListener('languagechange', this.handleLanguageChange);
  }

  render() {
    const { render, component, children } = this.props;
    return component
      ? React.createElement(component as any, this.state)
      : render
        ? (render as any)(this.state)
        : children // children come last, always called
          ? typeof children === 'function'
            ? children(this.state)
            : !isEmptyChildren(children) ? React.Children.only(children) : null
          : null;
  }
}
