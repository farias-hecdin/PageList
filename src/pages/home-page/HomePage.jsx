import css from "./HomePage.module.css";
import { BookmarksContext, StateContext } from "../../context/Index.jsx";
import { ButtonBase, WrapBase } from "../../components/Index";
import { EmptyState } from "../../layout/Index";
import { FavoritePane } from "./favorite-pane/FavoritePane.jsx";
import { SectionPane } from "./section-pane/SectionPane.jsx";
import { SectionPaneModal } from "./section-pane/SectionPaneModal.jsx";
import { useContext } from "react";

export const HomePage = () => {
  // Importar datos -----------------------------------------------------------
  const { selectedCollection } = useContext(BookmarksContext);

  // Mostrar ventana de la lista de colecciones -------------------------------
  const { showCollectionModal, setShowCollectionModal } = useContext(StateContext);

  const funcToggleModal = () => setShowCollectionModal(!showCollectionModal);

  return (
    <>
      <SectionPaneModal />
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
          <EmptyState pIcon="info" pTitle="Nothing here" pText="Choose a collection to access your favorite links" />
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
