import css from "./homePage.module.css";
import { ButtonBase } from "../../components/index.jsx";
import { HeaderSecondary } from "../../layout/index.jsx";
import { ModalWrapper } from "./modal/modalWrapper";
import { PaneBookmarks } from "./bookmarks/paneBookmarks";
import { PaneCollections } from "./pane/paneCollections";
import { PaneTopics } from "./pane/paneTopics";
import { StateContext } from "../../context/index.jsx";
import { useContext } from "react";

export const HomePage = () => {
  const { $showModal, selectedItem } = useContext(StateContext);

  return (
    <>
      {/* <ModalWrapper /> */}
      <section className={css.Container}>
        <HeaderSecondary title="Bookmarks" text="Choise a bookmark or make a new">
          <div className={css.Navbar}>
            <div className={css.Navbar_box}>
              <ButtonBase text="New" icon={<IconifyAdd />} handleClick={() => $showModal((prev) => ({ ...prev, addBookmarks: !prev.addBookmarks }))} />
            </div>
          </div>
        </HeaderSecondary>
        <div className={css.Container_box}>
          {selectedItem.collectionId === "0" ? <PaneCollections /> : <PaneTopics />}
          {/* <PaneBookmarks /> */}
        </div>
      </section>
    </>
  );
};
