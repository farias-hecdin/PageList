import css from "./headerMain.module.css";
import { ButtonBase, WrapBase } from "../../components/index.jsx";
import { useContext, useEffect } from "react";
import { DataContext, StateContext } from "../../context/index.jsx";

/**
 * @param {object} prop
 * @param {Function} prop.updatePage
 * @param {string} prop.pageName
 * @returns {HTMLElement}
 */
export const HeaderMain = ({ updatePage, pageName, changeTheme }) => {
  const { $dataBookmarks, $dataCollections, $dataLists, $dataTopics, $selectedItem } = useContext(DataContext);
  const { $showPopup } = useContext(StateContext);

  /**
   * Mostrar la pagina selecionada
   * @param {string} pSelectedPage - Nombre de la pagina
   */
  const showActivePage = (pSelectedPage) => {
    updatePage(pSelectedPage);
  };

  /** Cargar la ultima seccion al cargar el componente */
  useEffect(() => {
    setTimeout(() => {
      checkLatestSection()
    }, 1 * 1000)
  }, [])

  /** Resturar la ultima seccion */
  const checkLatestSection = () => {
    let message = "";
    let storage = [
      { data: localStorage.getItem("pagelist_collections"), set: $dataCollections },
      { data: localStorage.getItem("pagelist_topics"), set: $dataTopics },
      { data: localStorage.getItem("pagelist_lists"), set: $dataLists },
      { data: localStorage.getItem("pagelist_bookmarks"), set: $dataBookmarks },
    ];
    for (let i = 0; i < storage.length; i++) {
      let data = storage[i].data;
      if (typeof data === "string") {
        data = JSON.parse(data);
        // Actualizar datos
        storage[i].set(data);
        message = "Update";
      } else {
        message = "No data";
      }
    }

    $selectedItem((prev) => ({ ...prev, collectionId: "0" }));
    $showPopup((prev) => ({ ...prev, show: true, message: "Load section" }));
  };

  return (
    <header className={css.Container}>
      <div className={css.Logo}>
        <iconify-icon icon="tabler:bookmarks"></iconify-icon>
        <span className={css.Logo_title}>Pagelist</span>
      </div>
      <nav className={css.Navbar}>
        <WrapBase>
          <ButtonBase
            styled={`HeaderMain_UlICn ${pageName === "Home" ? "--active" : "--ghost"}`}
            icon={<IconifyBookmarksOutline />}
            text="Bookmarks"
            handleClick={() => showActivePage("Home")}
          />
          <ButtonBase
            styled={`HeaderMain_UlICn ${pageName === "Backup" ? "--active" : "--ghost"}`}
            icon={<IconifyHardDriveOutline />}
            text="Backup"
            handleClick={() => showActivePage("Backup")}
          />
        </WrapBase>
        <div className={css.Navbar_box}>
          <ButtonBase text="Restore session" icon={<IconifyUpdate />} handleClick={checkLatestSection} styled="--outline" />
        </div>
      </nav>
    </header>
  );
};
