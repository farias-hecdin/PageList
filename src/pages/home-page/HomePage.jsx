import css from "./HomePage.module.css";
import { BookmarksContext, StateContext } from "../../context/Index.jsx";
import { FavoritePane } from "./favorite-pane/FavoritePane.jsx";
import { HomePageTopbar } from "./HomePageTopbar";
import { SectionPane } from "./section-pane/SectionPane.jsx";
import { useContext } from "react";

export const HomePage = () => {
  const { idSelectedCollection, selectedCollection, dataSection } = useContext(BookmarksContext);

  // Mostrar ventana modal----------------------------------------------------
  const { showCollectionModal, setShowCollectionModal } = useContext(StateContext);

  const fnToggleModal = () => {
    setShowCollectionModal(!showCollectionModal);
  };

  return (
    <section className={css.HomePage}>
      <HomePageTopbar pSelectedCollection={selectedCollection} pToggleModal={fnToggleModal} />
      <div className={css.HomePage_frame}>
        <SectionPane pDataSection={dataSection} pSelectedCollection={[selectedCollection, idSelectedCollection]} />
        <FavoritePane />
      </div>
    </section>
  );
};
