/**
 * Eliminar un elemento y actualizar el estado
 * @param {string} pElement ¿Id del elemento a eliminar?
 * @param {Array<object>} pOrigin ¿Datos de origen del elemento?
 * @param {Function} pUpdater ¿Funcion `set` para actualizar los datos de origen del elemento?
 */
export const deleteElementAndUpdateState = ({ pElement, pOrigin, pUpdater }) => {
  let question = confirm("Are you sure");
  let dataBefore = pOrigin.filter((item) => item.id !== pElement);
  console.log({ pElement, pOrigin, pUpdater })
  if (question === true) pUpdater(dataBefore);
};

/**
 * Mover un elemento y actualizar el estado
 * @param {string} pElement ¿Id del elemento a mover?
 * @param {object} pOrigin ¿Origen del elemento?
 * @param {Function} pUpdater ¿Funcion `set` para actualizar los datos de origen del elemento?
 * @param {string} pSelector ¿Id del input/select?
 */
export const moveElementAndUpdateState = ({ pElement, pOrigin, pUpdater, pSelector }) => {
  const $node = document.querySelector(`${pSelector}`);
  const value = $node.value;

  const data = pOrigin.map((item) => {
    if (pElement === item.id) {
      return { ...item, originId: value };
    }
    return item;
  });
  pUpdater(data);
};

export const updateElementAndUpdateState = ({ pElement, pOrigin, pUpdater, pSelector, pSelector2, pType }) => {
  const $node = document.querySelector(`${pSelector}`);
  const value = $node.value;
  const value2 = pType === "bookmark" ? document.querySelector(`${pSelector2}`).value : null;

  const newData = pOrigin.map((item) => {
    if (pElement === item.id) {
      const updatedItem = { ...item, name: value };
      if (pType === "bookmark") {
        updatedItem.url = value2;
      }
      return updatedItem;
    }
    return item;
  });
  pUpdater(newData);
};

