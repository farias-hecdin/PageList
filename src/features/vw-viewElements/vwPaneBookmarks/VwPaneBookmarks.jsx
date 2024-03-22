import css from "./VwPaneBookmarks.module.css";
import { useContext } from "react";
import * as C from "$src/components";
import { DataContext, StateContext } from "$src/context";
import * as F from "../VwElementsPane";

export const VwPaneBookmarks = () => {
  const { selectedItem, $selectedItem, $openSection, $targetItem, $pinData } = useContext(StateContext);
  const { theBookmark, dataBookmark} = useContext(DataContext);

  return (
    <F.VwElementsPane
      title="Bookmarks"
      counter={"99"}
      buttons={
        <>
          <C.ButtonBase icon={<IconifySearch />} styled="is-outline" />
          <C.ButtonBase
            icon={<IconifyAdd />}
            handleClick={() => {
              $openSection((prev) => ({ ...prev, addElem: !prev.addElem }));
              $pinData(true);
            }}
            styled="is-outline"
          />
          <C.ButtonBase
            icon={<IconifyArrowBackIosNew />}
            handleClick={() => $selectedItem((prev) => ({ ...prev, collection: { id: "", name: "" } }))}
            styled="is-outline"
          />
        </>
      }
    >
      <ul className={css.Container_list}>
        {dataBookmark.map((elem) => (
          <li className={css.List_item} key={elem.id}>
            <C.CardBookmark name={elem.title} url={elem.url}>
              <C.ButtonBase
                icon={<IconifyMoreVert />}
                styled="--ghost Button_lupuE"
                handleClick={() => {
                  $openSection((prev) => ({ ...prev, editElem: !prev.editElem }));
                  $targetItem({ id: elem.id, title: elem.title, url: elem.url, type: "bookmark" });
                }}
              />
            </C.CardBookmark>
          </li>
        ))}
      </ul>
    </F.VwElementsPane>
  );
};
