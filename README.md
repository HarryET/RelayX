# RelayX for TS & React

[![NPM](https://img.shields.io/npm/v/relayx.svg)](https://www.npmjs.com/package/relayx)

## Install

```bash
npm install --save relayx
yarn add relayx
```

## Docs

https://relay-x.bitbucket.io

## Usage

```tsx
import React from 'react';
import { RelaySwipe, RelayOne } from 'relayx';

interface ExampleProps {}

export const Example: React.FC<ExampleProps> = ({}) => {
  
  return (
    <>
      {RelayOne.head()} {/* Adds Imports To Head MUST be included somewhere in application */}
      <RelaySwipe to={"harryet@moneybutton.com"} amount={"0.01"} currency={"bsv"} />
    </>
  );
}
```

## License

BSV 

## Credits

[RelayX](https://relayx.io/) relayone js libary <br>
[HarryET](https://twetch.app/u/17309) RelayX TS & React port
