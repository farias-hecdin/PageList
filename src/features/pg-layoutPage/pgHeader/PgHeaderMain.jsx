import css from "./PgHeaderMain.module.css";
import * as C from "$src/components";
import { DataContext, StateContext } from "$src/context/index";
import { useContext, useEffect } from "react";

/**
 * @param {object} prop
 * @param {Function} prop.updatePage
 * @param {string} prop.pageName
 * @returns {HTMLElement}
 */
export const PgHeaderMain = ({ updatePage, pageName }) => {
  const { $dataBookmark, $dataCollection, $dataTopic, $dataFolder } = useContext(DataContext);
  const { $showPopup } = useContext(StateContext);

  /**
   * Mostrar la pagina selecionada
   * @param {string} selectedPage - Nombre de la pagina
   */
  const showActivePage = (selectedPage) => {
    updatePage(selectedPage);
  };

  /**
   * Carga la ultima seccion
   */
  const checkLatestSection = () => {
    let data = [
      { key: "pagelist_collections", func: $dataCollection },
      { key: "pagelist_topics", func: $dataFolder },
      { key: "pagelist_lists", func: $dataTopic },
      { key: "pagelist_bookmarks", func: $dataBookmark },
    ];
    // Iterando el arreglo data
    for (let elem in data) {
      const storageValue = localStorage.getItem(elem.key);
      if (!storageValue) return false;
      elem.func(JSON.parse(storageValue));
    }
    return true;
  };

  useEffect(() => {
    const value = checkLatestSection();
    if (value) {
      alert("Datos cargados");
    }
  }, []);

  return (
    <header className={css.Container}>
      <C.LogoBrand />
      <nav>
        <div className={css.Sections}>
          <C.WrapBase>
            <C.ButtonBase
              styled={`Button_kwjHWwBMUn ${pageName === "Home" ? "is-active" : "is-ghost"}`}
              icon={<IconifyBookmarkOutline />}
              text="Bookmarks"
              handleClick={() => showActivePage("Home")}
            />
            <C.ButtonBase
              styled={`Button_kwjHWwBMUn ${pageName === "Backup" ? "is-active" : "is-ghost"}`}
              icon={<IconifySaveOutline />}
              text="Backup"
              handleClick={() => showActivePage("Backup")}
            />
          </C.WrapBase>
        </div>
        <div className={css.Toolbar}>
          <C.ButtonBase text="Search" icon={<IconifySearch />} styled="is-outline" />
          <C.ButtonBase
            text="Load"
            icon={<IconifySettingsOutline />}
            handleClick={() => {
              const answer = confirm("Are you sure?");
              if (answer) {
                checkLatestSection();
                $showPopup((prev) => ({ ...prev, show: true, message: "Listo!" }));
              }
            }}
            styled="is-outline"
          />
        </div>
      </nav>
    </header>
  );
};
