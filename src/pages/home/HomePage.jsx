import css from "./HomePage.module.css";
import SectionPane from "./ui/SectionPane.jsx";
import FavoritePane from "./ui/FavoritePane.jsx";
import db_bookmarks from "../../data/db_bookmarks.js";
import { useRef } from "react";

const data_bookmarks = db_bookmarks;

const HomePage = () => {
  const total = useRef(data_bookmarks.vault[0].id);

  return (
    <section className={css.Container}>
      <SectionPane pData={data_bookmarks} pTotal={total.current} />
      <FavoritePane />
    </section>
  );
};

export default HomePage;
