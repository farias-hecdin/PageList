import { updateStorageGroup } from "../../../utils/common";

/**
 * @param {string} pElement - Id del elemento a eliminar
 * @param {Array<object>} pData - Datos de origen del elemento
 */
export const removeElementById = ({ pElement, pData }) => {
  let data = pData.filter((item) => item.id !== pElement);
  return data;
};

/**
 * Relocaliza un elemento y actualiza el estado
 * @param {string} pElement - Id del elemento a mover
 * @param {Array<object>} pData - Datos de origen del elemento
 * @param {Function} pSetState - Funcion `set` para actualizar los datos de origen del elemento
 * @param {string} pSelector - Selector del input/select
 */
export const relocateElementAndUpdateState = ({ pElement, pData, pSetState, pSelector }) => {
  const $node = document.querySelector(`${pSelector}`);
  const value = $node.value;

  const data = pData.map((item) => {
    if (pElement === item.id) {
      return { ...item, parent: value };
    }
    return item;
  });
  return data;
};

export const modifyElementAndUpdateState = ({ pData, pElement, pKeyword, pSetState, pValue, pValue2, pEvent }) => {
  pEvent.preventDefault();

  const value = pValue;
  const value2 = pKeyword === "bookmark" ? pValue2 : null;

  const data = pData.map((item) => {
    if (pElement === item.id) {
      const updatedItem = { ...item, title: value };
      if (pKeyword === "bookmark") {
        updatedItem.url = value2;
      }
      return updatedItem;
    }
    return item;
  });
  return data;
};

/**
 * Función que confirma una acción y actualiza el estado y el grupo de almacenamiento.
 * @param {boolean} pAsk - Si es verdadero, se mostrará un cuadro de diálogo de confirmación.
 * @param {Array<object>} pValue - El valor que se utilizará para actualizar el estado y localStorage.
 * @param {string} pKeyword
 * @param {Function} pSetState - Funcion `set` para actualizar los datos de origen del elemento
 */
export const confirmAndUpdateStateAndStorageGroup = (pAsk, pValue, pKeyword, pSetState) => {
  let question = pAsk ? confirm("Are you sure?") : true;
  let value = pValue;
  if (question === true) {
    pSetState(() => {
      let data = pValue;
      updateStorageGroup(pKeyword, data);
      return data;
    });
  }
};
