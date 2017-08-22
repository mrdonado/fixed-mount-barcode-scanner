'use strict';

// Variables global to this module
var _barcode = '';
var _barcodeCheckTimer = null;
var _callback = null;

/**
 * It binds the keydown listener to the onKeyPress function (only
 * available in the browser!)
 */
var bindKeydown = function bindKeydown() {
  if (document) {
    document.addEventListener('keydown', function (e) {
      return onKeyPressed(e);
    });
  }
};

/**
 * Bind a callback to be notified when a barcode has been scanned.
 * @param {function} cb 
 */
var setOnBarcode = function setOnBarcode(cb) {
  _callback = cb;
};

/**
 * After a string has been typed, this function recognises barcodes.
 * When a barcode has been detected, its product is retrieved from the
 * API and the productdetails view is shown.
 */
var checkBarcode = function checkBarcode() {
  var currentBarcode = void 0;
  // When the barcode has only 12 digits, it must be trailed with a zero on the left
  if (_barcode.length === 12) {
    // The last character must be removed (it's only a control figure).
    currentBarcode = '0' + _barcode.substring(0, _barcode.length - 1);
  } else if (_barcode.length === 13) {
    currentBarcode = _barcode.substring(0, _barcode.length - 1);
  }
  _barcode = '';
  _barcodeCheckTimer = null;
  if (_callback && currentBarcode) {
    _callback(currentBarcode);
  }
  return currentBarcode;
};

/**
 * It translates a a key code into the character it stands for.
 * @param {string} code
 * @returns {string} the typed character
 */
var codeToKey = function codeToKey(code) {
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
};

/**
 * Executed when a key has been pressed. It adds the key to the end of the _barcode property.
 * A timer will be programmed to check if the typed string belongs to a barcode.
 * @param {any} key
 * @returns void
 */
var onKeyPressed = function onKeyPressed(keyEvent) {
  var key = '';
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
    _barcodeCheckTimer = setTimeout(function () {
      return checkBarcode();
    }, 50);
  }
  // Special keys will be ignored
  if (key.length > 1) {
    return;
  }
  _barcode += key;
};

module.exports = {
  bindKeydown: bindKeydown,
  onKeyPressed: onKeyPressed,
  setOnBarcode: setOnBarcode
};
