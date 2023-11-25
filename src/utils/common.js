/**
 * Ordenar la propiedad `name` de los elementos por orden alfabetico y retorna
 * el resultado
 * @param {Array<object>} pData - El array de objetos a ordenar
 */
export const sortByName = (pData) => {
  const data = pData;
  data.sort((a, b) => {
    // ignorar upper y lowercase
    const textA = a.title.toUpperCase();
    const textB = b.title.toUpperCase();
    // retornar un numero
    return textA.localeCompare(textB);
  });
  return data;
};

/** Notificar si el evento onClick no esta declarado */
export const onClickMissing = () => {
  alert("Sorry, this functionality is not available yet.");
};

/**
 * Comparar `children.parent` con `parent.id` y retorna el numero de coincidencias
 * @param {Array<object>} pChildrenData - Datos de origen de los elementos hijos (children)
 * @param {string} pElementId - Id del elemento actual (parent)
 * @returns {number}
 */
export const compareAndCountIds = (pChildrenData, pElementId) => {
  let coincidence = 0;
  for (const children of pChildrenData) {
    if (children.parent === pElementId) {
      coincidence++;
    }
  }
  return coincidence;
};

/**
 * @param {object} prop
 * @param {string} prop.pKey
 * @param {any} prop.pValue
 * @param {Function} prop.pUpdater
 */
export const handleChange = (pKey, pValue, pUpdater) => {
  if (pKey !== null) {
    pUpdater((prev) => ({ ...prev, [pKey]: pValue }));
  } else {
    pUpdater(pValue);
  }
};
