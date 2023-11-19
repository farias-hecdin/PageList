import css from "./headerMain.module.css";
import website_logo from "../../assets/brand/fake-logo.svg";
import { ButtonBase, WrapBase } from "../../components/index.jsx";
import { useContext } from "react";
import { DataContext } from "../../context/data/dataProvider";
import { onClickMissing } from "../../utils/common";

/**
 * @param {object} prop
 * @param {Function} prop.updatePage
 * @param {string} prop.pageName
 * @returns {HTMLElement}
 */
export const HeaderMain = ({ updatePage, pageName }) => {
  const { setDataBookmarks, setDataCollections, setDataLists, setDataTopics } = useContext(DataContext);

  /**
   * Mostrar la pagina selecionada
   * @param {string} pSelectedPage - Nombre de la pagina
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
        {/*     <IconifyWarningOutline" /> */}
        {/*   </p>) : "" */}
        {/* } */}
        <WrapBase>
          <ButtonBase
            styled={`HeaderMain_UlICn ${pageName === "Home" && "--active"}`}
            icon={<IconifyBookmarksOutline />}
            text="Bookmarks"
            handleClick={() => showActivePage("Home")}
          />
          <ButtonBase
            styled={`HeaderMain_UlICn ${pageName === "Backup" && "--active"}`}
            icon={<IconifyHardDriveOutline />}
            text="Backup"
            handleClick={() => showActivePage("Backup")}
          />
        </WrapBase>
        <div className={css.Navbar_box}>
          <ButtonBase text="Load" icon={<IconifyUpdate />} handleClick={checkLatestSection} />
          <ButtonBase text="Config" icon={<IconifySettingsOutline />} handleClick={onClickMissing} />
        </div>
      </nav>
    </header>
  );
};
