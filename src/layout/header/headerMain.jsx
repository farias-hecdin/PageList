import css from "./headerMain.module.css";
import { ButtonBase, WrapBase } from "../../components/index.jsx";
import { DataContext, StateContext } from "../../context/index.jsx";
import { useContext } from "react";

/**
 * @param {object} prop
 * @param {Function} prop.updatePage
 * @param {string} prop.pageName
 * @param {string} prop.changeTheme
 * @returns {HTMLElement}
 */
export const HeaderMain = ({ updatePage, pageName, changeTheme }) => {
  const { setDataBookmarks, setDataCollections, setDataLists, setDataTopics, setSelectedItem } =
    useContext(DataContext);
  const { setShowPopup } = useContext(StateContext);

  /**
   * Mostrar la pagina selecionada
   * @param {string} pSelectedPage - Nombre de la pagina
   */
  const showActivePage = (pSelectedPage) => {
    updatePage(pSelectedPage);
  };

  const checkLatestSection = () => {
    let answer = confirm("Are you sure?");

    if (answer) {
      const storage = [
        { data: localStorage.getItem("pagelist_collections"), set: setDataCollections },
        { data: localStorage.getItem("pagelist_topics"), set: setDataTopics },
        { data: localStorage.getItem("pagelist_lists"), set: setDataLists },
        { data: localStorage.getItem("pagelist_bookmarks"), set: setDataBookmarks },
      ];
      let message = null;

      for (let i = 0; i < storage.length; i++) {
        let data = storage[i].data;
        if (typeof data === "string") {
          message = "Load section";
          // Actualizar datos
          data = JSON.parse(data);
          storage[i].set(data);
        } else {
          message = "No data";
        }
      }

      setSelectedItem((prev) => ({ ...prev, collectionId: "0" }));
      setShowPopup((prev) => ({ ...prev, show: true, message: message }));
    }
  };

  return (
    <header className={css.Container}>
      <div className={css.Logo}>
        <iconify-icon icon="tabler:bookmarks"></iconify-icon>
        <span className={css.Logo_title}>Pagelist</span>
      </div>
      <label className={css.Search} for="search">
        <input className={css.Search_input} name="search" type="text" placeholder="Search bookmarks..." />
      </label>
      <nav className={css.Navbar}>
        <WrapBase>
          <ButtonBase
            styled={`HeaderMain_UlICn ${pageName === "Home" ? "is-active" : "is-ghost"}`}
            icon={<IconifyBookmarkOutline />}
            text="Bookmarks"
            handleClick={() => showActivePage("Home")}
          />
          <ButtonBase
            styled={`HeaderMain_UlICn ${pageName === "Backup" ? "is-active" : "is-ghost"}`}
            icon={<IconifySaveOutline />}
            text="Backup"
            handleClick={() => showActivePage("Backup")}
          />
        </WrapBase>
        <div className={css.Navbar_box}>
          <ButtonBase text="Load" icon={<IconifyUpdate />} handleClick={checkLatestSection} styled="is-outline" />
          <ButtonBase text="Config" icon={<IconifySettingsOutline />} handleClick={changeTheme} styled="is-outline" />
        </div>
      </nav>
    </header>
  );
};
