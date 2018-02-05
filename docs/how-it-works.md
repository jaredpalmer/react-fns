---
id: how-it-works
title: How it works
---

When possible, each component (e.g. `<Thing/>`) in react-fns also exports a
higher-order component with identical functionality (e.g. `withThing()`.

Every render prop'd component shares the same three rendering methods:

* `<Thing render={props => <Inner />}>`
* `<Thing component={Inner}>`
* `<Thing>{props => <Inner />}</Thing>>`

All HoC's will pass through any and all additional props through to the inner
component in addition to the props that they inject.
