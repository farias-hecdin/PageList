import css from "./SavePage.module.css";
import { BookmarksContext } from "../../context/bookmarks/bookmarksProvider";
import { ButtonBase } from "../../components/Index";
import { DataContext } from "../../context/Index";
import { useContext } from "react";
import { HeaderSection } from "../../layout/Index";

export const SavePage = () => {
  const { drawerCollections, drawerTopics, drawerLists, drawerLinks } = useContext(DataContext);
  const { savedBookmarks, selectedCollection, bookmarksList } = useContext(BookmarksContext);

  // Exportar datos -----------------------------------------------------------

  /** Exportar datos al exterior
   * @param {boolean} _isDownloader
   */
  const clickButtonExport = (_isDownloader = false) => {
    try {
      let $nodeTextarea = document.getElementById("textarea_xucOeryf8lU");
      let mapDataFromBookmarks = mapNewDataArray();
      let currentDate = getCurrentDate();
      let fileName = `Pagelist_${currentDate}`;
      let dataInString = JSON.stringify(mapDataFromBookmarks);

      $nodeTextarea.value = dataInString;
      if (_isDownloader === true) {
        makeHtmlNodeAndFile(fileName, dataInString);
      }
    } catch (error) {
      console.warn("Error in SavePage > clickButtonExport: " + error.message);
    }
  };

  /** Retornar la fecha actual en formato: Year_Month_Day */
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
   * @param {string} _fileName
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

  /** Mapear un nuevo array a partir de lo datos existentes en `collections`,
  `topics`, `lists` y `links`.
  * @return {Array.<Object.<string, ?>>}
  */
  const mapNewDataArray = () => {
    let collections = drawerCollections.state;
    let topics = drawerTopics.state;
    let lists = drawerLists.state;
    let links = drawerLinks.state;

    for (const itemCollection of collections) {
      for (const itemTopic of topics) {
        if (itemTopic.originId === itemCollection.id) {
          itemCollection.topics.push(itemTopic);
          for (const itemList of lists) {
            if (itemList.originId === itemTopic.id) {
              itemTopic.lists.push(itemList);
              for (const itemLink of links) {
                if (itemLink.originId === itemList.id) {
                  itemList.links.push(itemLink);
                }
              }
            }
          }
        }
      }
    }
    // Reiniciar el estado dado por push()
    topics.length = 0;
    lists.length = 0;
    links.length = 0;

    return collections;
  };

  // Importar datos  ----------------------------------------------------------

  /** Importar datos del input y validar sus propiedades */
  const importDataAndValidate = () => {
    let $nodeTextarea = document.getElementById("textarea_xucOeryf8lU");
    let dataToImport = $nodeTextarea.value;
    let regex = /^[\{|\[\s+\}]/;

    if (dataToImport === "") {
      return alert("Datas not found");
    }
    if (!regex.test(dataToImport)) throw alert("El valor ingresado no es un objeto JSON válido");

    dataToImport = JSON.parse(dataToImport);

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
    <section className={css.SavePage}>
      <HeaderSection pTitle="Manage" pText="Export and import your bookmark sections" />
      <div className={css.SavePage_frame}>
        <nav className={css.Textarea}>
          <div className={css.Textarea_toolbar}>
            <ButtonBase pText="Export" pIcon="download" pHandleClick={clickButtonExport} />
            <ButtonBase pText="Download as JSON" pIcon="download" pHandleClick={() => clickButtonExport(true)} />
            <ButtonBase pText="Import" pIcon="upload" pHandleClick={clickButtonImport} />
          </div>
          <ButtonBase pText="Delete saved" pIcon="delete" pHandleClick={deleteDataInLocalStorage} />
        </nav>
        <textarea
          className={css.Textarea_input}
          id="textarea_xucOeryf8lUy8FNIqA1eL"
          placeholder="Write a valid bookmark collection..."
        ></textarea>
      </div>
    </section>
  );
};
