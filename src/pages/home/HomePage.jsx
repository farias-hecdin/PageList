import css from "./HomePage.module.css";
import * as C from "$src/components";
import { PgHeaderSecondary } from "$src/features/pg-layoutPage/pgHeader/PgHeaderSecondary";
import { StateContext } from "$src/context";
import { VwPaneCollections } from "$src/features/vw-viewElements/VwPaneCollections";
import { useContext } from "react";
import { VwPaneBookmarks } from "$src/features/vw-viewElements/vwPaneBookmarks/VwPaneBookmarks";
import { VwPaneTopics } from "$src/features/vw-viewElements/vwPaneTopics/VwPaneTopics";

export const HomePage = () => {
  const { $openSection, selectedItem } = useContext(StateContext);

  return (
    <>
      <section className={css.Container}>
        <PgHeaderSecondary title="Bookmarks" text="Choise a bookmark or make a new">
          <div className={css.Navbar}>
            <div className={css.Navbar_box}>
              <C.ButtonBase
                text="New"
                icon={<IconifyAdd />}
                handleClick={() => $openSection((prev) => ({ ...prev, addElem: !prev.addElem }))}
              />
            </div>
          </div>
        </PgHeaderSecondary>
        <div className={css.Container_box}>
          {selectedItem.collection.id === "" ? <VwPaneCollections /> : <VwPaneTopics />}
          <VwPaneBookmarks />
        </div>
      </section>
    </>
  );
};
