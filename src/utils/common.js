/**
 * Ordenar la propiedad `name` de los elementos por orden alfabetico y retorna
 * el resultado
 * @param {Array<object>} pData - El array de objetos a ordenar
 * @return {Array<object>}
 */
export const sortByName = (data) => {
  const res = data;
  res.sort((a, b) => {
    // ignorar upper y lowercase
    const textA = a.title.toUpperCase();
    const textB = b.title.toUpperCase();
    // retornar un numero
    return textA.localeCompare(textB);
  });
  return res;
};

/** Notificar si el evento onClick no esta declarado */
export const onClickMissing = () => {
  alert("Sorry, this functionality is not available yet.");
};

/**
 * @param {string} key
 * @param {any} value
 * @param {Function} funcSet
 */
export const handleChange = (keyword, value, funcSet) => {
  if (keyword !== null) {
    funcSet((prev) => ({ ...prev, [keyword]: value }));
  } else {
    funcSet(value);
  }
};

/**
 * Actualiza localStorage de acuerdo a una palabra clave.
 * @param {string} keyword
 * @param {Array<object>} data
 */
export const updateStorageGroup = (keyword, data) => {
  const keys = ["pagelist_collections", "pagelist_topics", "pagelist_lists", "pagelist_bookmarks"];

  switch (keyword) {
    case "collection":
      localStorage.setItem(keys[0], JSON.stringify(data));
      break;
    case "topic":
      localStorage.setItem(keys[1], JSON.stringify(data));
      break;
    case "list":
      localStorage.setItem(keys[2], JSON.stringify(data));
      break;
    case "bookmark":
      localStorage.setItem(keys[3], JSON.stringify(data));
      break;
    default:
      console.warn("pKeyword not found");
      break;
  }
};

/**
 * Obtener el cantidad de un conjunto de hijos por el Id y actualiza el estado
 * @param {string} parentId - Id del elemento selecionado
 * @param {Array<object>} children - Datos de origen del hijo
 */
export const currentNumberElements = (parentId, children) => {
  let elementNumbers = countMatchingChildIds(children, parentId);
  return elementNumbers;
};

/**
 * Comparar `children.parent` con `parent.id` y retorna el numero de coincidencias
 * @param {Array<object>} childrenData - Datos de origen de los elementos hijos
 * @param {string} elementId - Id del elemento actual (parent)
 * @returns {number}
 */
export const countMatchingChildIds = (childrenData, parentId) => {
  let coincidence = 0;
  for (const children of childrenData) {
    if (children.parent === parentId) {
      coincidence++;
    }
  }
  return coincidence;
};

export const findId = (child, parentId) => {
  return child.find(c => c.id === parentId);
}
