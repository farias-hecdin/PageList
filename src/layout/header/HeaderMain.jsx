import css from "./HeaderMain.module.css";
import website_logo from "../../assets/brand/fake-logo.svg";
import { ButtonBase, WrapBase } from "../../components/Index.jsx";

export const HeaderMain = ({pViewPage, pView}) => {
  const funcViewPage = (path) => {
    pViewPage(path)
  }
  return (
    <header className={css.HeaderMain}>
      <div className={css.Logo}>
        <img className={css.Logo_image} src={website_logo} alt="pagelist" />
        <span className={css.Logo_title}>Pagelist</span>
      </div>
      <nav className={css.Navbar}>
        <WrapBase>
          <ButtonBase pStyled={`HeaderMain_UlICn ${pView == "home" && "--active"}`} pIcon="folder" pText="Collections" pHandleClick={() => funcViewPage("home")} />
          <ButtonBase pStyled={`HeaderMain_UlICn ${pView == "save" && "--active"}`} pIcon="save" pText="Save" pHandleClick={() => funcViewPage("save")} />
        </WrapBase>
        <div className={css.Navbar_box}>
          <ButtonBase pIcon="settings" />
        </div>
      </nav>
    </header>
  );
};
