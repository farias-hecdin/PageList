/** Eliminar un elemento de un Array de objetos y los anexa a un estado `set`
 * @param {string} _deleteElement ¿Id del elemento a eliminar?
 * @param {Array.<Object.<string, ?>>} _fromArray ¿Origen del elemento a eliminar?
 */
export const deleteThisElement = (_deleteElement, _fromArray) => {
  let data = _fromArray.state;
  let newARRAY = data.filter((item) => item.id !== _deleteElement);
  _fromArray.set(newARRAY);
};

/** Ordenar los elementos de un Array de objetos por orden alfabetico y retorna el resultado
 * @param {Array.<Object.<string, ?>>} _array ¿Array de objetos a ordenar?
 */
export const sortByName = (_array) => {
  const anArray = _array;
  anArray.sort((a, b) => {
    // ignore upper and lowercase
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    // return a number
    return nameA.localeCompare(nameB);
  });
  return anArray;
};

/** Notificar si el evento onClick no esta declarado */
export const onClickMissing = () => {
  alert("Sorry, this functionality is not available yet.");
};
