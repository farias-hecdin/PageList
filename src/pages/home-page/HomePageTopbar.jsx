import { ButtonBase, WrapBase } from "../../components/Index";
import css from "./HomePageTopbar.module.css";

export const HomePageTopbar = ({ pSelectedCollection, pToggleModal }) => {
  return (
    <header className={css.Container}>
      <h2>Collections</h2>
      <div className={css.Navbar}>
        <div className={css.Navbar_frame}>
          <ButtonBase pText="New" pIcon="add" />
          <ButtonBase pText="Search" pIcon="search" />
        </div>
        <WrapBase styled="HomePageTopbarNavbarWrap">
          <ButtonBase pIcon="update" handleClick={pToggleModal} />
          <p className={css.Navbar_text}>{pSelectedCollection}</p>
        </WrapBase>
      </div>
    </header>
  );
};
