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
  const { $dataBookmarks, $dataCollections, $dataLists, $dataTopics } = useContext(DataContext);
  const { $showPopup, $selectedItem } = useContext(StateContext);

  /**
   * Mostrar la pagina selecionada
   * @param {string} selectedPage - Nombre de la pagina
   */
  const showActivePage = (selectedPage) => {
    updatePage(selectedPage);
  };

  /** Carga la ultima seccion */
  const checkLatestSection = () => {
    let answer = confirm("Are you sure?");

    if (!answer) return;

    const storage = [
      { data: localStorage.getItem("pagelist_collections"), set: $dataCollections },
      { data: localStorage.getItem("pagelist_topics"), set: $dataTopics },
      { data: localStorage.getItem("pagelist_lists"), set: $dataLists },
      { data: localStorage.getItem("pagelist_bookmarks"), set: $dataBookmarks },
    ];
    let message = "";

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
    $selectedItem((prev) => ({ ...prev, collectionId: "0" }));
    $showPopup((prev) => ({ ...prev, show: true, message: message }));
  };

  return (
    <header className={css.Container}>
      <div className={css.Logo}>
        <iconify-icon icon="tabler:bookmarks"></iconify-icon>
        <span className={css.Logo_title}>Pagelist</span>
      </div>
      <label className={css.Search} htmlFor="search">
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
          {/* <ButtonBase */}
          {/*   styled={`HeaderMain_UlICn ${pageName === "More" ? "is-active" : "is-ghost"}`} */}
          {/*   icon={<IconifyAccountTreeOutline />} */}
          {/*   text="More" */}
          {/*   handleClick={() => showActivePage("More")} */}
          {/* /> */}
        </WrapBase>
        <div className={css.Navbar_box}>
          <ButtonBase text="Load" icon={<IconifyUpdate />} handleClick={checkLatestSection} styled="is-outline" />
          <ButtonBase text="Theme" icon={<IconifySettingsOutline />} handleClick={changeTheme} styled="is-outline" />
        </div>
      </nav>
    </header>
  );
};
