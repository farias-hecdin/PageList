import css from "./App.module.css";
import { BackupPage } from "./backup/BackupPage";
import { HomePage } from "./home/HomePage";
import { useState } from "react";
import * as F from "$src/features/index.jsx";

export const App = () => {
  /** Mostrar la pagina activa */
  const [activePage, $activePage] = useState("Home");

  return (
    <div className={css.Container} data-theme>
      <F.PgHeaderMain pageName={activePage} updatePage={$activePage} />
      {/* <C.ModalGroup /> */}
      <main className={css.Container_box}>
        {activePage === "Home" && <HomePage />}
        {activePage === "Backup" && <BackupPage />}
      </main>
      <F.PgFooterMain />
    </div>
  );
};
