// Export datas ---------------------------------------------------------------

/**
 * Mapear un nuevo array de objetos a partir de los datos existentes en
 * `collections`, `topics`, `lists` y `bookmarks`
 * @param {Array} pCollections
 * @param {Array} pTopics
 * @param {Array} pLists
 * @param {Array} pBookmarks
 * @returns {Array} Retorna un array de objeto
 */
export const mapNewDataArray = (pCollections, pTopics, pLists, pBookmarks) => {
  const collections = [...pCollections];
  const topics = [...pTopics];
  const lists = [...pLists];
  const bookmarks = [...pBookmarks];

  // Asignar las listas y los enlaces a los temas
  topics.map((eachTopic) => {
    eachTopic.lists = lists.filter((eachList) => eachList.origin === eachTopic.id);
    eachTopic.lists.map((eachList) => {
      eachList.bookmarks = bookmarks.filter((eachBookmark) => eachBookmark.origin === eachList.id);
    });
  });
  // Asignar los temas a las colecciones
  collections.map((eachCollection) => {
    eachCollection.topics = topics.filter((eachTopic) => eachTopic.origin === eachCollection.id);
  });

  return collections;
};

/**
 * Retornar la fecha actual
 * @returns {string} Retorna un string en formato `Year_Month_Day`
 */
export const getCurrentDate = () => {
  let d = new Date();
  let year = d.getFullYear().toString().slice(-2);
  let month = (d.getMonth() + 1).toString().slice(-2);
  let day = d.getDay().toString().slice(-2);

  return `${year}_${month}_${day}`;
};

/**
 * Crear un elemento anchor `<a>` HTML y un fichero *.json
 * @param {string} pFileName - Nombre del archivo
 * @param {string} pContent - Contenido del archivo
 */
export const makeHtmlNodeAndFile = (pFileName, pContent) => {
  let link = document.createElement("a");
  let blob = new Blob([pContent], { type: "text/plain" });

  link.download = pFileName + ".json";
  link.href = URL.createObjectURL(blob);
  link.click();

  URL.revokeObjectURL(link.href);
};

// Import datas ---------------------------------------------------------------

/**
 * Comprobar si los datos cumple con el patron asignado y retornar un array
 * de objetos
 * @param {string} pData - JSON a validar
 * @returns {Array} Retorna un array de objetos
 */
const isValidJSON = (pData) => {
  const regex = /^[\{|\[\s+\}]/;
  if (!regex.test(pData)) {
    alert("El valor ingresado no es un archivo JSON válido");
    throw new Error("isValidJSON");
  }
  return JSON.parse(pData);
};

/**
 * Verifica si los datos especificados están disponibles
 * @param {Array} pData - Datos a verificar
 * @param {string} pText - Texto a mostrar si los datos no estan disponibles
 * @returns {boolean}
 */
const areDataAvailable = (pData, pText) => {
  if (!pData) {
    alert(`${pText}`);
    throw new Error("areDataAvailable");
  }
  return true;
};

/**
 * Importar los datos del input y validar sus propiedades
 * @param {string} pSelector - Id del nodo HTML textarea
 * @returns {Array} Retorna un array de objetos
 */
export const importDataAndValidate = (pSelector) => {
  let $node = document.querySelector(pSelector);
  let dataToImport = $node?.value;
  let parsedData;

  areDataAvailable(dataToImport, "Datas not found");
  dataToImport = isValidJSON(dataToImport);

  // Validar datos importados
  areDataAvailable(dataToImport, "Collections not found");
  parsedData = dataToImport;

  for (let collections of parsedData) {
    areDataAvailable(collections.topics, "Topics not found");
    parsedData = collections.topics;

    for (let topics of parsedData) {
      areDataAvailable(topics.lists, "Lists not found");
      parsedData = topics.lists;

      for (let lists of parsedData) {
        areDataAvailable(lists.bookmarks, "Bookmarks not found");
      }
    }
  }
  return dataToImport;
};

/*
 * Guardar datos en localStorage
 * @param {string} pData - Datos a exportar
 */
export const saveDataInLocalStorage = (pData) => {
  let question = confirm("Do you want to save this section?");
  if (question === true) {
    localStorage.setItem("pagelist__latestSection", JSON.stringify(pData));
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
      origin: collection.origin,
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
        origin: topic.origin,
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
          origin: list.origin,
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
            origin: bookmark.origin,
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
export const breakDownData = (pData) => {
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
