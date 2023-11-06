import css from "./homePage.module.css";
import { ButtonBase, WrapBase } from "../../components/index.jsx";
import { DataContext } from "../../context/index.jsx";
import { EmptyState, HeaderSection } from "../../layout/index.jsx";
import { FavoritePane } from "./favoritePane/favoritePane.jsx";
import { HomePageModalAddBookmarks } from "./homePage-modal-addBookmarks.jsx";
import { SectionPane } from "./sectionPane/sectionPane.jsx";
import { SectionPaneModal } from "./sectionPane/sectionPane-modal.jsx";
import { useContext, useState } from "react";

export const HomePage = () => {
  const { selectedCollection } = useContext(DataContext);

  // Mostrar ventanas modales -------------------------------

  const [isOpenModalToSelectAnCollection, setIsOpenModalToSelectAnCollection] = useState(false);
  const toggleModalToSelectAnCollection = () => setIsOpenModalToSelectAnCollection(!isOpenModalToSelectAnCollection);

  const [isOpenModalToAddBookmarks, setIsOpenModalToAddBookmarks] = useState(false);
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
              <p className={css.Navbar_text}>{selectedCollection.name}</p>
            </WrapBase>
          </div>
        </HeaderSection>
        <div className={css.Container_box}>
          {selectedCollection.id === "None" ? (
            <EmptyState
              pIcon="info-outline"
              pTitle="Nothing here"
              pText="Choose a collection to access your favorite links"
            />
          ) : (
            <div className={css.Container_boxInner}>
              <SectionPane />
              <FavoritePane />
            </div>
          )}
        </div>
      </section>
    </>
  );
};
