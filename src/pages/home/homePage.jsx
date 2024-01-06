import css from "./homePage.module.css";
import * as C from "./index.js";
import * as L from "$src/components/layouts";
import { ButtonBase } from "../../components/index.jsx";
import { StateContext } from "../../context/index.jsx";
import { useContext } from "react";

export const HomePage = () => {
  const { $openSection, selectedItem } = useContext(StateContext);

  return (
    <>
      <section className={css.Container}>
        <L.HeaderSecondary title="Bookmarks" text="Choise a bookmark or make a new">
          <div className={css.Navbar}>
            <div className={css.Navbar_box}>
              <ButtonBase
                text="New"
                icon={<IconifyAdd />}
                handleClick={() => $openSection((prev) => ({ ...prev, addElem: !prev.addElem }))}
              />
            </div>
          </div>
        </L.HeaderSecondary>
        <div className={css.Container_box}>
          {selectedItem.collection.id === "" ? <C.PaneCollections /> : <C.PaneTopics />}
          <C.PaneBookmarks />
        </div>
      </section>
    </>
  );
};
