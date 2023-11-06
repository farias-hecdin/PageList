/**
 * Eliminar un elemento de un Array de objetos y anexarlos al estado `set`
 * @param {string} _deleteElement ¿Id del elemento a eliminar?
 * @param {Array} _fromArray ¿Origen del elemento a eliminar?
 * @param {Function} _updateArray
 */
export const deleteThisElement = (_deleteElement, _fromArray, _updateArray) => {
  let data = _fromArray;
  let dataBefore = data.filter((item) => item.id !== _deleteElement);
  _updateArray(dataBefore);
};

/**
 * Ordenar los elementos de un Array de objetos por orden alfabetico y retorna
 * el resultado
 * @param {Array} _fromArray ¿Elementos a ordenar?
 * @returns {Array}
 */
export const sortByName = (_fromArray) => {
  const data = _fromArray;
  data.sort((a, b) => {
    // ignorar upper y lowercase
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    // retornar un numero
    return nameA.localeCompare(nameB);
  });
  return data;
};

/** Notificar si el evento onClick no esta declarado */
export const onClickMissing = () => {
  alert("Sorry, this functionality is not available yet.");
};
