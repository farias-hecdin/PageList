// Export datas ---------------------------------------------------------------

/**
 * Mapear un nuevo array de objetos a partir de los datos existentes en
 * `collections`, `topics`, `lists` y `bookmarks`
 * @param {Array<object>} pCollections
 * @param {Array<object>} pTopics
 * @param {Array<object>} pLists
 * @param {Array<object>} pBookmarks
 * @returns {Array<object>}
 */
export const assignDataToCollections = (pCollections, pTopics, pLists, pBookmarks) => {
  const collections = [...pCollections];
  const topics = [...pTopics];
  const lists = [...pLists];
  const bookmarks = [...pBookmarks];

  // Asignar las listas y los enlaces a los temas
  topics.map((eachTopic) => {
    eachTopic.lists = lists.filter((eachList) => eachList.parent === eachTopic.id);
    eachTopic.lists.map((eachList) => {
      eachList.bookmarks = bookmarks.filter((eachBookmark) => eachBookmark.parent === eachList.id);
    });
  });
  // Asignar los temas a las colecciones
  collections.map((eachCollection) => {
    eachCollection.topics = topics.filter((eachTopic) => eachTopic.parent === eachCollection.id);
  });

  return collections;
};

/**
 * Retornar la fecha actual en formato `Year_Month_Day`
 * @returns {string}
 */
export const getFormattedCurrentDate = () => {
  const d = new Date();
  const year = d.getFullYear().toString().slice(-2);
  const month = (d.getMonth() + 1).toString().slice(-2);
  const day = d.getDay().toString().slice(-2);

  return `${year}_${month}_${day}`;
};

/**
 * Crear un nodo anchor `<a>` HTML y un archivo *.json
 * @param {string} pFileName - Nombre del archivo
 * @param {string} pContent - Contenido del archivo
 */
export const createHtmlNodeAndFile = (pFileName, pContent) => {
  const link = document.createElement("a");
  const blob = new Blob([pContent], { type: "text/plain" });

  link.download = pFileName + ".json";
  link.href = URL.createObjectURL(blob);
  link.click();

  URL.revokeObjectURL(link.href);
};

// Import datas ---------------------------------------------------------------

export const getJsonFileContent = (event) => {
  return new Promise((resolve, reject) => {
    let file = event.target.files[0]
    // Validar el archivo
    if (file.type !== 'application/json') {
      throw new Error("ERROR, the file format is incorrect. Please upload a .json file")
    }
    // Captura el contenido del archivo
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error);
    };
  })
}

/**
 * Comprobar si los datos cumple con el patron asignado y retornar un array
 * de objetos
 * @param {string} pData - JSON a validar
 * @returns {Array<object>}
 */
const validateJsonData = (pData) => {
  const regex = /^[\{|\[\s+\}]/;
  if (!regex.test(pData)) {
    alert("El valor ingresado no es un archivo JSON válido");
    throw new Error("validateJsonData");
  }
  return JSON.parse(pData);
};

/**
 * Verifica si los datos especificados están disponibles
 * @param {Array} pData - Datos a verificar
 * @param {string} pText - Texto a mostrar si los datos no estan disponibles
 * @returns {boolean}
 */
const checkDataAvailability = (pData, pText) => {
  if (!pData) {
    alert(`${pText} not found`);
    throw new Error("checkDataAvailability");
  }
  return true;
};

/**
 * Importar los datos del input y validar sus propiedades
 * @param {string} pSelector - Id del nodo HTML textarea
 * @returns {Array} Retorna un array de objetos
 */
export const importDataAndValidate = (data = []) => {
  let dataToImport = data;
  let parsedData;

  checkDataAvailability(dataToImport, "Datas");
  dataToImport = validateJsonData(dataToImport);

  // Validar datos importados
  checkDataAvailability(dataToImport, "Collections");
  parsedData = dataToImport;

  for (let collections of parsedData) {
    checkDataAvailability(collections.topics, "Topics");
    parsedData = collections.topics;

    for (let topics of parsedData) {
      checkDataAvailability(topics.lists, "Lists");
      parsedData = topics.lists;

      for (let lists of parsedData) {
        checkDataAvailability(lists.bookmarks, "Bookmarks");
      }
    }
  }
  return dataToImport;
};

/**
 * Gestionar los datos collections, topics, lists y bookmarks en localStorage
 * @param {boolean} pKeyword - Accion a realizar (add y delete)
 * @param {Array} values - Datos a exportar
 */
export const manageLocalStorageData = (pKeyword, ...pValues) => {
  const values = pValues.flat();
  const keys = ["pagelist_collections", "pagelist_topics", "pagelist_lists", "pagelist_bookmarks"];

  switch (pKeyword) {
    case "add":
      keys.forEach((key, i) => localStorage.setItem(key, JSON.stringify(values[i])));
      break;
    case "delete":
      keys.forEach((key) => localStorage.clear(key));
      break;
    default:
      console.warn("manageLocalStorageData: Keyword not found");
      break;
  }
};

/**
 * Extraer datos de *
 * @param {Array} pData
 * @returns {object} Retorna un objeto
 */
const extractDataFromCollections = (pData) => {
  return pData.map((collection) => {
    return {
      parent: collection.parent,
      id: collection.id,
      title: collection.title,
      topics: [],
    };
  });
};

/**
 * Extraer datos de *
 * @param {Array} pData
 * @returns {object} Retorna un objeto
 */
const extractDataFromTopics = (pData) => {
  return pData.flatMap((collection) => {
    return collection.topics.map((topic) => {
      return {
        parent: topic.parent,
        id: topic.id,
        title: topic.title,
        lists: [],
      };
    });
  });
};

/**
 * Extraer datos de *
 * @param {Array} pData
 * @returns {object} Retorna un objeto
 */
const extractDataFromLists = (pData) => {
  return pData.flatMap((collection) => {
    return collection.topics.flatMap((topic) => {
      return topic.lists.map((list) => {
        return {
          parent: list.parent,
          id: list.id,
          title: list.title,
          bookmarks: [],
        };
      });
    });
  });
};

/**
 * Extraer datos de *
 * @param {Array} pData
 * @returns {object} Retorna un objeto
 */
const extractDataFromBookmarks = (pData) => {
  return pData.flatMap((collection) => {
    return collection.topics.flatMap((topic) => {
      return topic.lists.flatMap((list) => {
        return list.bookmarks.map((bookmark) => {
          return {
            parent: bookmark.parent,
            id: bookmark.id,
            title: bookmark.title,
            url: bookmark.url,
          };
        });
      });
    });
  });
};

/**
 * Descomponer los datos en partes para ser guardados en sus estados
 * correspondientes (ex: dataCollection, dataTopics, ...)
 * @param {Array} pData - Los datos a descomponer
 * @returns {object} Retorna un objeto que contiene collections, topics, lists, bookmarks
 */
export const decomposeDataIntoCategories = (pData) => {
  const collections = extractDataFromCollections(pData);
  const topics = extractDataFromTopics(pData);
  const lists = extractDataFromLists(pData);
  const bookmarks = extractDataFromBookmarks(pData);

  return {
    collections,
    topics,
    lists,
    bookmarks,
  };
};
