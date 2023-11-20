/**
 * Eliminar un elemento y actualizar el estado
 * @param {string} pElement - Id del elemento a eliminar
 * @param {Array<object>} pData - Datos de origen del elemento
 * @param {Function} pUpdater - Funcion `set` para actualizar los datos de origen del elemento
 */
export const deleteElementAndUpdateState = ({ pElement, pData, pUpdater }) => {
  let question = confirm("Are you sure");
  let dataBefore = pData.filter((item) => item.id !== pElement);

  if (question === true) pUpdater(dataBefore);
};

/**
 * Mover un elemento y actualizar el estado
 * @param {string} pElement - Id del elemento a mover
 * @param {object} pData - Datos de origen del elemento
 * @param {Function} pUpdater - Funcion `set` para actualizar los datos de origen del elemento
 * @param {string} pSelector - Selector del input/select
 */
export const moveElementAndUpdateState = ({ pElement, pData, pUpdater, pSelector }) => {
  const $node = document.querySelector(`${pSelector}`);
  const value = $node.value;

  const data = pData.map((item) => {
    if (pElement === item.id) {
      return { ...item, parent: value };
    }
    return item;
  });
  pUpdater(data);
};

export const updateElementAndUpdateState = ({ pData, pElement, pType, pUpdater, pValue, pValue2, pEvent }) => {
  pEvent.preventDefault();

  const value = pValue;
  const value2 = pType === "bookmark" ? pValue2 : null;

  const data = pData.map((item) => {
    if (pElement === item.id) {
      const updatedItem = { ...item, title: value };
      if (pType === "bookmark") {
        updatedItem.url = value2;
      }
      return updatedItem;
    }
    return item;
  });
  pUpdater(data);
};
