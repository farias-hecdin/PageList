import css from "./HomePage.module.css";
import * as C from "$src/components";
import * as F from "$src/features";
import { StateContext } from "$src/context";
import { useContext } from "react";

export const HomePage = () => {
  const { $openSection, selectedItem } = useContext(StateContext);

  return (
    <>
      <section className={css.Container}>
        <F.PgHeaderSecondary title="Bookmarks" text="Choise a bookmark or create a new">
          {/* Pinned breadcrumb */}
          <div className={css.Pinned}>
            <C.ButtonBase text="Pin" icon={<IconifyPushPin />} />
            <ul>
              <li className={css.Pinned_item}>
                <p>Pinned #1</p>
                <C.ButtonBase icon={<IconifyDelete />} styled="is-outline Button_wUdyqpEVzs" />
              </li>
            </ul>
          </div>
          {/* <C.ButtonBase */}
          {/*   text="New" */}
          {/*   icon={<IconifyAdd />} */}
          {/*   handleClick={() => $openSection((prev) => ({ ...prev, addElem: !prev.addElem }))} */}
          {/* /> */}
        </F.PgHeaderSecondary>
        <div className={css.Container_box}>
          {selectedItem.collection.id === "" ? <F.VwPaneCollections /> : <F.VwPaneTopics />}
          {selectedItem.type === null ? (
            <C.ScreenFeedback
              icon={<IconifyInfoOutline />}
              title="Nothing here"
              text="Choose a list to access your favorite bookmarks."
            />
          ) : (
            <F.VwPaneBookmarks />
          )}
        </div>
      </section>
    </>
  );
};
