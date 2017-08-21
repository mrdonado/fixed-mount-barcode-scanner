# fixed-mount-barcode-scanner

A module to easily obtain the barcode read by a fixed mount usb barcode scanner of the company Newland (c).

This is designed to be integrated on a frontend, where you expect a barcode scanner input.

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
