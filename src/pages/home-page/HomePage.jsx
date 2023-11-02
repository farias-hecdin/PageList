import css from "./HomePage.module.css";
import { ButtonBase, WrapBase } from "../../components/Index";
import { DataContext } from "../../context/Index.jsx";
import { EmptyState, HeaderSection } from "../../layout/Index";
import { FavoritePane } from "./favorite-pane/FavoritePane.jsx";
import { HomePageModalAddBookmarks } from "./HomePageModalAddBookmarks";
import { SectionPane } from "./section-pane/SectionPane.jsx";
import { SectionPaneModal } from "./section-pane/SectionPaneModal.jsx";
import { useContext, useState } from "react";

export const HomePage = () => {
  // Importar datos -----------------------------------------------------------

  const { selectedCollectionX } = useContext(DataContext);

  // Mostrar ventana de la lista de colecciones -------------------------------

  const [isOpenModalToSelectAnCollection, setIsOpenModalToSelectAnCollection] = useState(false);
  const [isOpenModalToAddBookmarks, setIsOpenModalToAddBookmarks] = useState(false);

  /** Mostrar ventana modal */
  const toggleModalToSelectAnCollection = () => setIsOpenModalToSelectAnCollection(!isOpenModalToSelectAnCollection);
  const toggleModalToAddBookmarks = () => setIsOpenModalToAddBookmarks(!isOpenModalToAddBookmarks);

  return (
    <>
      <SectionPaneModal pShowModal={isOpenModalToSelectAnCollection} />
      <HomePageModalAddBookmarks pShowModal={isOpenModalToAddBookmarks} />
      <section className={css.Container}>
        <HeaderSection pTitle="Bookmarks" pText="Choise a bookmark or make a new">
          <div className={css.Navbar}>
            <div className={css.Navbar_box}>
              <ButtonBase pText="New" pIcon="add" pHandleClick={toggleModalToAddBookmarks} />
              <ButtonBase pText="Search" pIcon="search" />
            </div>
            <WrapBase pStyled="HomePage_JhI8l">
              <ButtonBase pIcon="note-stack-outline" pHandleClick={toggleModalToSelectAnCollection} />
              <p className={css.Navbar_text}>{selectedCollectionX.state.id}</p>
            </WrapBase>
          </div>
        </HeaderSection>
        <div className={css.Container_box}>
          {selectedCollectionX.state.id === "None"
            ? <EmptyState
              pIcon="info-outline"
              pTitle="Nothing here"
              pText="Choose a collection to access your favorite links"
            />
            : <div className={css.Container_boxInner}>
              <SectionPane />
              <FavoritePane />
            </div>
          }
        </div>
      </section>
    </>
  );
};
