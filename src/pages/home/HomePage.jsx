import css from "./HomePage.module.css";
import * as F from "$src/features";
import { StateContext } from "$src/context";
import { useContext } from "react";

export const HomePage = () => {
  const { selectedItem } = useContext(StateContext);

  return (
    <F.PgLayout>
      <F.PgHeaderSecondary title="Bookmarks" text="Choise a bookmark or create a new">
      </F.PgHeaderSecondary>
      <div className={css.Container_box}>
        {selectedItem.type == "collection" && <F.VwPaneCollections />}
        {selectedItem.type == "topic" && <F.VwPaneTopics />}
        {/* {selectedId.type !== true ? ( */}
        {/*   <C.ScreenFeedback */}
        {/*     icon={<IconifyInfoOutline />} */}
        {/*     title="Nothing here" */}
        {/*     text="Choose a list to access your favorite bookmarks." */}
        {/*   /> */}
        {/* ) : ( */}
          <F.VwPaneBookmarks />
        {/* )} */}
      </div>
    </F.PgLayout>
  );
};
