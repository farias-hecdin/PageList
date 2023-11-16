/**
 * Ordenar los elementos de un Array de objetos por orden alfabetico y retorna
 * el resultado
 * @param {Array} fromArray_ ¿Elementos a ordenar?
 * @returns {Array}
 */
export const sortByName = (fromArray_) => {
  const data = fromArray_;
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

/**
 * Comparar `descendent.originId` con `element.id` y retorna el numero de coincidencias.
 * @param {Array} descendentData_ ¿Datos de los elementos descendientes?
 * @param {string} elementId_ ¿Id del elemento actual?
 * @returns {number}
 */
export const compareAndCountIds = (descendentData_, elementId_) => {
  let coincidence = 0;
  for (const descendent of descendentData_) {
    if (descendent.originId === elementId_) {
      coincidence++;
    }
  }
  return coincidence;
};
