/**
 * Extrae el valor de un conjunto `<input>` y `<select>` y retorna un objeto
 * @param {string} pInputSelector
 * @param {string} pSelectSelector
 * @returns {object}
 */
export const extractInputAndSelectValue = (pInputSelector, pSelectSelector) => {
  let $nodeInput = document.querySelector(pInputSelector);
  let $nodeSelect = document.querySelector(pSelectSelector);
  let selectValue = $nodeSelect?.options[$nodeSelect.selectedIndex].value;
  let inputValue = $nodeInput.value === "" ? "EMPTY" : $nodeInput.value;
  $nodeInput.value = "";

  return {
    inputValue: inputValue,
    selectValue: selectValue,
  };
};

/** Actualizar localStorage y retorna los nuevos datos */
export const updateStorageAndReturnData = (prev, data, key) => {
  let newData = [data, ...prev];
  localStorage.setItem(key, JSON.stringify(newData));
  return newData;
};
