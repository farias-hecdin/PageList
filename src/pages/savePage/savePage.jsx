import css from "./savePage.module.css";
import { ButtonBase } from "../../components/index";
import { DataContext, BookmarksContext } from "../../context/index";
import { HeaderSection } from "../../layout/index";
import { useContext } from "react";

export const SavePage = () => {
  const { drawerCollections, drawerTopics, drawerLists, drawerLinks } = useContext(DataContext);
  const { savedBookmarks, selectedCollection, bookmarksList } = useContext(BookmarksContext);

  /** Limpiar textarea */
  const cleanTextarea = () => {
    let $nodeTextarea = document.getElementById("textarea_xucOeryf8lU");
    $nodeTextarea.value = "";
  };

  // Exportar datos -----------------------------------------------------------

  /** Exportar datos al exterior
   * @param {boolean} _isDownloader ¿El contenido se descargara?
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

  /** Retornar la fecha actual en formato: Year_Month_Day
   * @return {string}
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

  /** Crear un elemento anchor `<a>` HTML y un fichero *.json
   * @param {string} _fileName ¿Cual es el nombre del archivo?
   * @param {string} _contentOfFile ¿Cual es el contenido?
   */
  const makeHtmlNodeAndFile = (_fileName, _contentOfFile) => {
    let link = document.createElement("a");
    let blob = new Blob([_contentOfFile], { type: "text/plain" });

    link.download = _fileName + ".json";
    link.href = URL.createObjectURL(blob);
    link.click();

    URL.revokeObjectURL(link.href);
  };

  /** Mapear un nuevo array a partir de lo datos existentes en `collections`,
   `topics`, `lists` y `links`.
   * @return {Array.<Object.<string, ?>>}
   */
  const mapNewDataArray = () => {
    const collections = [...drawerCollections.state];
    const topics = [...drawerTopics.state];
    const lists = [...drawerLists.state];
    const links = [...drawerLinks.state];

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

  /** Comprovar si los datos cumple con el patron asignado
   * @param {string} _data
   */
  const isValidJSON = (_data) => {
    const regex = /^[\{|\[\s+\}]/;
    if (!regex.test(_data)) {
      alert("El valor ingresado no es un objeto JSON válido");
      throw new Error("isValidJSON");
    }
    return JSON.parse(_data);
  };

  /** Importar datos del input y validar sus propiedades */
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

  /** Guardar datos en localStorage
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

      savedBookmarks.set(newBookmarksList);
      selectedCollection.set(resetSelectedCollection);
    } catch (error) {
      console.warn("SavePage > clickButtonImport", error.stack);
    }
  };

  /** Limpiar la seccion guardad en localStorage */
  const deleteDataInLocalStorage = () => {
    const question = confirm("Do you want to delete the saved section?");
    if (question === true) {
      localStorage.setItem("pagelist__latestSection", "");
      savedBookmarks.set(bookmarksList);
    }
  };

  return (
    <section className={css.Container}>
      <HeaderSection pTitle="Manage" pText="Export and import your bookmark sections" />
      <div className={css.Container_box}>
        <nav className={css.Toolbar}>
          <div className={css.Toolbar_box}>
            <ButtonBase pText="Export" pIcon="download" pHandleClick={clickButtonExport} />
            <ButtonBase pText="Download as JSON" pIcon="download" pHandleClick={() => clickButtonExport(true)} />
            <ButtonBase pText="Import" pIcon="upload" pHandleClick={clickButtonImport} />
          </div>
          <ButtonBase pText="Delete saved" pIcon="delete" pHandleClick={deleteDataInLocalStorage} />
        </nav>
        <textarea
          className={css.Container_textarea}
          id="textarea_xucOeryf8lU"
          placeholder="Write a valid bookmark collection..."
        ></textarea>
        <div>
          <ButtonBase pText="Clean" pIcon="cleaning-services-outline" pHandleClick={cleanTextarea} />
        </div>
      </div>
    </section>
  );
};
