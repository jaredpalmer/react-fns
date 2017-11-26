![repo-banner](https://user-images.githubusercontent.com/4060187/32896325-bff4a758-cab0-11e7-8cf5-62759e13fa6b.png)



**react-fns** is a collection of imperative Browser API's turned into declarative [React](https://github.com/facebook/react) components and higher-order components for lots of common situations.

_There's a lot more to do. The goal is to standardize almost every Web API on [MDN](https://developer.mozilla.org/en-US/docs/WebAPI)._

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [API Reference](#api-reference)
  - [Higher Order Components / Render Props](#higher-order-components--render-props)
  - [DeviceMotion](#devicemotion)
    - [DeviceMotion props](#devicemotion-props)
    - [`<DeviceMotion render/>`](#devicemotion-render)
    - [`withDeviceMotion()`](#withdevicemotion)
  - [DeviceOrientation](#deviceorientation)
    - [DeviceOrientation props](#deviceorientation-props)
    - [`<DeviceOrientation render/>`](#deviceorientation-render)
    - [`withDeviceOrientation()`](#withdeviceorientation)
  - [Network](#network)
    - [Network props](#network-props)
    - [`<Network render/>`](#network-render)
    - [`withNetwork()`](#withnetwork)
  - [GeoPosition](#geoposition)
    - [GeoPosition props](#geoposition-props)
    - [`<GeoPosition render/>`](#geoposition-render)
    - [`withGeoPosition()`](#withgeoposition)
  - [Media](#media)
    - [Media props](#media-props)
    - [Media render props](#media-render-props)
    - [`<Media render/>`](#media-render)
    - [`withMedia()`](#withmedia)
  - [Scroll](#scroll)
    - [Scroll props](#scroll-props)
    - [`<Scroll render/>`](#scroll-render)
    - [`withScroll()`](#withscroll)
  - [WindowSize](#windowsize)
    - [WindowSize props](#windowsize-props)
    - [`<WindowSize render/>`](#windowsize-render)
    - [`withWindowSize()`](#withwindowsize)
  - [Locales](#locales)
    - [Locales props](#locales-props)
    - [`<Locales render/>`](#locales-render)
    - [`withLocales()`](#withlocales)
  - [Utility Components](#utility-components)
    - [`<Mailto />`](#mailto-)
      - [Mailto props](#mailto-props)
    - [`<Sms />`](#sms-)
      - [Sms props](#sms-props)
- [Roadmap](#roadmap)
  - [Useful components](#useful-components)
  - [Browser API's](#browser-apis)
- [Author](#author)
- [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# API Reference

## Higher Order Components / Render Props

When possible, each component (e.g. `<Thing/>`) in react-fns also exports a higher-order component with identical functionality (e.g. `withThing()`.

Every render prop'd component shares the same three rendering methods:

- `<Thing render={props => <Inner />}>`
- `<Thing component={Inner}>`
- `<Thing>{props => <Inner />}</Thing>>`

All HoC's will pass through any and all additional props through to the inner component in addition to the props that they inject.

## DeviceMotion

Detect and retrieve current device Motion.

### DeviceMotion props

 - `acceleration: DeviceMotionEvent.acceleration`
 - `accelerationIncludingGravity: DeviceMotionEvent.accelerationIncludingGravity`
 - `rotationRate: DeviceMotionEvent.rotationRate`
 - `interval: DeviceMotionEvent.interval`

For more information about the DeviceMotion API, [check out the MDN reference](https://developer.mozilla.org/en-US/docs/Web/Events/devicemotion)

### `<DeviceMotion render/>`

```js
import { DeviceMotion } from 'react-fns'

const Example = () =>
  <DeviceMotion
    render={({ acceleration, accelerationIncludingGravity, rotationRate, interval }) =>
     <pre>
      {JSON.stringify({acceleration, accelerationIncludingGravity, rotationRate, interval}, null, 2)}
     </pre>
    }
  />

export default Example
```

### `withDeviceMotion()`

```js
import { withDeviceMotion } from 'react-fns'

const Inner = ({ acceleration, accelerationIncludingGravity, rotationRate, interval }) =>
  <pre>
    {JSON.stringify({acceleration, accelerationIncludingGravity, rotationRate, interval}, null, 2)}
  </pre>

export default withDeviceMotion(Inner)
```

## DeviceOrientation

Detect and retrieve current device orientation.

### DeviceOrientation props

- `alpha: number`:  value represents the motion of the device around the z axis, represented in degrees with values ranging from 0 to 360.
- `beta: number`: value represents the motion of the device around the x axis, represented in degrees with values ranging from -180 to 180. This represents a front to back motion of the device.
- `gamma: number`:  value represents the motion of the device around the y axis, represented in degrees with values ranging from -90 to 90. This represents a left to right motion of the device.

For more information about the DeviceOrientation API, [check out the MDN reference](https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation)

### `<DeviceOrientation render/>`

```js
import { DeviceOrientation } from 'react-fns'

const Example = () =>
  <DeviceOrientation
    render={({ alpha, beta, gamma, absolute }) =>
     <pre>
      {JSON.stringify({alpha, beta, gamma, absolute}, null, 2)}
     </pre>
    }
  />

export default Example
```

### `withDeviceOrientation()`

```js
import { withDeviceOrientation } from 'react-fns'

const Inner = ({ alpha, beta, gamma, absolute }) =>
  <pre>
    {JSON.stringify({alpha, beta, gamma, absolute}, null, 2)}
  </pre>

export default withDeviceOrientation(Inner)
```

## Network

Retrieve network access from the browser.

### Network props

- `online: boolean`: `true` if the browser has network access. `false` otherwise.
- `offlineAt?: Date`: Date when network connection was lost.

### `<Network render/>`

```js
import { Network } from 'react-fns'

const Example = () =>
  <Network
    render={({ online, offlineAt }) =>
     <div>
        {online ? 'Online!' : 'Offline'}
        {offlineAt && `Last connected ${offlineAt.toISOString()}`}
     </div>
    }
  />

export default Example
```

### `withNetwork()`

```js
import { withNetwork } from 'react-fns'

const Inner = ({ online, offlineAt }) =>
  <div>
    {online ? 'Online!' : 'Offline'}
    {offlineAt && `Last connected ${offlineAt.toISOString()}`}
  </div>

export default withNetwork(Inner)
```

## GeoPosition

Retrieve Geo position from the browser.

### GeoPosition props

- `isLoading: boolean`: `true` request status
- `coords?: Position`: Geoposition object. Has keys of `latitude` and `longitude`
- `error?: PositionError`: GeoPosition error. See MDN for shape.

### `<GeoPosition render/>`

```js
import { GeoPosition } from 'react-fns'

const Example = () =>
  <GeoPosition
    render={({ isLoading, coords, error }) =>
     <div>
        {coords &&  `${coords.longitude},${coords.latitude}`}
     </div>
    }
  />

export default Example
```

### `withGeoPosition()`

```js
import { withGeoPosition } from 'react-fns'

const Inner = ({ isLoading, coords, error }) =>
  <div>
   {coords &&  `${cords.longitude}$,{coords.latitude}`}
  </div>

export default withGeoPosition(Inner)
```

## Media

Retrieve media query (i.e. `window.matchMedia().matches`) from the browser. Note this component is taken from @mjackson's awesome [react-media](https://github.com/reacttraining/react-media)

### Media props

- `query: string`: A media query string

### Media render props

- `matches: boolean`: `true` if browser matches the media query

### `<Media render/>`

```js
import { Media } from 'react-fns'

const Example = () =>
  <Media
    query="(min-width: 1000px)"
    render={(match) =>
     <div>
        {match ? 'mobile' : 'desktop'}
     </div>
    }
  />

export default Example
```

### `withMedia()`

Not implemented

## Scroll

### Scroll props

- `x`: Horizontal scroll in pixels (`window.scrollX`)
- `y`: Vertical scroll in pixels (`window.scrollX`)

### `<Scroll render/>`

Returns `window.scrollY` and `window.scrollX`.

```js
import { Scroll } from 'react-fns'

const Example = () =>
  <Scroll
    render={({ x, y }) =>
     <div>Scroll: {x}, {y}</div>
    }
  />

export default Example
```

### `withScroll()`

Injects `window.scrollY` and `window.scrollX` as `x` and `y` props.

```js
import { withScroll } from 'react-fns'

const Inner = ({ x, y }) => <div>Scroll Position: {x}, {y}</div>

export default withScroll(Inner)
```

## WindowSize

### WindowSize props

- `width`: Width of browser viewport (`window.innerWidth`)
- `height`: Height of browser viewport (`window.innerHeight`)

### `<WindowSize render/>`

Returns `window.innerWidth` and `window.innerHeight`.

```js
import { WindowSize } from 'react-fns'

const Example = () =>
  <WindowSize
    render={({ width, height }) =>
     <div>Window size: {width}, {height}</div>
    }
  />

export default Example
```

### `withWindowSize()`

Injects `window.innerWidth` and `window.innerHeight` as `width` and `height` props.

```js
import { withWindowSize } from 'react-fns'

const Inner = ({ width, height }) => <div>Window size: {width}, {height}</div>

export default withWindowSize(Inner)
```

## Locales

### Locales props

- `locales`: The current browser locales (`navigator.languages` or `navigator.language`)

### `<Locales render/>`

Returns canonical `navigator.languages` or `navigator.language` as `locales`.

```js
import { Locales } from 'react-fns'

const Example = () =>
  <Locales
    render={({ locales }) =>
     <span>Right now the time and date is {new Intl.DateTimeFormat(locales).format(new Date())}</span>
    }
  />

export default Example
```

### `withLocales()`

Injects canonical `navigator.languages` or `navigator.language` as `locales` prop.

```js
import { withLocales } from 'react-fns'

const Inner = ({ locales }) => <span>Right now the time and date is {new Intl.DateTimeFormat(locales).format(new

export default withLocales(Inner)
```

## Utility Components

### `<Mailto />`

Renders `<a href="mailto:..." />`

#### Mailto props

- `email: string`: Recipient's email address
- `subject?: string`: Subject of the email
- `cc?: string | string[]`: Email address or an array of email addresses to Cc
- `bcc?: string | string[]`: Email address or an array of email addresses to Bcc (blind copy)
- `body?: string`: Body copy of the email

### `<Sms />`

Renders `<a href="sms:..." />`

#### Sms props

- `phone: string`: Phone number
- `body?: string`: Body copy of the text message

# Roadmap


## Useful components

- Fetch
- Draggable
- Droppable
- Orderable
- InfiniteList
- Parallax
- Pin (to Top / to Bottom)

## Browser API's

See https://developer.mozilla.org/en-US/docs/WebAPI for the full list
- MousePosition
- Viewport
  - [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
  - Other implementations
- Audio
 - [MidiAccess](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess)
- Battery Status
- Vibration
- Camera
- Measure

# Author

- Jared Palmer [@jaredpalmer](https://twitter.com/jaredpalmer)

# Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars0.githubusercontent.com/u/92839?v=4" width="100px;"/><br /><sub><b>MICHAEL JACKSON</b></sub>](https://twitter.com/mjackson)<br />[🤔](#ideas-mjackson "Ideas, Planning, & Feedback") | [<img src="https://avatars2.githubusercontent.com/u/14926950?v=4" width="100px;"/><br /><sub><b>Pavel Prichodko</b></sub>](https://github.com/prichodko)<br />[💻](https://github.com/jaredpalmer/react-fns/commits?author=prichodko "Code") [📖](https://github.com/jaredpalmer/react-fns/commits?author=prichodko "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/7615?v=4" width="100px;"/><br /><sub><b>Richard Powell</b></sub>](https://github.com/rpowell)<br />[💻](https://github.com/jaredpalmer/react-fns/commits?author=rpowell "Code") | [<img src="https://avatars2.githubusercontent.com/u/3269550?v=4" width="100px;"/><br /><sub><b>Tim Brown</b></sub>](https://github.com/brimtown)<br />[📖](https://github.com/jaredpalmer/react-fns/commits?author=brimtown "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/8162598?v=4" width="100px;"/><br /><sub><b>Jack Moore</b></sub>](https://github.com/jtmthf)<br />[💻](https://github.com/jaredpalmer/react-fns/commits?author=jtmthf "Code") | [<img src="https://avatars0.githubusercontent.com/u/207870?v=4" width="100px;"/><br /><sub><b>Dayle Rees</b></sub>](http://www.daylerees.com)<br />[📖](https://github.com/jaredpalmer/react-fns/commits?author=daylerees "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/1520?v=4" width="100px;"/><br /><sub><b>Thomas Flemming</b></sub>](http://thomasflemming.no)<br />[📖](https://github.com/jaredpalmer/react-fns/commits?author=thomasfl "Documentation") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars0.githubusercontent.com/u/5314713?v=4" width="100px;"/><br /><sub><b>Sam Kvale</b></sub>](http://skvale.github.io)<br />[🐛](https://github.com/jaredpalmer/react-fns/issues?q=author%3Askvale "Bug reports") [💻](https://github.com/jaredpalmer/react-fns/commits?author=skvale "Code") | [<img src="https://avatars0.githubusercontent.com/u/320910?v=4" width="100px;"/><br /><sub><b>Rhys Powell</b></sub>](http://rpowell.me)<br />[💻](https://github.com/jaredpalmer/react-fns/commits?author=rpowelll "Code") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
