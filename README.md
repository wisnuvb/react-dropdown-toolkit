# React Dropdown Toolkit

<!-- [![npm version](https://badge.fury.io/js/react-dropdown-toolkit.svg)](https://badge.fury.io/js/react-dropdown-toolkit)
[![Build Status](https://travis-ci.com/username/repository-name.svg?branch=main)](https://travis-ci.com/username/repository-name)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) -->

A customizable and searchable dropdown component for ReactJS.

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

| Prop               | Type                                                          | Default   | Description                             |
| ------------------ | ------------------------------------------------------------- | --------- | --------------------------------------- |
| options            | { label: string, value: string }[]                            | []        | The options to display in the dropdown  |
| multiple           | boolean                                                       | false     | Allows multiple selection               |
| withSearch         | boolean                                                       | true      | Enables search functionality            |
| onSelectedChange   | ((selected: string[]) => void                                 | undefined | Capture selected values in array format |
| portal             | boolean                                                       | false     | Renders dropdown in a portal            |
| outlined           | boolean                                                       | false     | Adds an outline to the dropdown         |
| customRenderOption | (option: { label: string, value: string }) => React.ReactNode | null      | Custom function to render an option     |
| zIndex             | number                                                        | 1000      | The z-index of the dropdown menu        |
| label              | string                                                        | "Label"   | The label for the dropdown              |

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

This project is licensed under the MIT License.
