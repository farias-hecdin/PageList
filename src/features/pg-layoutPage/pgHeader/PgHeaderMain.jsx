import css from "./PgHeaderMain.module.css";
import { DataContext, StateContext } from "$src/context/index";
import { useContext } from "react";
import * as C from "$src/components";

/**
 * @param {object} prop
 * @param {Function} prop.updatePage
 * @param {string} prop.pageName
 * @param {string} prop.changeTheme
 * @returns {HTMLElement}
 */
export const PgHeaderMain = ({ updatePage, pageName }) => {
  const { $dataBookmark, dataBookmark, $dataCollection, $dataTopic, $dataFolder } = useContext(DataContext);
  const { $showPopup, $selectedItem } = useContext(StateContext);

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
    const answer = confirm("Are you sure?");

    if (answer) {
      let storage = [
        { data: localStorage.getItem("pagelist_collections"), funcSet: $dataCollection },
        { data: localStorage.getItem("pagelist_topics"), funcSet: $dataFolder },
        { data: localStorage.getItem("pagelist_lists"), funcSet: $dataTopic },
        { data: localStorage.getItem("pagelist_bookmarks"), funcSet: $dataBookmark },
      ];
      let message = "";

      for (elem in storage) {
        if (typeof elem.data === "string") {
          message = "Load section";
          elem.funSet(JSON.parse(elem.data));
        } else {
          message = "No data";
        }
      }
      $selectedItem((prev) => ({
        ...prev,
        collection: { id: "", name: "" },
      }));
      $showPopup((prev) => ({ ...prev, show: true, message: message }));
    }
  };

  return (
    <header className={css.Container}>
      <C.LogoBrand />
      <C.SearchItems placeholder="Search a bookmark" data={dataBookmark} />
      <nav className={css.Navbar}>
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
          {/* <C.ButtonBase */}
          {/*   styled={`Button_kwjHWwBMUn ${pageName === "Tools" ? "is-active" : "is-ghost"}`} */}
          {/*   icon={<IconifySettingsOutline />} */}
          {/*   text="Tools" */}
          {/*   handleClick={() => showActivePage("Tools")} */}
          {/* /> */}
        </C.WrapBase>
        <div className={css.Navbar_box}>
          <C.ButtonBase text="Load" icon={<IconifyUpdate />} handleClick={checkLatestSection} styled="is-outline" />
        </div>
      </nav>
    </header>
  );
};
