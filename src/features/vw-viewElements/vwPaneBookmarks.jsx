import css from "./paneBookmarks.module.css";
import { ButtonBase } from "../../../components/index.jsx";
import { DataContext, StateContext } from "../../../context/index.jsx";
import { MessageFeedback } from "../../../layout/index";
import { CardBookmark } from "../card/cardBookmark.jsx";
import { useContext } from "react";

export const PaneBookmarks = () => {
  const { selectedItem } = useContext(StateContext);
  const { dataBookmark, dataList, dataTopic, theBookmark, $theBookmark } = useContext(DataContext);

  return (
    <section className={css.Container}>
      {selectedItem.type === null ? (
        <MessageFeedback
          icon={<IconifyInfoOutline />}
          title="Nothing here"
          text="Choose a list to access your favorite bookmarks."
        />
      ) : (
        <>
          <HeaderSection />
          <ul className={css.Container_list}>
            {theBookmark.map((elem) => (
              <AnBookmark key={elem.id} data={elem} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

const AnBookmark = ({ data }) => {
  const { $openSection, $targetItem } = useContext(StateContext);

  return (
    <li className={css.List_item}>
      <CardBookmark name={data.title} url={data.url}>
        <ButtonBase
          icon={<IconifyMoreVert />}
          styled="--ghost Button_lupuE"
          handleClick={() => {
            $openSection((prev) => ({ ...prev, editElem: !prev.editElem }));
            $targetItem({ id: data.id, title: data.title, url: data.url, type: "bookmark" });
          }}
        />
      </CardBookmark>
    </li>
  );
};

const HeaderSection = () => {
  const { counterItem, $openSection, $selectedItem, $pinData, selectedItem } = useContext(StateContext);

  return (
    <header className={css.Header}>
      <div>
        <h2 className={css.Header_title}>{selectedItem.list.name}</h2>
        <p className={css.Header_text}>{counterItem.bookmarks} bookmarks</p>
      </div>
      <ButtonBase
        icon={<IconifyAdd />}
        handleClick={() => {
          $openSection((prev) => ({ ...prev, addElem: !prev.addElem }));
          $pinData(true);
        }}
      />
      <ButtonBase icon={<IconifyFilterList />} />
      <ButtonBase
        icon={<IconifyClose />}
        handleClick={() => $selectedItem((prev) => ({ ...prev, list: { id: "", name: "" } }))}
      />
    </header>
  );
};
