import css from "./homePage.module.css";
import { ButtonBase, WrapBase } from "../../components/index.jsx";
import { DataContext, StateContext } from "../../context/index.jsx";
import { MessageFeedback, HeaderSecondary } from "../../layout/index.jsx";
import { BookmarksPane } from "./bookmarks/bookmarksPane.jsx";
import { TopicsPane } from "./topics/topicsPane.jsx";
import { useContext } from "react";
import { ModalWrapper } from "./modal/modalWrapper";

// Nodo previo: ../app.jsx

export const HomePage = () => {
  const { selectedItem } = useContext(DataContext);
  const { openCollectionsModal, setOpenCollectionsModal, openModalAddBookmarks, setOpenModalAddBookmarks } =
    useContext(StateContext);

  return (
    <>
      <ModalWrapper />
      <section className={css.Container}>
        <HeaderSecondary title="Bookmarks" text="Choise a bookmark or make a new">
          <div className={css.Navbar}>
            <div className={css.Navbar_box}>
              <ButtonBase text="New" icon="add" handleClick={() => setOpenModalAddBookmarks(!openModalAddBookmarks)} />
              <ButtonBase text="Search" icon="search" />
            </div>
            <WrapBase styled="HomePage_JhI8l">
              <ButtonBase
                icon="inventory-2-outline"
                handleClick={() => setOpenCollectionsModal(!openCollectionsModal)}
              />
              <p className={css.Navbar_text}>{selectedItem.collectionName}</p>
            </WrapBase>
          </div>
        </HeaderSecondary>
        <div className={css.Container_box}>
          {selectedItem.collectionId === "0" ? (
            <MessageFeedback
              icon="info-outline"
              title="Nothing here"
              text="Choose a collection to access your favorite bookmarks"
            />
          ) : (
            <div className={css.Container_boxInner}>
              <TopicsPane />
              <BookmarksPane />
            </div>
          )}
        </div>
      </section>
    </>
  );
};
