import css from "./SavePage.module.css";
import { BookmarksContext } from "../../context/bookmarks/bookmarksProvider";
import { ButtonBase } from "../../components/Index";
import { DataContext } from "../../context/Index";
import { useContext } from "react";
import { HeaderSection } from "../../layout/Index";

export const SavePage = () => {
  const { drawerCollections, drawerTopics, drawerLists, drawerLinks } = useContext(DataContext);
  const { savedBookmarks, selectedCollection, bookmarksList } = useContext(BookmarksContext);

  /** Limpiar textarea */
  const cleanTextarea = () => {
    let $nodeTextarea = document.getElementById("textarea_xucOeryf8lU");
    $nodeTextarea.value = "";
  }

  // Exportar datos -----------------------------------------------------------

  /** Exportar datos al exterior
   * @param {boolean} _isDownloader ¿El contenido es descargable?
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
      console.warn("Error in SavePage > clickButtonExport: " + error.stack);
      console.warn(error.stack);
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
   * @param {string} _contentOfFile
   */
  const makeHtmlNodeAndFile = (_fileName, _contentOfFile) => {
    let link = document.createElement("a");
    link.download = _fileName + ".json";

    let blob = new Blob([_contentOfFile], { type: "text/plain" });

    link.href = URL.createObjectURL(blob);
    link.click();

    URL.revokeObjectURL(link.href);
  };

  /** HERE: Mapear un nuevo array a partir de lo datos existentes en `collections`,
  `topics`, `lists` y `links`.
  * @return {Array.<Object.<string, ?>>}
  */
  const mapNewDataArray = () => {
    const collections = [...drawerCollections.state];
    const topics = [...drawerTopics.state];
    const lists = [...drawerLists.state];
    const links = [...drawerLinks.state];

    // Asigna las listas y los enlaces a los temas
    topics.map(topic => {
      topic.lists = lists.filter(list => list.originId === topic.id);
      topic.lists.map(list => {
        list.links = links.filter(link => link.originId === list.id);
      });
    });
    // Asigna los temas a las colecciones
    collections.map(collection => {
      collection.topics = topics.filter(topic => topic.originId === collection.id);
    });

    return collections;
  };

  // Importar datos  ----------------------------------------------------------
  const isValidJSON = (_data) => {
    let regex = /^[\{|\[\s+\}]/;
    if (!regex.test(_data)) {
      throw alert("El valor ingresado no es un objeto JSON válido");
    } else {
      return JSON.parse(_data);
    }
  }

  /** Importar datos del input y validar sus propiedades */
  const importDataAndValidate = () => {
    let $nodeTextarea = document.getElementById("textarea_xucOeryf8lU");
    let dataToImport = $nodeTextarea.value;

    if (!dataToImport) return alert("Datas not found");
    dataToImport = isValidJSON(dataToImport)

    // Validar datos importados
    let dataArray;

    if (dataToImport === undefined) {
      throw alert("Collections not found");
    }
    dataArray = dataToImport;

    for (let collections of dataArray) {
      if (collections.topics === undefined) {
        throw alert("Topics not found");
      }
      dataArray = collections.topics;

      for (let topics of dataArray) {
        if (topics.lists === undefined) {
          throw alert("Lists not found");
        }
        dataArray = topics.lists;

        for (let lists of dataArray) {
          if (lists.links === undefined) {
            throw alert("Links not found");
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
    let newBookmarksList = importDataAndValidate();
    let resetSelectedCollection = "";

    if (typeof newBookmarksList === "object") {
      saveDataInLocalStorage(newBookmarksList);
      savedBookmarks.set(newBookmarksList);
      selectedCollection.set(resetSelectedCollection);
    }
  };

  /** Limpiar la seccion guardad en localStorage */
  const deleteDataInLocalStorage = () => {
    let question = confirm("Do you want to delete the saved section?");
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
          <ButtonBase pText="Clean" pIcon="download HERE:" pHandleClick={cleanTextarea} />
        </nav>
        <textarea
          className={css.Container_textarea}
          id="textarea_xucOeryf8lU"
          placeholder="Write a valid bookmark collection..."
        ></textarea>
      </div>
    </section>
  );
};
