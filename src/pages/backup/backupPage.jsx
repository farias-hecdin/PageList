import css from "./backupPage.module.css";
import { ButtonBase } from "../../components/index";
import { DataContext } from "../../context/index";
import { HeaderSecondary } from "../../layout/index";
import { useContext } from "react";
import {
  decomposeDataIntoCategories,
  getFormattedCurrentDate,
  importDataAndValidate,
  createHtmlNodeAndFile,
  assignDataToCollections,
  manageLocalStorageData,
  getJsonFileContent,
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
      let mappedData = assignDataToCollections(dataCollections, dataTopics, dataLists, dataBookmarks);
      let currentDate = getFormattedCurrentDate();
      let fileName = `Pagelist_${currentDate}`;
      let dataInString = JSON.stringify(mappedData, null, 2);
      $node.value = dataInString;

      if (isDowloader === true) {
        createHtmlNodeAndFile(fileName, dataInString);
      }
    } catch (error) {
      console.warn("BackupPage > clickButtonExport", error.stack);
    }
  };

  /** Funcion que importa datos adentro de la app */
  const uploadFile = async (event) => {
    const $node = document.querySelector("#textarea_xucOeryf8lU");
    const data = await getJsonFileContent(event);
    $node.value = data;
  };

  const clickButtonImport = () => {
    try {
      const $node = document.querySelector("#textarea_xucOeryf8lU");
      let data = $node.value;

      data = importDataAndValidate(data);
      data = decomposeDataIntoCategories(data);
      // Guardar datos en localStorage
      let question = confirm("Do you want to save this section?");
      if (question === true) {
        manageLocalStorageData("add", [data.collections, data.topics, data.lists, data.bookmarks]);
      }
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
  const removeDataFromLocalStorage = () => {
    const question = confirm("Do you want to delete the saved section?");
    if (question === true) manageLocalStorageData("delete");
  };

  return (
    <section className={css.Container}>
      <HeaderSecondary title="Backup" text="Export and import your bookmark sections" />
      <div className={css.Container_box}>
        <nav className={css.Toolbar}>
          <div className={css.Toolbar_box}>
            <ButtonBase text="Export" icon={<IconifyDownload />} handleClick={() => clickButtonExport(true)} />
            <ButtonBase text="Import" styled="--outline" icon={<IconifyUpload />} handleClick={clickButtonImport} />
            <label htmlFor="ula5" className={css.Toolbar_uploadInput}>
              <span>Upload</span>
              <input id="ula5" type="file" onChange={uploadFile} />
            </label>
          </div>
          <ButtonBase
            text="Delete saved"
            icon={<IconifyDelete />}
            styled="--outline"
            handleClick={removeDataFromLocalStorage}
          />
        </nav>
        <textarea
          className={css.Container_textarea}
          id="textarea_xucOeryf8lU"
          placeholder="Write a valid bookmark collection..."
        ></textarea>
        <footer>
          <ButtonBase
            text="Clean"
            styled="--outline"
            icon={<IconifyCleaningServicesOutline />}
            handleClick={cleanTextarea}
          />
        </footer>
      </div>
    </section>
  );
};
