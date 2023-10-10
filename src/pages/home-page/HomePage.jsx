import css from "./HomePage.module.css";
import { BookmarksContext, StateContext } from "../../context/Index.jsx";
import { FavoritePane } from "./favorite-pane/FavoritePane.jsx";
import { SectionPane } from "./section-pane/SectionPane.jsx";
import { useContext } from "react";
import { ButtonBase, WrapBase } from "../../components/Index";
import { SectionModal } from "./section-modal/SectionModal";

export const HomePage = () => {
  // Importar datos -----------------------------------------------------------
  const { dataBookmarks, selectedCollection, cantidadDeTemas } = useContext(BookmarksContext);

  // Mostrar ventana modal ----------------------------------------------------
  const { showCollectionModal, setShowCollectionModal } = useContext(StateContext);

  const fnToggleModal = () => {
    setShowCollectionModal(!showCollectionModal);
  };

  return (
    <>
      <SectionModal />
      <section className={css.HomePage}>
        <header className={css.Header}>
          <h2>Collections {cantidadDeTemas}</h2>
          <div className={css.Header_navbar}>
            <div className={css.Header_navbar_frame}>
              <ButtonBase pText="New" pIcon="add" />
              <ButtonBase pText="Search" pIcon="search" />
            </div>
            <WrapBase pStyled="HomePage_JhI8l">
              <ButtonBase pIcon="update" pHandleClick={fnToggleModal} />
              <p className={css.Header_navbar_text}>{selectedCollection}</p>
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
            <SectionPane pSelectedCollection={[selectedCollection, dataBookmarks]} />
            <FavoritePane />
          </div>
        )}
      </section>
    </>
  );
};
