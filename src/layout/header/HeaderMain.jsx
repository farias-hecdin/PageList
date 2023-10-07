import css from "./HeaderMain.module.css";
import website_logo from "../../assets/brand/fake-logo.svg";
import { ButtonBase, WrapBase } from "../../components/Index.jsx";

export const HeaderMain = () => {
  return (
    <header className={css.HeaderMain}>
      <div className={css.Logo}>
        <img className={css.Logo_image} src={website_logo} alt="pagelist" />
        <span className={css.Logo_title}>Pagelist</span>
      </div>
      <nav className={css.Navbar}>
        <WrapBase>
          <ButtonBase styled="HeaderMainNavbarButton --active" pIcon="folder" pText="Collections" />
          <ButtonBase styled="HeaderMainNavbarButton" pIcon="finance" pText="Stats" />
          <ButtonBase styled="HeaderMainNavbarButton" pIcon="save" pText="Save" />
        </WrapBase>
        <div className={css.Navbar_box}>
          <ButtonBase pIcon="settings" />
        </div>
      </nav>
    </header>
  );
};
