import css from "./SectionPane.module.css";
import { ButtonBase } from "../../../components/Index.jsx";
import { useContext } from "react";
import { BookmarksContext } from "../../../context/Index";
import { logC } from "../../../console";

export const SectionPane = () => {
  // Importar datos -----------------------------------------------------------
  const { savedBookmarks, selectedCollection, numberTopics, dataLinks, titleLists, numberLinks } =
    useContext(BookmarksContext);

  // Obtener datos al hacer clic a un item de la lista
  const funcGetListLinks = (data, name, amount) => {
    const getDataLinks = data;
    const getTitleLists = name;
    const getNumberLinks = amount;

    dataLinks.set(getDataLinks);
    titleLists.set(getTitleLists);
    numberLinks.set(getNumberLinks);
  };

  // Expandir lista de marcadores ---------------------------------------------
  const funcExpandList = (e) => {
    let $node = e.currentTarget;

    if ($node.classList.contains("--expand")) {
      $node.classList.remove("--expand");
    } else {
      $node.classList.add("--expand");
    }
  };
  return (
    <section className={css.Container}>
      <header className={css.Header}>
        <div>
          <h2 className={css.Header_title}>{selectedCollection.state || "None"}</h2>
          <p className={css.Header_text}>{numberTopics.state} Lists</p>
        </div>
        <ButtonBase pIcon="edit" />
      </header>
      <div className={css.List}>
        <ul className={css.List_items}>
          {typeof savedBookmarks.state === "object"
            ? savedBookmarks.state.collections.map((collections) => {
                // data.collections[i]
                if (collections.name === selectedCollection.state) {
                  return collections.topics.map((topics) => (
                    // data.collections[i].topics[i]
                    <li key={crypto.randomUUID()}>
                      <div className={css.Tree}>
                        <div className={css.Tree_header} onClick={(e) => funcExpandList(e)}>
                          <p className={css.Tree_title}>{topics.name}</p>
                          <p className={css.Tree_number}>{topics.lists.length}</p>
                        </div>
                        <ul className={css.Tree_list}>
                          {topics.lists.map((lists) => (
                            // data.collections[i].topics[i].lists[i]
                            <li key={crypto.randomUUID()}>
                              <div
                                className={css.Tree_item}
                                onClick={() => funcGetListLinks(lists.links, lists.name, lists.links.length)}
                              >
                                <span className={css.Tree_item_icon}>
                                  <i className="material-symbols-outlined">folder</i>
                                </span>
                                <p className={css.Tree_item_text}>{lists.name}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ));
                }
              })
            : logC(savedBookmarks.state, "SectionPane (savedBookmarks)")}
        </ul>
      </div>
    </section>
  );
};
