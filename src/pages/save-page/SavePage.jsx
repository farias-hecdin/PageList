import { useContext } from "react";
import { ButtonBase } from "../../components/Index";
import { BookmarksContext } from "../../context/bookmarks/bookmarksProvider";
import css from "./SavePage.module.css";

export const SavePage = () => {
  const { savedBookmarks, selectedCollection, bookmarksList } = useContext(BookmarksContext);

  // Exportar datos al exterior -----------------------------------------------
  const funcExportBookmarksData = () => {
    let $imputText = document.getElementById("textarea_dPGOL");
    let dataToExport = savedBookmarks.state;

    if (typeof dataToExport !== "string") {
      dataToExport = JSON.stringify(dataToExport);
    }
    $imputText.value = dataToExport;
  };

  // Importar datos y validar propiedades -------------------------------------
  const funcImportBookmarksData = () => {
    let $imputText = document.getElementById("textarea_dPGOL");
    let dataToImport = $imputText.value;
    const regex = /^[\{|\[\s+\}]/;

    if (dataToImport === "") {
      return alert("Datas not found");
    }
    if (!regex.test(dataToImport)) {
      throw alert("El valor ingresado no es un objeto JSON válido");
    }
    dataToImport = JSON.parse(dataToImport);

    // Validar datos
    if (dataToImport.collections === undefined) {
      return alert("Collections not found");
    }
    let dataArray = dataToImport.collections;

    for (let collections of dataArray) {
      if (collections.topics === undefined) {
        return alert("Topics not found");
      }
      dataArray = collections.topics;

      for (let topics of dataArray) {
        if (topics.lists === undefined) {
          return alert("Lists not found");
        }
        dataArray = topics.lists;

        for (let lists of dataArray) {
          if (lists.links === undefined) {
            return alert("Links not found");
          }
        }
      }
    }
    return dataToImport;
  };

  // Guardar datos en LocalStorage
  const funcSaveDataInLocalStorage = (dataToLocalStorage) => {
    let question = confirm("Do you want to save this section?");
    if (question === true) {
      localStorage.setItem("pagelist__latestSection", JSON.stringify(dataToLocalStorage));
    }
  };

  const funcIntegreDataToApp = () => {
    let newBookmarksList = funcImportBookmarksData();
    let resetSelectedCollection = "";

    if (typeof newBookmarksList === "object") {
      funcSaveDataInLocalStorage(newBookmarksList);
      savedBookmarks.set(newBookmarksList);
      selectedCollection.set(resetSelectedCollection);
    }
  };

  // Limpiar la seccion almacenada --------------------------------------------
  const funcDeleteDataInLocalStorage = () => {
    let question = confirm("Do you want to delete the saved section?");
    if (question === true) {
      localStorage.setItem("pagelist__latestSection", "");
      savedBookmarks.set(bookmarksList);
    }
  };

  return (
    <section className={css.SavePage}>
      <header className={css.SavePage_header}>
        <h2>Export / import</h2>
      </header>
      <div className={css.SavePage_frame}>
        <div className={css.Textarea_footer}>
          <ButtonBase pText="Export" pIcon="download" pHandleClick={funcExportBookmarksData} />
          <ButtonBase pText="Import" pIcon="upload" pHandleClick={funcIntegreDataToApp} />
          <ButtonBase pText="Delete section" pIcon="delete" pHandleClick={funcDeleteDataInLocalStorage} />
        </div>
        <textarea className={css.Textarea} id="textarea_dPGOL"></textarea>
      </div>
    </section>
  );
};
