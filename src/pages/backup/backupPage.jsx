// @ts-check
import css from "./backupPage.module.css";
import { ButtonBase } from "../../components/index";
import { DataContext } from "../../context/index";
import { HeaderSecondary } from "../../layout/index";
import { useContext } from "react";
import {
  breakDownData,
  getCurrentDate,
  importDataAndValidate,
  makeHtmlNodeAndFile,
  mapNewDataArray,
  saveDataInLocalStorage,
} from "./backupPage.script";

export const BackupPage = () => {
  const {
    dataCollections,
    setDataCollections,
    dataTopics,
    setDataTopics,
    dataLists,
    setDataLists,
    dataBookmarks,
    setDataBookmarks,
    setSelectedItem,
  } = useContext(DataContext);

  /** Limpiar el contenido de un textarea */
  const cleanTextarea = () => {
    let $nodeTextarea = document.getElementById("textarea_xucOeryf8lU");
    $nodeTextarea.value = "";
  };

  /**
   * Exportar datos fuera de la aplicación
   * @param {boolean} isDowloader ¿El contenido es descargable?
   */
  const clickButtonExport = (isDowloader) => {
    try {
      let $nodeTextarea = document.getElementById("textarea_xucOeryf8lU");
      let mapDataFromBookmarks = mapNewDataArray(dataCollections, dataTopics, dataLists, dataBookmarks);
      let currentDate = getCurrentDate();
      let fileName = `Pagelist_${currentDate}`;
      let dataInString = JSON.stringify(mapDataFromBookmarks, null, 2);

      $nodeTextarea.value = dataInString;
      if (isDowloader === true) {
        makeHtmlNodeAndFile(fileName, dataInString);
      }
    } catch (error) {
      console.warn("SavePage > clickButtonExport", error.stack);
    }
  };

  /** Importar datos adentro de la app */
  const clickButtonImport = () => {
    try {
      const newBookmarksList = importDataAndValidate("textarea_xucOeryf8lU");
      const datas = breakDownData(newBookmarksList);

      // Guardar en localStorage
      saveDataInLocalStorage(datas);

      // Actualizar datos
      setDataCollections(datas.collections);
      setDataTopics(datas.topics);
      setDataLists(datas.lists);
      setDataBookmarks(datas.bookmarks);

      // Reiniciar las referencias de `collection`
      setSelectedItem((prevState) => ({
        ...prevState,
        collectionId: "0",
        collectionName: "None",
      }));
    } catch (error) {
      console.warn("SavePage > clickButtonImport", error.stack);
    }
  };

  /** Limpiar la seccion guardada en localStorage */
  const deleteDataInLocalStorage = () => {
    const question = confirm("Do you want to delete the saved section?");
    if (question === true) {
      localStorage.setItem("pagelist__latestSection", "");
    }
  };

  return (
    <section className={css.Container}>
      <HeaderSecondary title="Backup" text="Export and import your bookmark sections" />
      <div className={css.Container_box}>
        <nav className={css.Toolbar}>
          <div className={css.Toolbar_box}>
            <ButtonBase text="Export" icon="download" handleClick={() => clickButtonExport(false)} />
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
