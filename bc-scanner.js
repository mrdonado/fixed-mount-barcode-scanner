let _barcode = '';
let _barcodeCheckTimer = null;

const bindKeydown = () => {
  document.addEventListener('keydown', e => keyPressed(e));
};


/**
 * After a string has been typed, this function recognises barcodes.
 * When a barcode has been detected, its product is retrieved from the
 * API and the productdetails view is shown.
 */
const checkBarcode = () => {
  // When the barcode has only 12 digits, it must be trailed with a zero on the left
  if (_barcode.length === 12) {
    // The last character must be removed (it's only a control figure).
    _productsService.scanBarcode('0' + _barcode.substring(0, _barcode.length - 1));
  } else if (_barcode.length === 13) {
    _productsService.scanBarcode(_barcode.substring(0, _barcode.length - 1));
  }
  _barcode = '';
  _barcodeCheckTimer = null;
};

/**
 * It translates a a key code into the character it stands for.
 * @param {string} code
 * @returns {string} the typed character
 */
const codeToKey = (code) => {
  // "KeyD" -> D
  if (code.indexOf('Key') > -1) {
    return code.substring(3);
  }
  // "Digit9" -> 9
  if (code.indexOf('Digit') > -1) {
    return code.substring(5);
  }
  // Numpad0 -> 0
  if (code.indexOf('Numpad') > -1) {
    return code.substring(6);
  }
  return 'UNKNOWN';
}

/**
 * Executed when a key has been pressed. It adds the key to the end of the _barcode property.
 * A timer will be programmed to check if the typed string belongs to a barcode.
 * @param {any} key
 * @returns void
 */
const keyPressed = (keyEvent) => {
  let key = '';
  if (typeof keyEvent.key !== 'undefined') {
    key = keyEvent.key;
  } else {
    key = codeToKey(keyEvent.code);
  }
  // If the timer has already been set, let it be. Otherwise, set it now.
  if (_barcodeCheckTimer === null) {
    // After 50ms of an input event, a check will be performed in order 
    // to know if the input belongs to a barcode or not. 
    // The barcode scanner will be fast enough to send a complete barcode in 
    // that time. A human wouldn't type that fast (I've tried!).
    _barcodeCheckTimer = setTimeout(() => checkBarcode(), 50);
  }
  // Special keys will be ignored
  if (key.length > 1) {
    return;
  }
  _barcode += key;
}
