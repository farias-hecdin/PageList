import css from "./headerMain.module.css";
import website_logo from "../../assets/brand/fake-logo.svg";
import { ButtonBase, WrapBase } from "../../components/index.jsx";
import { useContext } from "react";
import { useState } from "react";
import { DataContext } from "../../context/data/dataProvider";

/**
 * @param {object} prop
 * @param {Function} prop.updatePage
 * @param {string} prop.pageName
 * @returns {HTMLElement}
 */
export const HeaderMain = ({ updatePage, pageName }) => {
  /**
   * Mostar la pagina selecionada
   * @param {string} pSelectedPage ¿Nombre de la pagina?
   */
  const showActivePage = (pSelectedPage) => {
    updatePage(pSelectedPage);
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
            styled={`HeaderMain_UlICn ${pageName === "Home" && "--active"}`}
            icon="bookmarks-outline"
            text="Bookmarks"
            handleClick={() => showActivePage("Home")}
          />
          <ButtonBase
            styled={`HeaderMain_UlICn ${pageName === "Backup" && "--active"}`}
            icon="hard-drive-outline"
            text="Backup"
            handleClick={() => showActivePage("Backup")}
          />
        </WrapBase>
        <div className={css.Navbar_box}>
          <ButtonBase text="Save" icon="save-outline" />
          <ButtonBase text="Load" icon="update" handleClick={funcCheckLatestSection} />
          <ButtonBase text="Config" icon="settings-outline" />
        </div>
      </nav>
    </header>
  );
};
