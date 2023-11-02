import css from "./App.module.css";
import { HeaderMain } from "../layout/Index.jsx";
import { HomePage } from "./home-page/HomePage.jsx";
import { SavePage } from "./save-page/SavePage.jsx";
import { useState } from "react";

export const App = () => {
  // Mostrar la pagina activa
  const [activePage, setActivePage] = useState("home");
  return (
    <div className={css.Container}>
      <HeaderMain pPageName={activePage} pChangePage={setActivePage} />
      <main className={css.Container_box}>
        {activePage === "home" && <HomePage />}
        {activePage === "manage" && <SavePage />}
      </main>
    </div>
  );
};
