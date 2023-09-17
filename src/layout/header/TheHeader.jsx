import css from "./TheHeader.module.css";
import logo_website from "../../assets/brand/fake-logo.svg";
import { ButtonBase, WrapBase } from "../../components/Index.jsx";

const TheHeader = () => {
  return (
    <header className={css.Container}>
      <div className={css.Logo}>
        <img className={css.Logo_image} src={logo_website} alt="pagelist" />
        <span className={css.Logo_title}>Pagelist</span>
      </div>
      <nav className={css.Navbar}>
        <WrapBase>
          <ButtonBase
            styled="TheHeaderNavbarButton --active"
            pIcon="folder"
            pText="Collections"
          />
          <ButtonBase
            styled="TheHeaderNavbarButton"
            pIcon="finance"
            pText="Stats"
          />
          <ButtonBase
            styled="TheHeaderNavbarButton"
            pIcon="save"
            pText="Save"
          />
        </WrapBase>
        <div className={css.Navbar_box}>
          <ButtonBase pIcon="Search" />
          <ButtonBase pIcon="settings" />
        </div>
      </nav>
    </header>
  );
};

export default TheHeader;
