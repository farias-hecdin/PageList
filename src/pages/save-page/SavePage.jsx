import { useContext, useState } from "react";
import { ButtonBase } from "../../components/Index";
import { BookmarksContext } from "../../context/bookmarks/bookmarksProvider";
import css from "./SavePage.module.css";

export const SavePage = () => {
  const { setBookmarksList, BookmarksList, setSelectedCollection, selectedCollection } = useContext(BookmarksContext);

  // Importar datos -----------------------------------------------------------
  const funcImportBookmarksData = () => {
    let $fieldText = document.getElementById("textarea_dPGOLAD_13JMFLvIAC5FN");
    let importData = BookmarksList;

    if (importData !== String) {
      importData = JSON.stringify(BookmarksList);
    }
    $fieldText.value = importData;
  };

  // Exportar datos y validar propiedades -------------------------------------
  const [showNotification, setShowNotification] = useState();
  const [showJsonError, setShowJsonError] = useState("");

  const funcExportBookmarksData = () => {
    let $fieldText = document.getElementById("textarea_dPGOLAD_13JMFLvIAC5FN");
    let exportData = $fieldText.value;

    // Validacion
    if (exportData === "") {
      setShowNotification(() => "error");
      setShowJsonError(() => "field empty");
    } else {
      let checkObject = JSON.parse(exportData);
      let exportObject = checkObject;

      if (checkObject.collections === undefined) {
        setShowNotification(() => "error");
        setShowJsonError(() => "collections not found");
      } else {
        checkObject = checkObject.collections;
        for (let i = 0; i < checkObject.length; i++) {
          if (checkObject[i].topics === undefined) {
            setShowNotification(() => "error");
            setShowJsonError(() => "topics not found");
            for (let i = 0; i < checkObject.length; i++) {}
          } else {
            setShowNotification(() => "ok");
            setShowJsonError(() => "all is right");
            // Guardar los datos nuevos
            // funcIntegreDataToApp(exportObject)
            funcSaveDataInLocalStorage(exportData);
          }
        }
      }
    }
  };
  const funcSaveDataInLocalStorage = (data) => {
    localStorage.setItem("pagelist__latestSection", data);
  };

  const funcIntegreDataToApp = (data) => {
    const newData = data;
    setSelectedCollection(null);
    setBookmarksList(newData);
  };
  const funcDeleteSection = () => {
    localStorage.setItem("pagelist__latestSection", "");
  };

  return (
    <section className={css.SavePage}>
      <header className={css.SavePage_header}>
        <h2>Export / import</h2>
      </header>
      <div className={css.SavePage_frame}>
        <div className={css.Textarea_footer}>
          <ButtonBase pText="Export" pIcon="download" pHandleClick={() => funcImportBookmarksData()} />
          <ButtonBase pText="Import" pIcon="upload" pHandleClick={() => funcExportBookmarksData()} />
          <ButtonBase pText="Delete section" pIcon="delete" pHandleClick={() => funcDeleteSection()} />
        </div>
        {showNotification === "error" ? (
          <AnNotification pText={`ERROR - ${showJsonError}`} />
        ) : showNotification === "ok" ? (
          <AnNotification pText={`Message - ${showJsonError}`} />
        ) : null}
        <textarea className={css.Textarea} id="textarea_dPGOLAD_13JMFLvIAC5FN"></textarea>
      </div>
    </section>
  );
};

export const AnNotification = ({ pText }) => {
  return <p className={css.AnNotification}>{pText}</p>;
};
