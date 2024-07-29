# React Dropdown Toolkit

[![npm version](https://img.shields.io/npm/v/react-dropdown-toolkit.svg)](https://www.npmjs.com/package/react-dropdown-toolkit)
[![codecov](https://codecov.io/gh/wisnuvb/react-dropdown-toolkit/graph/badge.svg?token=FHNNKMD3G5)](https://codecov.io/gh/wisnuvb/react-dropdown-toolkit)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/2ae451dbe2a0489aa7c8f23a2b110e42)](https://app.codacy.com/gh/wisnuvb/react-dropdown-toolkit/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/license/isc-license-txt)

A customizable and searchable dropdown component for ReactJS.

[See it in action (Demo)](https://react-dropdown-toolkit.vercel.app/)

## Features

- Search functionality
- Supports single and multiple selection
- Option to render in a portal

## Installation

Install the package via npm or yarn:

```bash
npm install react-dropdown-toolkit
or
yarn add react-dropdown-toolkit
```

## Usage

Here's a basic example of how to use the Dropdown component:

```js
import React from 'react';

import Dropdown from 'react-dropdown-toolkit';
import 'react-dropdown-toolkit/dist/index.css';

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

const App = () => {
  return (
    <div>
      <h1>Dropdown Example</h1>
      <Dropdown options={options} label="Select an option" />
    </div>
  );
};

export default App;
```

## Props

### Dropdown

| Prop               | Type                                                          | Default   | Description                                    |
| ------------------ | ------------------------------------------------------------- | --------- | ---------------------------------------------- |
| options            | { label: string, value: string }[]                            | []        | The options to display in the dropdown         |
| multiple           | boolean                                                       | false     | Allows multiple selection                      |
| withSearch         | boolean                                                       | true      | Enables search functionality                   |
| onSelectedChange   | ((selected: string[]) => void                                 | undefined | Capture selected values in array format        |
| portal             | boolean                                                       | false     | Renders dropdown in a portal                   |
| outlined           | boolean                                                       | true      | Adds an outline to the dropdown                |
| customRenderOption | (option: { label: string, value: string }) => React.ReactNode | null      | Custom function to render an option            |
| zIndex             | number                                                        | 1000      | The z-index of the dropdown menu               |
| label              | string                                                        | "Label"   | The label for the dropdown                     |
| noLabel            | boolean                                                       | false     | To hide labels                                 |
| labelWidth         | string                                                        | "250px"   | Set the label width and adjust it to your form |
| labelPosition      | string                                                        | "left"    | Displays label position                        |
| labelStyle         | {}                                                            | {}        | Custom label style                             |

## Development

To run the project locally for development:

### Clone the repository:

```bash
git clone https://github.com/wisnuvb/react-dropdown-toolkit.git
cd react-dropdown-toolkit
```

### Install dependencies:

```bash
npm run install
or
yarn install
```

### Build the project:

```bash
npm run build
or
yarn build
```

### Run tests:

```bash
npm run test
or
yarn test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the ISC License.
