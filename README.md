# sendbird-uikit

> React based UI kit based on sendbird javascript SDK

> **ℹ️ NOTE**: This project is a forked version of the [Sendbird UI Kit](https://github.com/sendbird/sendbird-uikit-react) to match with the Ruangguru's internal requirements. Therefore, it is not yet set up to accept pull requests from external contributors. Please also be aware that we are not going to respond to any issues created from external contributors. Check the [internal docs](https://github.com/ruang-guru/sendbird-uikit-react/tree/rogu/v1/internal_docs) for more information about an internal contribution. The repository is here and you can always freely create a forked version from this repository to match with your own requirements.

## Getting Started

With Sendbird UI Kit React, we export these components:
(See `src/index.jsx`)

* SendBirdProvider - The context provider for SDK component
* withSendBird - HOC to access SendBirdProvider context
* useSendbirdStateContext - Hook to access SendBirdProvider context
* sendBirdSelectors - A bunch of useful selectors that can be used along with *withSendbird* or *useSendbirdStateContext*

* Channel - A UI Component where conversations happen
* ChannelList - A ChannelList UI component
* ChannelSettings - A component to handle the settings of a given channel
* MessageSearch - To search for a message from a Channel
* OpenChannel - A UI Component where open channel conversations happen
* OpenChannelSettings - A component to handle the settings of a given channel

* App - is a full fledged app(group channel) component made by combining the above components so that you dont have to combine all the above components by hand. Also it can be used as an example for composing components to build a chat UI

> Note 1: Dont forget to import the stylesheet from the repo too
> Note 2: Name of some components are different from the directories they are in(example -> Channel component is from Conversation component). Please keep that in mind

### Prerequisites

You need to install:
* nodejs 14 LTS https://nodejs.org/en/download/
* npm 7 or above

```
npm 14 deprecated warnings for fsevents& chokidar@2.1.8 will be fixed when storybook is updated to webpack 5
https://github.com/storybookjs/storybook/issues/12425#issuecomment-723043137
```

We tried development on Mac OS / Linux systems. You might encounter problems in running `npm run build` in Windows machines

### Development

We use storybook for development and rollup for building the npm distribution(bundled JS file)
Make sure you have nodejs and npm installed and run

```
Make a copy of env.example and save it as .env
Set your appId STORYBOOK_APP_ID
npm install
npm run storybook
```
> `npm run generate-component` generates a UI component skeleton in `src/ui`

* By default, storybook opens in http://localhost:6006/
* Smart Components such as ChannelList, Channel, ChannelSetting, App can be found under `OTHERS`
* Dumb components such as inputs, buttons etc can be found under `OTHERS/UI Components` in storybook sidebar
* Overridden storybook configs can be found in: `./storybook`

### Build

We use rollupJS for building the production bundle script that you want to use inside your applications.

We have both esm and commonjs output

```
npm run build
```

The bundled JS code can be found in `./release`
The CSS is in `./release/dist/index.css`

## Running the tests

We have implemented tests for dumb ui components only. Technologies used: Jest, Enzyme and react-dom/test-utils

```
npm run test
```

### Lint

```
npm run lint
```
* .eslintrc.json lints ts files and .eslintrc.js lints js files


### Typescript

* We are trying to progressively move our source code to typescript - which means older JS code and newly written TS code will coxist while we migrate older JS code to TS
* .eslintrc.json lints ts files and .eslintrc.js lints js files
* Type definition file can be `src/index.d.ts` which will be copied to `/release` directory

### Creating/exporting new components

1. Define your component inside './src'
2. Add the following line to './src/index.js'
  `export NewComponent from './src/location/of/NewComponent';`
3. Add the following line to './rollup.config.js' `input`
  `NewComponent: 'src/location/of/NewComponent',`
