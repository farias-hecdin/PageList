import css from "./HeaderMain.module.css";
import website_logo from "../../assets/brand/fake-logo.svg";
import { BookmarksContext } from "../../context/Index";
import { ButtonBase, WrapBase } from "../../components/Index.jsx";
import { useContext } from "react";
import { useState } from "react";

export const HeaderMain = ({ pUpdatePage, pPage }) => {
  const funcShowActivePage = (selectedPage) => {
    pUpdatePage(selectedPage);
  };

  // Revisar la ultima seccion ------------------------------------------------
  const { setBookmarksList } = useContext(BookmarksContext);
  const [ indicatorLoadSection, setIndicatorLoadSection ] = useState(false)

  const funcCheckLatestSection = () => {
    let latestSectionData = localStorage.getItem("pagelist__latestSection");
    if (latestSectionData !== "") {
      latestSectionData = JSON.parse(latestSectionData);
      setBookmarksList(() => latestSectionData);
    }
    setIndicatorLoadSection(true)
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
            pStyled={`HeaderMain_UlICn ${pPage === "home" && "--active"}`}
            pIcon="bookmarks"
            pText="Bookmarks"
            pHandleClick={() => funcShowActivePage("home")}
          />
          <ButtonBase
            pStyled={`HeaderMain_UlICn ${pPage === "save" && "--active"}`}
            pIcon="folder"
            pText="Manage"
            pHandleClick={() => funcShowActivePage("save")}
          />
        </WrapBase>
        <div className={css.Navbar_box}>
          <ButtonBase pText={`Load ${indicatorLoadSection ? "[on]" : "[off]"}`} pIcon="update" pHandleClick={funcCheckLatestSection} />
          <ButtonBase pText="Config" pIcon="settings" />
        </div>
      </nav>
    </header>
  );
};
