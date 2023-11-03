import css from "./favoritePane.module.css";
import { ButtonBase } from "../../../components/index.jsx";
import { DataContext } from "../../../context/index.jsx";
import { EmptyState } from "../../../layout/index";
import { FavoritePaneCard } from "./favoritePane-card.jsx";
import { deleteThisElement } from "../../../utils/common";
import { useContext, useState } from "react";

export const FavoritePane = () => {
  const { drawerLinks, selectedList } = useContext(DataContext);

  // Activar el modo edicion
  const [editMode, setEditMode] = useState(false);
  const enabledEditMode = () => setEditMode(!editMode);

  return (
    <section className={css.Container}>
      {1 === 0 ? (
        <EmptyState pIcon="info-outline" pTitle="Nothing here" pText="Choose a list to access your favorite links." />
      ) : (
        <>
          <header className={css.Header}>
            <div>
              <h2 className={css.Header_title}>{selectedList.state.name}</h2>
              <p className={css.Header_text}>{selectedList.state.id} bookmarks</p>
            </div>
            <ButtonBase pIcon="edit" pHandleClick={enabledEditMode} />
          </header>
          <ul className={css.List}>
            {drawerLinks.state.map((itemLinks) => {
              if (itemLinks.originId === selectedList.state.id)
                return (
                  <li key={crypto.randomUUID()}>
                    <FavoritePaneCard pTitle={itemLinks.title} pUrl={itemLinks.url} />
                    {editMode && (
                      <ButtonBase
                        pIcon="delete-outline"
                        pHandleClick={() => deleteThisElement(itemLinks.id, drawerLinks)}
                      />
                    )}
                  </li>
                );
            })}
          </ul>
        </>
      )}
    </section>
  );
};
