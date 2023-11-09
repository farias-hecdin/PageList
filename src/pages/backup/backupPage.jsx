import css from "./backupPage.module.css";
import { ButtonBase } from "../../components/index";
import { DataContext } from "../../context/index";
import { HeaderSecondary } from "../../layout/index";
import { useContext } from "react";

// Nodo previo: ../app.jsx

export const BackupPage = () => {
  const { dataCollections, dataTopics, dataLists, dataBookmarks } = useContext(DataContext);

  /** Limpiar el contenido de un textarea */
  const cleanTextarea = () => {
    let $nodeTextarea = document.getElementById("textarea_xucOeryf8lU");
    $nodeTextarea.value = "";
  };

  // Exportar datos -----------------------------------------------------------

  /**
   * Exportar datos al exterior
   * @param {boolean} _isDownloader ¿Contenido es descargable?
   */
  const clickButtonExport = (_isDownloader = false) => {
    try {
      let $nodeTextarea = document.getElementById("textarea_xucOeryf8lU");
      let mapDataFromBookmarks = mapNewDataArray();
      let currentDate = getCurrentDate();
      let fileName = `Pagelist_${currentDate}`;
      let dataInString = JSON.stringify(mapDataFromBookmarks, null, 4);

      $nodeTextarea.value = dataInString;
      if (_isDownloader === true) {
        makeHtmlNodeAndFile(fileName, dataInString);
      }
    } catch (error) {
      console.warn("SavePage > clickButtonExport", error.stack);
    }
  };

  /**
   * Retornar la fecha actual en formato: Year_Month_Day
   * @returns {string}
   */
  const getCurrentDate = () => {
    let d = new Date();
    let date = { year: d.getFullYear(), month: d.getMonth(), day: d.getDay() };
    let year, month, day;

    year = date.year.toString();
    if (date.month <= 9) month = `0${date.month.toString()}`;
    if (date.day <= 9) day = `0${date.day.toString()}`;

    return `${year}_${month}_${day}`;
  };

  /**
   * Crear un elemento anchor `<a>` HTML y un fichero *.json
   * @param {string} _fileName ¿Nombre del archivo?
   * @param {string} _contentOfFile ¿Contenido?
   */
  const makeHtmlNodeAndFile = (_fileName, _contentOfFile) => {
    let link = document.createElement("a");
    let blob = new Blob([_contentOfFile], { type: "text/plain" });

    link.download = _fileName + ".json";
    link.href = URL.createObjectURL(blob);
    link.click();

    URL.revokeObjectURL(link.href);
  };

  /**
   * Mapear un nuevo array a partir de lo datos existentes en `collections`,
   * `topics`, `lists` y `links` y retornar el resultado.
   * @returns {Array}
   */
  const mapNewDataArray = () => {
    const collections = [...dataCollections];
    const topics = [...dataTopics];
    const lists = [...dataLists];
    const links = [...dataBookmarks];

    // Asigna las listas y los enlaces a los temas
    topics.map((topic) => {
      topic.lists = lists.filter((list) => list.originId === topic.id);
      topic.lists.map((list) => {
        list.links = links.filter((link) => link.originId === list.id);
      });
    });
    // Asigna los temas a las colecciones
    collections.map((collection) => {
      collection.topics = topics.filter((topic) => topic.originId === collection.id);
    });

    return collections;
  };

  // Importar datos  ----------------------------------------------------------

  /**
   * Comprovar si los datos cumple con el patron asignado y retornarlo en un
   * array de objectos
   * @param {string} _data ¿JSON stringify a validar?
   * @returns {Array}
   */
  const isValidJSON = (_data) => {
    const regex = /^[\{|\[\s+\}]/;
    if (!regex.test(_data)) {
      alert("El valor ingresado no es un objeto JSON válido");
      throw new Error("isValidJSON");
    }
    return JSON.parse(_data);
  };

  /**
   * Importar datos del input y validar sus propiedades
   * @returns {Array}
   */
  const importDataAndValidate = () => {
    let $nodeTextarea = document.getElementById("textarea_xucOeryf8lU");
    let dataToImport = $nodeTextarea.value;
    let parsedData;

    if (!dataToImport) {
      alert("Datas not found");
      throw new Error("importDataAndValidate");
    }
    dataToImport = isValidJSON(dataToImport);

    // Validar datos importados
    if (!dataToImport) {
      alert("Collections not found");
      throw new Error("importDataAndValidate");
    }
    parsedData = dataToImport;

    for (let collections of parsedData) {
      if (!collections.topics) {
        alert("Topics not found");
        throw new Error("importDataAndValidate");
      }
      parsedData = collections.topics;

      for (let topics of parsedData) {
        if (!topics.lists) {
          alert("Lists not found");
          throw new Error("importDataAndValidate");
        }
        parsedData = topics.lists;

        for (let lists of parsedData) {
          if (!lists.links) {
            alert("Links not found");
            throw new Error("importDataAndValidate");
          }
        }
      }
    }
    return dataToImport;
  };

  /**
   * Guardar datos en localStorage
   * @param {string} _dataToLocalStorage
   */
  const saveDataInLocalStorage = (_dataToLocalStorage) => {
    let question = confirm("Do you want to save this section?");
    if (question === true) {
      localStorage.setItem("pagelist__latestSection", JSON.stringify(_dataToLocalStorage));
    }
  };

  /** Importar datos a la app */
  const clickButtonImport = () => {
    try {
      const newBookmarksList = importDataAndValidate();
      const resetSelectedCollection = "";

      saveDataInLocalStorage(newBookmarksList);

      setSavedBookmarks(newBookmarksList);
      setSelectedCollection(resetSelectedCollection);
    } catch (error) {
      console.warn("SavePage > clickButtonImport", error.stack);
    }
  };

  /** Limpiar la seccion guardad en localStorage */
  const deleteDataInLocalStorage = () => {
    const question = confirm("Do you want to delete the saved section?");
    if (question === true) {
      localStorage.setItem("pagelist__latestSection", "");
      setSavedBookmarks(bookmarksList);
    }
  };

  return (
    <section className={css.Container}>
      <HeaderSecondary title="Backup" text="Export and import your bookmark sections" />
      <div className={css.Container_box}>
        <nav className={css.Toolbar}>
          <div className={css.Toolbar_box}>
            <ButtonBase text="Export" icon="download" handleClick={clickButtonExport} />
            <ButtonBase text="Download as JSON" icon="download" handleClick={() => clickButtonExport(true)} />
            <ButtonBase text="Import" icon="upload" handleClick={clickButtonImport} />
          </div>
          <ButtonBase text="Delete saved" icon="delete" handleClick={deleteDataInLocalStorage} />
        </nav>
        <textarea
          className={css.Container_textarea}
          id="textarea_xucOeryf8lU"
          placeholder="Write a valid bookmark collection..."
        ></textarea>
        <div>
          <ButtonBase text="Clean" icon="cleaning-services-outline" handleClick={cleanTextarea} />
        </div>
      </div>
    </section>
  );
};
