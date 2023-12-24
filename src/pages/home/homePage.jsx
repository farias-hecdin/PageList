import css from "./homePage.module.css";
import { ButtonBase } from "../../components/index.jsx";
import { ReferenceContext, StateContext } from "../../context/index.jsx";
import { HeaderSecondary } from "../../layout/index.jsx";
import { ModalWrapper } from "./modal/modalWrapper";
import { useContext } from "react";

export const HomePage = () => {
  const { selectedItem } = useContext(ReferenceContext);
  const { showModal } = useContext(StateContext);

  return (
    <>
      {/* <ModalWrapper /> */}
      <section className={css.Container}>
        <HeaderSecondary title="Bookmarks" text="Choise a bookmark or make a new">
          <div className={css.Navbar}>
            <div className={css.Navbar_box}>
              <ButtonBase
                text="New"
                icon={<IconifyAdd />}
                handleClick={() => showModal((prev) => ({ ...prev, addBookmarks: !prev.addBookmarks }))}
              />
            </div>
          </div>
        </HeaderSecondary>
        <div className={css.Container_box}>
          {/* {selectedItem.collectionId === "0" ? <CollectionsPane /> : <TopicsPane />} */}
          {/* <PaneBookmarks /> */}
        </div>
      </section>
    </>
  );
};
