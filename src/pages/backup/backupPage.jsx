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

  /** Limpiar el contenido de un HTML textarea */
  const cleanTextarea = () => {
    let $node = document.querySelector("#textarea_xucOeryf8lU");
    $node.value = "";
  };

  /**
   * Funcion que exporta datos fuera de la aplicación
   * @param {boolean} isDowloader - Indica si se debe descargar o no el archivo
   */
  const clickButtonExport = (isDowloader) => {
    try {
      let $node = document.querySelector("#textarea_xucOeryf8lU");
      let mapData = mapNewDataArray(dataCollections, dataTopics, dataLists, dataBookmarks);
      let currentDate = getCurrentDate();
      let fileName = `Pagelist_${currentDate}`;
      let dataInString = JSON.stringify(mapData, null, 2);

      $node.value = dataInString;
      if (isDowloader === true) {
        makeHtmlNodeAndFile(fileName, dataInString);
      }
    } catch (error) {
      console.warn("BackupPage > clickButtonExport", error.stack);
    }
  };

  /** Funcion que importa datos adentro de la app */
  const clickButtonImport = () => {
    try {
      const newBookmarksList = importDataAndValidate("#textarea_xucOeryf8lU");
      const data = breakDownData(newBookmarksList);

      // Guardar en localStorage
      saveDataInLocalStorage(data);
      // Actualizar datos
      setDataCollections(data.collections);
      setDataTopics(data.topics);
      setDataLists(data.lists);
      setDataBookmarks(data.bookmarks);
      // Reiniciar las referencias de `collection`
      setSelectedItem((prevState) => ({
        ...prevState,
        collectionId: "0",
        collectionName: "None",
      }));
    } catch (error) {
      console.warn("BackupPage > clickButtonImport", error.stack);
    }
  };

  /** Remover los datos guardados en localStorage */
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
            <ButtonBase text="Export" icon={<IconifyDownload />} handleClick={() => clickButtonExport(false)} />
            <ButtonBase text="Download as JSON" icon={<IconifyDownload />} handleClick={() => clickButtonExport(true)} />
            <ButtonBase text="Import" icon={<IconifyUpload />} handleClick={clickButtonImport} />
          </div>
          <ButtonBase text="Delete saved" icon={<IconifyDelete />} handleClick={deleteDataInLocalStorage} />
        </nav>
        <textarea
          className={css.Container_textarea}
          id="textarea_xucOeryf8lU"
          placeholder="Write a valid bookmark collection..."
        ></textarea>
        <div>
          <ButtonBase text="Clean" icon={<IconifyCleaningServicesOutline />} handleClick={cleanTextarea} />
        </div>
      </div>
    </section>
  );
};
