/**
  * Imprimir un aviso a traves `console.warn` que indica el tipo
  de dato y un mensaje de error.
  * @param {*} _data
  * @param {string} _message
*/
export const logConsole = (_message = "???", _data = null) => {
  let data = _data;

  if (Array.isArray(data) === true) {
    data = "array";
  } else {
    data = typeof data;
  }
  console.warn(`Error in: ${_message}, `, `Type: ${data}`);
};

/**
 * Expresion corta de `console.log`
 * @param {*} _data
 */
export const $ = (_data, _type = null) => {
  console.log("\u{1F535}", _data, _type !== null ? typeof _type : "");
};
