import css from "./HeaderMain.module.css";
import website_logo from "../../assets/brand/fake-logo.svg";
import { BookmarksContext } from "../../context/Index";
import { ButtonBase, WrapBase } from "../../components/Index.jsx";
import { useContext } from "react";
import { useState } from "react";

/**
 * @param {Object} prop
 * @param {function} prop.pChangePage
 * @param {string} prop.pPageName
 */
export const HeaderMain = ({ pChangePage, pPageName }) => {
  /** Mostar la pagina selecionada
   * @param {string} _selectedPage
   */
  const showActivePage = (_selectedPage) => {
    pChangePage(_selectedPage);
  };

  // Revisar la ultima seccion ------------------------------------------------
  const { savedBookmarks } = useContext(BookmarksContext);
  const [indicatorLoadSection, setIndicatorLoadSection] = useState(false);

  const funcCheckLatestSection = () => {
    let latestSectionData = localStorage.getItem("pagelist__latestSection");
    // Validar el tipo de dato
    if (typeof latestSectionData === "string") {
      latestSectionData = JSON.parse(latestSectionData);
      savedBookmarks.set(latestSectionData);
    }
    // Imprimir un mensaje
    setIndicatorLoadSection(true);
  };

  return (
    <header className={css.HeaderMain}>
      <div className={css.Logo}>
        <img className={css.Logo_image} src={website_logo} alt="pagelist" />
        <span className={css.Logo_title}>Pagelist</span>
      </div>
      <nav className={css.Navbar}>
        <WrapBase>
          <ButtonBase
            pStyled={`HeaderMain_UlICn ${pPageName === "home" ? "--active" : ""}`}
            pIcon="bookmarks-outline"
            pText="Bookmarks"
            pHandleClick={() => showActivePage("home")}
          />
          <ButtonBase
            pStyled={`HeaderMain_UlICn ${pPageName === "manage" ? "--active" : ""}`}
            pIcon="folder-outline"
            pText="Manage"
            pHandleClick={() => showActivePage("manage")}
          />
        </WrapBase>
        <div className={css.Navbar_box}>
          <ButtonBase pText="Save" pIcon="save-outline" />
          <ButtonBase pText="Load" pIcon="update" pHandleClick={funcCheckLatestSection} />
          <ButtonBase pText="Config app" pIcon="settings-outline" />
        </div>
      </nav>
    </header>
  );
};
