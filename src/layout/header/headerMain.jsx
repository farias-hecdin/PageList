import css from "./headerMain.module.css";
import website_logo from "../../assets/brand/fake-logo.svg";
import { ButtonBase, Icon, WrapBase } from "../../components/index.jsx";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { DataContext } from "../../context/data/dataProvider";

/**
 * @param {object} prop
 * @param {Function} prop.updatePage
 * @param {string} prop.pageName
 * @returns {HTMLElement}
 */
export const HeaderMain = ({ updatePage, pageName }) => {
  const { setDataBookmarks, setDataCollections, setDataLists, setDataTopics } = useContext(DataContext);

  /**
   * Mostar la pagina selecionada
   * @param {string} pSelectedPage ¿Nombre de la pagina?
   */
  const showActivePage = (pSelectedPage) => {
    updatePage(pSelectedPage);
  };

  const checkLatestSection = () => {
    let datas = localStorage.getItem("pagelist__latestSection");

    datas = JSON.parse(datas);
    // Actualizar datos
    setDataCollections(datas.collections);
    setDataTopics(datas.topics);
    setDataLists(datas.lists);
    setDataBookmarks(datas.bookmarks);
  };

  /** !feat: Notificar que se han producidos cambios en los datos */

  return (
    <header className={css.Container}>
      <div className={css.Logo}>
        <img className={css.Logo_image} src={website_logo} alt="pagelist" />
        <span className={css.Logo_title}>Pagelist</span>
      </div>
      <nav className={css.Navbar}>
        {/* { notif == true ? ( */}
        {/*   <p className={css.Navbar_message}> */}
        {/*     <Icon icon="warning-outline" /> */}
        {/*   </p>) : "" */}
        {/* } */}
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
          <ButtonBase text="Load" icon="update" handleClick={checkLatestSection} />
          <ButtonBase text="Config" icon="settings-outline" />
        </div>
      </nav>
    </header>
  );
};
