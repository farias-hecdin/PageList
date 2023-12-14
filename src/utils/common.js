/**
 * Ordenar la propiedad `name` de los elementos por orden alfabetico y retorna
 * el resultado
 * @param {Array<object>} pData - El array de objetos a ordenar
 * @return {Array<object>}
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
 * @param {Array<object>} pChildrenData - Datos de origen de los elementos hijos
 * @param {string} pElementId - Id del elemento actual (parent)
 * @returns {number}
 */
export const countMatchingChildIds = (pChildrenData, pParentId) => {
  let coincidence = 0;
  for (const children of pChildrenData) {
    if (children.parent === pParentId) {
      coincidence++;
    }
  }
  return coincidence;
};

/**
 * @param {string} pKey
 * @param {any} pValue
 * @param {Function} pSetState
 */
export const handleChange = (pKey, pValue, pSetState) => {
  if (pKey !== null) {
    pSetState((prev) => ({ ...prev, [pKey]: pValue }));
  } else {
    pSetState(pValue);
  }
};

/**
 * Actualiza localStorage de acuerdo a una palabra clave.
 * @param {string} pKeyword
 * @param {Array<object>} pData
 */
export const updateStorageGroup = (pKeyword, pData) => {
  const keys = ["pagelist_collections", "pagelist_topics", "pagelist_lists", "pagelist_bookmarks"];

  switch (pKeyword) {
    case "collection":
      localStorage.setItem(keys[0], JSON.stringify(pData));
      break;
    case "topic":
      localStorage.setItem(keys[1], JSON.stringify(pData));
      break;
    case "list":
      localStorage.setItem(keys[2], JSON.stringify(pData));
      break;
    case "bookmark":
      localStorage.setItem(keys[3], JSON.stringify(pData));
      break;
    default:
      console.warn("pKeyword not found");
      break;
  }
};

/**
 * Obtener el cantidad de un conjunto de hijos por el Id y actualiza el estado
 * @param {string} pParentId - Id del elemento selecionado
 * @param {Array<object>} pChildren - Datos de origen del hijo
 * @param {string} pKey - Clave para `setCounterItem` (ex: topics, lists, ...)
 * @param {Function} pSetState - Funcion `setCounterItem`
 */
export const currentNumberElements = (pParentId, pChildren, pKey, pSetState) => {
  let elementNumbers = countMatchingChildIds(pChildren, pParentId);
  pSetState((prev) => ({ ...prev, [pKey]: elementNumbers }));
  return elementNumbers;
};
