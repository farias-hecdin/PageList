import css from "./bookmarksPane.module.css";
import { ButtonBase } from "../../../components/index.jsx";
import { DataContext, StateContext } from "../../../context/index.jsx";
import { MessageFeedback } from "../../../layout/index";
import { BookmarksCard } from "./bookmarksCard.jsx";
import { useContext } from "react";

export const BookmarksPane = () => {
  const { counterItem, setShowModal } = useContext(StateContext);
  const { dataBookmarks, dataLists, selectedItem, setSelectedItem, setTargetItem } = useContext(DataContext);

  const Bookmarks =(data) => {
    const bookmark = data.data
    return (
      <BookmarksCard title={bookmark.title} url={bookmark.url}>
        <ButtonBase
          icon={<IconifyMoreVert />}
          styled="--ghost TopicsPane_WQkiS"
          handleClick={() => {
            setShowModal((prev) => ({ ...prev, editMode: !prev.editMode }));
            setTargetItem({
              id: bookmark.id,
              title: bookmark.title,
              url: bookmark.url,
              type: "bookmark",
            });
          }}
        />
      </BookmarksCard>
    )}

  return (
    <section className={css.Container}>
      {selectedItem.listId === "0" ? (
        <MessageFeedback
          icon={<IconifyInfoOutline />}
          title="Nothing here"
          text="Choose a list to access your favorite bookmarks."
        />
      ) : (
        <>
          <header className={css.Header}>
            <div>
              <h2 className={css.Header_title}>{selectedItem.listTitle}</h2>
              <p className={css.Header_text}>{counterItem.bookmarks} bookmarks</p>
            </div>
            <ButtonBase icon={<IconifyFilterList />} />
            <ButtonBase
              icon={<IconifyClose />}
              handleClick={() => setSelectedItem((prev) => ({ ...prev, listId: "0" }))}
              />
            </header>
            <ul className={css.Container_list}>
              {selectedItem.type === 'list' &&
                dataBookmarks.map((bookmark) => {
                  if (bookmark.parent === selectedItem.listId){
                    return (
                      <li key={crypto.randomUUID()} className={css.List_item}>
                        <Bookmarks data={bookmark}/>
                      </li>
                    )
                  }
                })
              }
              {selectedItem.type === 'topic' &&
                dataBookmarks.map((bookmark) => (
                  dataLists.map((list) => {
                    if (list.parent === selectedItem.listId) {
                      if (bookmark.parent === list.id) {
                        return (
                          <li key={crypto.randomUUID()} className={css.List_item}>
                            <Bookmarks data={bookmark}/>
                          </li>
                        )
                      }
                    }
                  })
                ))
              }
            </ul>
          </>
        )}
    </section>
  );
};
