import css from "./HomePage.module.css";
import { BookmarksContext, StateContext } from "../../context/Index.jsx";
import { ButtonBase, WrapBase } from "../../components/Index";
import { FavoritePane } from "./favorite-pane/FavoritePane.jsx";
import { SectionModal } from "./section-modal/SectionModal";
import { SectionPane } from "./section-pane/SectionPane.jsx";
import { useContext } from "react";

export const HomePage = () => {
  // Importar datos -----------------------------------------------------------
  const { selectedCollection } = useContext(BookmarksContext);

  // Mostrar ventana de la lista de colecciones -------------------------------
  const { showCollectionModal, setShowCollectionModal } = useContext(StateContext);

  const funcToggleModal = () => setShowCollectionModal(!showCollectionModal);

  return (
    <>
      <SectionModal />
      <section className={css.HomePage}>
        <header className={css.HomePage_header}>
          <h2>Collections</h2>
          <div className={css.Navbar}>
            <div className={css.Navbar_frame}>
              <ButtonBase pText="New" pIcon="add" />
              <ButtonBase pText="Search" pIcon="search" />
            </div>
            <WrapBase pStyled="HomePage_JhI8l">
              <ButtonBase pIcon="update" pHandleClick={funcToggleModal} />
              <p className={css.Navbar_text}>{selectedCollection}</p>
            </WrapBase>
          </div>
        </header>
        {selectedCollection === null ? (
          <div className={css.Info}>
            <span className={css.Info_icon}>
              <i className="material-symbols-outlined">info</i>
            </span>
            <p className={css.Info_title}>Nothing here</p>
            <p className={css.Info_text}>Choose a collection to access your favorite links.</p>
          </div>
        ) : (
          <div className={css.HomePage_frame}>
            <SectionPane />
            <FavoritePane />
          </div>
        )}
      </section>
    </>
  );
};
