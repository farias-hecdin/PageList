import css from "./App.module.css";
import { HeaderMain } from "../layout/Index.jsx";
import { HomePage } from "./home-page/HomePage.jsx";
import { SavePage } from "./save-page/SavePage.jsx";
import { useState } from "react";

export const App = () => {
  // Mostrar la pagina activa
  const [activePage, setActivePage] = useState("home");

  return (
    <div className={css.App}>
      <HeaderMain pPageName={activePage} pUpdatePage={setActivePage} />
      <main className={css.App_frame}>
        {activePage === "home" && <HomePage />}
        {activePage === "save" && <SavePage />}
      </main>
    </div>
  );
};
