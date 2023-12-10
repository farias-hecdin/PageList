import css from "./headerMain.module.css";
import { ButtonBase, WrapBase } from "../../components/index.jsx";
import { useContext } from "react";
import { DataContext, StateContext } from "../../context/index.jsx";

/**
 * @param {object} prop
 * @param {Function} prop.updatePage
 * @param {string} prop.pageName
 * @returns {HTMLElement}
 */
export const HeaderMain = ({ updatePage, pageName, changeTheme }) => {
  const { setDataBookmarks, setDataCollections, setDataLists, setDataTopics, setSelectedItem } =
    useContext(DataContext);
  const {setShowPopup} = useContext(StateContext)

  /**
   * Mostrar la pagina selecionada
   * @param {string} pSelectedPage - Nombre de la pagina
   */
  const showActivePage = (pSelectedPage) => {
    updatePage(pSelectedPage);
  };

  const checkLatestSection = () => {
    let message = "";
    let storage = [
      { data: localStorage.getItem("pagelist_collections"), set: setDataCollections },
      { data: localStorage.getItem("pagelist_topics"), set: setDataTopics },
      { data: localStorage.getItem("pagelist_lists"), set: setDataLists },
      { data: localStorage.getItem("pagelist_bookmarks"), set: setDataBookmarks },
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

    setSelectedItem((prev) => ({...prev, collectionId: "0",}));
    setShowPopup((prev) => ({ ...prev, show: true, message: "Load section" }));
  };

  return (
    <header className={css.Container}>
      <div className={css.Logo}>
        <iconify-icon icon="tabler:bookmarks"></iconify-icon>
        <span className={css.Logo_title}>Pagelist</span>
      </div>
      <nav className={css.Navbar}>
        {/* { notif == true ? ( */}
        {/*   <p className={css.Navbar_message}> */}
        {/*     <IconifyWarningOutline" /> */}
        {/*   </p>) : "" */}
        {/* } */}
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
          <ButtonBase text="Load" icon={<IconifyUpdate />} handleClick={checkLatestSection} styled="--outline" />
          <ButtonBase text="Config" icon={<IconifySettingsOutline />} handleClick={changeTheme} styled="--outline" />
        </div>
      </nav>
    </header>
  );
};
