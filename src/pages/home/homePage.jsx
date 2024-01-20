import css from "./homePage.module.css";
import { BookmarksPane } from "./bookmarks/bookmarksPane.jsx";
import { ButtonBase, WrapBase } from "../../components/index.jsx";
import { DataContext, StateContext } from "../../context/index.jsx";
import { MessageFeedback, HeaderSecondary } from "../../layout/index.jsx";
import { ModalWrapper } from "./modal/modalWrapper";
import { TopicsPane } from "./topics/topicsPane.jsx";
import { onClickMissing } from "../../utils/common";
import { useContext } from "react";

export const HomePage = () => {
  const { selectedItem } = useContext(DataContext);
  const { $showModal } = useContext(StateContext);

  return (
    <>
      <ModalWrapper />
      <section className={css.Container}>
        <HeaderSecondary title="Bookmarks" text="Choise a bookmark or make a new">
          <div className={css.Navbar}>
            <div className={css.Navbar_box}>
              <ButtonBase
                text="New"
                icon={<IconifyAdd />}
                handleClick={() => $showModal((prev) => ({ ...prev, addBookmarks: !prev.addBookmarks }))}
              />
              <ButtonBase text="Search" styled="--outline" icon={<IconifySearch />} handleClick={onClickMissing} />
            </div>
            <WrapBase styled="HomePage_JhI8l">
              <ButtonBase
                icon={<IconifyInventory2Outline />}
                handleClick={() => $showModal((prev) => ({ ...prev, collectionsPane: !prev.collectionsPane }))}
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
            <div className={css.Container_frame}>
              <TopicsPane />
              <BookmarksPane />
            </div>
          )}
        </div>
      </section>
    </>
  );
};
