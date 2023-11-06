import css from "./headerMain.module.css";
import website_logo from "../../assets/brand/fake-logo.svg";
import { ButtonBase, WrapBase } from "../../components/index.jsx";
import { useContext } from "react";
import { useState } from "react";
import { DataContext } from "../../context/data/dataProvider";

/**
 * @param {object} prop
 * @param {Function} prop.pChangePage
 * @param {string} prop.pPageName
 * @returns {HTMLElement}
 */
export const HeaderMain = ({ pChangePage, pPageName }) => {
  /**
   * Mostar la pagina selecionada
   * @param {string} _selectedPage ¿Nombre de la pagina?
   */
  const showActivePage = (_selectedPage) => {
    pChangePage(_selectedPage);
  };

  // Revisar la ultima seccion ------------------------------------------------
  const { setSavedCollection } = useContext(DataContext);
  const [setIndicatorLoadSection] = useState(false);

  const funcCheckLatestSection = () => {
    let latestSectionData = localStorage.getItem("pagelist__latestSection");
    // Validar el tipo de dato
    if (typeof latestSectionData === "string") {
      latestSectionData = JSON.parse(latestSectionData);
      setSavedCollection(latestSectionData);
    }
    // Imprimir un mensaje
    setIndicatorLoadSection(true);
  };

  return (
    <header className={css.Container}>
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
          <ButtonBase pText="Config" pIcon="settings-outline" />
        </div>
      </nav>
    </header>
  );
};
