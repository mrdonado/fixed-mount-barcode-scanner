# fixed-mount-barcode-scanner

[An npm module](https://www.npmjs.com/package/fixed-mount-barcode-scanner) to easily obtain the barcode read by a fixed mount usb barcode scanner of the company Newland (c).

This is designed to be integrated on a frontend, where you expect a barcode scanner input.

## Install the module

Import it to your project with the following command:

`npm install fixed-mount-barcode-scanner`

Or if you prefer yarn to npm install:

`yarn add fixed-mount-barcode-scanner` 

## Integrate it in your project

It can be integrated in your code like this:

```js
import bscanner from 'fixed-mount-barcode-scanner';

// This will start listening to the 'keydown' event of the document object.
bscanner.bindKeydown(); 

// This defines the callback 
const onBarcode = (code) => {
  console.log('Got a barcode!! ' + code);
  // Enter your code here to react to a barcode scan event.
};

// With this line, your callback will be invoked every time a barcode has been scanned
bscanner.setOnBarcode(onBarcode);
```

## Credits

Developed by [F. Javier R. Donado](https://www.jdonado.com) for [netvico GmbH](http://www.netvico.com)