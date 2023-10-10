import css from "./SectionPane.module.css";
import { ButtonBase } from "../../../components/Index.jsx";
import { useState } from "react";

export const SectionPane = ({ pSelectedCollection }) => {
  const [selectedCollection, dataBookmarks] = pSelectedCollection;

  // Hacer click en el elemento

  const fnDoClick = (value) => {
    console.log(value);
  };

  return (
    <section className={css.Container}>
      <header className={css.Header}>
        <div>
          <h2 className={css.Header_title}>{selectedCollection}</h2>
          <p className={css.Header_text}> Lists</p>
        </div>
        <ButtonBase pIcon="edit" />
      </header>
      <div className={css.List}>
        <ul className={css.List_items}>
          {dataBookmarks.collections.map((collections) => {
            // data.collections[i]
            if (collections.name === selectedCollection) {
              return collections.topics.map((topics) => (
                // data.collections[i].topics[i]
                <li key={crypto.randomUUID()}>
                  <div className={css.Tree}>
                    <div className={css.Tree_header}>
                      <p className={css.Tree_title}>{topics.name}</p>
                      <p className={css.Tree_number}>{topics.lists.length}</p>
                    </div>
                    <ul className={css.Tree_list}>
                      {topics.lists.map((lists) => (
                        // data.collections[i].topics[i].lists[i]
                        <li key={crypto.randomUUID()}>
                          <div className={css.Tree_item} onClick={() => fnDoClick(lists.link)}>
                            <p className={css.Tree_item_text}>{lists.name}</p>
                            <span className={css.Tree_item_icon}>
                              <i className="material-symbols-outlined">chevron_right</i>
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ));
            }
          })}
        </ul>
      </div>
    </section>
  );
};
