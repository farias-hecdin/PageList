import css from "./VwPaneBookmarks.module.css";
import * as C from "$src/components";
import { StateContext } from "$src/context";
import { useContext } from "react";

export const VwPaneBookmarksHeader = () => {
  const { counterItem, $openSection, $selectedItem, $pinData, selectedItem } = useContext(StateContext);

  return (
    <header className={css.Header}>
      <div>
        <h2 className={css.Header_title}>{selectedItem.list.name}</h2>
        <p className={css.Header_text}>{counterItem.bookmarks} bookmarks</p>
      </div>
      <C.ButtonBase
        icon={<IconifyAdd />}
        handleClick={() => {
          $openSection((prev) => ({ ...prev, addElem: !prev.addElem }));
          $pinData(true);
        }}
      />
      <C.ButtonBase icon={<IconifyFilterList />} />
      <C.ButtonBase
        icon={<IconifyClose />}
        handleClick={() => $selectedItem((prev) => ({ ...prev, list: { id: "", name: "" } }))}
      />
    </header>
  );
};
