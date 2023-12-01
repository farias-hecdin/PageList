import css from "./homePage.module.css";
import { ButtonBase, WrapBase } from "../../components/index.jsx";
import { DataContext, StateContext } from "../../context/index.jsx";
import { MessageFeedback, HeaderSecondary } from "../../layout/index.jsx";
import { BookmarksPane } from "./bookmarks/bookmarksPane.jsx";
import { TopicsPane } from "./topics/topicsPane.jsx";
import { useContext } from "react";
import { ModalWrapper } from "./modal/modalWrapper";
import { onClickMissing } from "../../utils/common";

export const HomePage = () => {
  const { selectedItem } = useContext(DataContext);
  const { setShowModal } = useContext(StateContext);

  return (
    <>
      <ModalWrapper />
      <section className={css.Container}>
        <HeaderSecondary title="Bookmarks" text="Choise a bookmark or make a new">
          <div className={css.Navbar}>
            <div className={css.Navbar_box}>
              <ButtonBase
                text="Add new"
                icon={<IconifyAdd />}
                handleClick={() => setShowModal((prev) => ({ ...prev, addBookmarks: !prev.addBookmarks }))}
              />
              <ButtonBase text="Search" styled="--outline" icon={<IconifySearch />} handleClick={onClickMissing} />
            </div>
            <WrapBase styled="HomePage_JhI8l">
              <ButtonBase
                icon={<IconifyInventory2Outline />}
                handleClick={() => setShowModal((prev) => ({ ...prev, collectionsPane: !prev.collectionsPane }))}
              />
              <p className={css.Navbar_text}>{selectedItem.collectionTitle}</p>
            </WrapBase>
          </div>
        </HeaderSecondary>
        <div className={css.Container_box}>
          {selectedItem.collectionId === "0" ? (
            <MessageFeedback
              icon={<IconifyInfoOutline />}
              title="Nothing here"
              text="Choose a collection to access your favorite bookmarks"
            />
          ) : (
            <div className={css.Container_wrap}>
              <TopicsPane />
              <BookmarksPane />
            </div>
          )}
        </div>
      </section>
    </>
  );
};
