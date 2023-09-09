import css from "./TheHeader.module.css";
import logo_website from "../../assets/brand/fake-logo.svg";
import { ButtonBase, WrapBase } from "../../components/Index.jsx";

const TheHeader = () => {
  return (
    <header className={css.Container}>
      <div className={css.Logo}>
        <img src={logo_website} alt="pagelist" />
        <span>Pagelist</span>
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
            styled="TheHeaderNavbarButton --inverse"
            pIcon="save"
            pText="Save"
          />
        </WrapBase>
        <div>
          <ButtonBase pIcon="Search" />
          <ButtonBase pIcon="settings" />
        </div>
      </nav>
    </header>
  );
};

export default TheHeader;
