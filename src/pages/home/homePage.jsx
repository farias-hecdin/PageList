import css from "./homePage.module.css";
import { PaneBookmarks } from "./pane/paneBookmarks.jsx";
import { ButtonBase, WrapBase } from "../../components/index.jsx";
import { CollectionsPane } from "./collections/collectionsPane";
import { DataContext, StateContext } from "../../context/index.jsx";
import { HeaderSecondary } from "../../layout/index.jsx";
import { ModalWrapper } from "./modal/modalWrapper";
import { TopicsPane } from "./topics/topicsPane.jsx";
import { useContext } from "react";

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
                text="New"
                icon={<IconifyAdd />}
                handleClick={() => setShowModal((prev) => ({ ...prev, addBookmarks: !prev.addBookmarks }))}
              />
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
          {selectedItem.collectionId === "0" ? <CollectionsPane /> : <TopicsPane />}
          <PaneBookmarks />
        </div>
      </section>
    </>
  );
};
