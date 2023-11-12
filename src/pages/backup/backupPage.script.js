// Export datas ---------------------------------------------------------------

/**
 * Mapear un nuevo array de objetos a partir de lo datos existentes en
 * `collections`, `topics`, `lists` y `bookmarks`
 * @param {Array} theCollections
 * @param {Array} theTopics
 * @param {Array} theLists
 * @param {Array} theBookmarks
 * @returns {Array} retornar un array de objeto.
 */
export const mapNewDataArray = (theCollections, theTopics, theLists, theBookmarks) => {
  const collections = [...theCollections];
  const topics = [...theTopics];
  const lists = [...theLists];
  const bookmarks = [...theBookmarks];

  // Asigna las listas y los enlaces a los temas
  topics.map((eachTopic) => {
    eachTopic.lists = lists.filter((eachList) => eachList.originId === eachTopic.id);

    eachTopic.lists.map((eachList) => {
      eachList.bookmarks = bookmarks.filter((eachBookmark) => eachBookmark.originId === eachList.id);
    });
  });
  // Asigna los temas a las colecciones
  collections.map((eachCollection) => {
    eachCollection.topics = topics.filter((eachTopic) => eachTopic.originId === eachCollection.id);
  });

  return collections;
};

/**
 * Retornar la fecha actual
 * @returns {string} Un string en formato `Year_Month_Day`
 */
export const getCurrentDate = () => {
  let d = new Date();
  let year = (d.getFullYear()).toString().slice(-2)
  let month = (d.getMonth() + 1).toString().slice(-2)
  let day = (d.getDay()).toString().slice(-2)

  return `${year}_${month}_${day}`;
};

/**
 * Crear un elemento anchor `<a>` HTML y un fichero *.json
 * @param {string} theFileName ¿Nombre del archivo?
 * @param {string} theContent ¿Contenido del archivo?
 */
export const makeHtmlNodeAndFile = (theFileName, theContent) => {
  let link = document.createElement("a");
  let blob = new Blob([theContent], { type: "text/plain" });

  link.download = theFileName + ".json";
  link.href = URL.createObjectURL(blob);
  link.click();

  URL.revokeObjectURL(link.href);
};

// Import datas ---------------------------------------------------------------

/**
 * Comprobar si los datos cumple con el patron asignado y retornar un array
 * de objectos
 * @param {string} theData ¿JSON a validar en string?
 * @returns {Array} Array de objetos
 */
const isValidJSON = (theData) => {
  const regex = /^[\{|\[\s+\}]/;
  if (!regex.test(theData)) {
    alert("El valor ingresado no es un archivo JSON válido");
    throw new Error("isValidJSON");
  }
  return JSON.parse(theData);
};

/**
 * Verifica si los datos especificados están disponibles
 * @param {Array} datas ¿Datos a verificar?
 * @param {string} text ¿Texto a mostrar si los datos no estan disponibles?
 * @returns {boolean}
 */
const areDataAvailable = (datas, text) => {
  if (!datas) {
    alert(`${text}`);
    throw new Error("importDataAndValidate");
  }
  return true;
};

/**
 * Importar datos del input y validar sus propiedades
 * @param {string} ElementById
 * @returns {Array} Array de objetos
 */
export const importDataAndValidate = (ElementById) => {
  let $nodeTextarea = document.getElementById(ElementById);
  let dataToImport = $nodeTextarea?.value;
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
 * @param {string} theData ¿Datos a exportar?
 */
export const saveDataInLocalStorage = (theData) => {
  let question = confirm("Do you want to save this section?");
  if (question === true) {
    localStorage.setItem("pagelist__latestSection", JSON.stringify(theData));
  }
};

/** @param {Array} theDatas */
const extractDataFromCollections = (theDatas) => {
  return theDatas.map((collection) => {
    return {
      originId: collection.originId,
      id: collection.id,
      name: collection.name,
      topics: []
    };
  });
};

/** @param {Array} theDatas */
const extractDataFromTopics = (theDatas) => {
  return theDatas.flatMap((collection) => {
    return collection.topics.map((topic) => {
      return {
        originId: topic.originId,
        id: topic.id,
        name: topic.name,
        lists: []
      };
    });
  });
};

/** @param {Array} theDatas */
const extractDataFromLists = (theDatas) => {
  return theDatas.flatMap((collection) => {
    return collection.topics.flatMap((topic) => {
      return topic.lists.map((list) => {
        return {
          originId: list.originId,
          id: list.id,
          name: list.name,
          bookmarks: []
        };
      });
    });
  });
};

/** @param {Array} theDatas */
const extractDataFromBookmarks = (theDatas) => {
  return theDatas.flatMap((collection) => {
    return collection.topics.flatMap((topic) => {
      return topic.lists.flatMap((list) => {
        return list.bookmarks.map((bookmark) => {
          return {
            originId: bookmark.originId,
            id: bookmark.id,
            name: bookmark.name,
            url: bookmark.url
          };
        });
      });
    });
  });
};

/**
 * Descomponer los datos en varias partes
 * @param {Array} theDatas
 * @returns {object}
 */
export const breakDownData = (theDatas) => {
  const collections = extractDataFromCollections(theDatas);
  const topics = extractDataFromTopics(theDatas);
  const lists = extractDataFromLists(theDatas);
  const bookmarks = extractDataFromBookmarks(theDatas);

  return {
    collections,
    topics,
    lists,
    bookmarks
  };
};
