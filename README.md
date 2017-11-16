# react-fns

Browser API's as declarative React components and HoC's

*react-fns* is your React utility belt. It's a collection of imperative Browser API's turned into declarative components and higher-order components for lots of common situations.

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
    - [Locales](#locale)
      - [Locales props](#locale-props)
      - [`<Locales render/>`](#locale-render)
      - [`withLocales()`](#withlocale)
  - [Utility Components](#utility-components)
    - [`<Mailto />`](#mailto-)
      - [Mailto props](#mailto-props)
    - [`<Sms />`](#sms-)
      - [Sms props](#sms-props)
- [Author](#author)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

There's more to do. The goal is to standardize almost everything on MDN.

# API Reference

## Higher Order Components / Render Props

When possible, each component (e.g. `<Thing/>`) in react-fns also exports a higher-order component with identical functionality (e.g. `withThing()`.

Every render prop'd component shares the same three rendering methods:

- `<Thing render={props => <Inner />}>`
- `<Thing component={Inner}>`
- `<Thing>{props => <Inner />}</Thing>>`

All HoC's will pass through any and all additional props through to the inner component in addition to the props that they inject.


### DeviceMotion

Detect and retrieve current device Motion.

#### DeviceMotion props

 - `acceleration: DeviceMotionEvent.acceleration`
 - `accelerationIncludingGravity: DeviceMotionEvent.accelerationIncludingGravity`
 - `rotationRate: DeviceMotionEvent.rotationRate`
 - `interval: DeviceMotionEvent.interval`

For more information about the DeviceMotion API, [check out the MDN reference](https://developer.mozilla.org/en-US/docs/Web/Events/devicemotion)

#### `<DeviceMotion render/>`

```js
import { DeviceMotion } from 'react-fns'

const Example = () =>
  <DeviceMotion
    render={({ alpha, beta, gamma, absolute }) =>
     <pre>
      {JSON.stringify({alpha, beta, gamma}, null, 2)}
     </pre>
    }
  />

export default Example
```

#### `withDeviceMotion()`

```js
import { withDeviceMotion } from 'react-fns'

const Inner = ({ alpha, beta, gamma, absolute }) =>
  <pre>
    {JSON.stringify({alpha, beta, gamma}, null, 2)}
  </pre>

export default withDeviceMotion(Inner)
```

### DeviceOrientation

Detect and retrieve current device orientation.

#### DeviceOrientation props

- `alpha: number`:  value represents the motion of the device around the z axis, represented in degrees with values ranging from 0 to 360.
- `beta: number`: value represents the motion of the device around the x axis, represented in degrees with values ranging from -180 to 180. This represents a front to back motion of the device.
- `gamma: number`:  value represents the motion of the device around the y axis, represented in degrees with values ranging from -90 to 90. This represents a left to right motion of the device.

For more information about the DeviceOrientation API, [check out the MDN reference](https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation)

#### `<DeviceOrientation render/>`

```js
import { DeviceOrientation } from 'react-fns'

const Example = () =>
  <DeviceOrientation
    render={({ alpha, beta, gamma, absolute }) =>
     <pre>
      {JSON.stringify({alpha, beta, gamma}, null, 2)}
     </pre>
    }
  />

export default Example
```

#### `withDeviceOrientation()`

```js
import { withDeviceOrientation } from 'react-fns'

const Inner = ({ alpha, beta, gamma, absolute }) =>
  <pre>
    {JSON.stringify({alpha, beta, gamma}, null, 2)}
  </pre>

export default withDeviceOrientation(Inner)
```

### Network

Retrieve network access from the browser.

#### Network props

- `online: boolean`: `true` if the browser has network access. `false` otherwise.
- `offlineAt?: Date`: Date when network connection was lost.

#### `<Network render/>`

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

#### `withNetwork()`

```js
import { withNetwork } from 'react-fns'

const Inner = ({ online, offlineAt }) =>
  <div>
    {online ? 'Online!' : 'Offline'}
    {offlineAt && `Last connected ${offlineAt.toISOString()}`}
  </div>

export default withNetwork(Inner)
```

### GeoPosition

Retrieve Geo position from the browser.

#### GeoPosition props

- `isLoading: boolean`: `true` request status
- `coords?: Position`: Geoposition object. Has keys of `latitude` and `longitude`
- `error?: PositionError`: GeoPosition error. See MDN for shape.

#### `<GeoPosition render/>`

```js
import { GeoPosition } from 'react-fns'

const Example = () =>
  <GeoPosition
    render={({ isLoading, coords, error }) =>
     <div>
        {coords &&  `${cords.longitude}$,{coords.latitude}`}
     </div>
    }
  />

export default Example
```

#### `withGeoPosition()`

```js
import { withGeoPosition } from 'react-fns'

const Inner = ({ isLoading, coords, error }) =>
  <div>
   {coords &&  `${cords.longitude}$,{coords.latitude}`}
  </div>

export default withGeoPosition(Inner)
```

### Media

Retrieve  from the browser.

#### Media props

- `query: string`: A media query

#### Media render props

- `matches: boolean`: `true` if browser matches the media query

#### `<Media render/>`

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

#### `withMedia()`

Not implemented

### Scroll

#### Scroll props

- `x`: Horizontal scroll in pixels (`window.scrollX`)
- `y`: Vertical scroll in pixels (`window.scrollX`)

#### `<Scroll render/>`

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

#### `withScroll()`

Injects `window.scrollY` and `window.scrollX` as `x` and `y` props.

```js
import { withScroll } from 'react-fns'

const Inner = ({ x, y }) => <div>Scroll Position: {x}, {y}</div>

export default withScroll(Inner)
```

### Locales

#### Locales props

- `locales`: The current browser locales (`navigator.languages` or `navigator.language`)

#### `<Locales render/>`

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

#### `withLocales()`

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

# Author

- Jared Palmer [@jaredpalmer](https://twitter.com/jaredpalmer)
