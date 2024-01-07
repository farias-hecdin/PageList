import css from "./App.module.css";
import { BackupPage } from "./backup/BackupPage";
import { HomePage } from "./home/HomePage";
import { PgFooterMain } from "$src/features/pg-layoutPage/PgFooterMain";
import { PgHeaderMain } from "$src/features/pg-layoutPage/pgHeader/PgHeaderMain";
import { useState } from "react";

export const App = () => {
  /** Mostrar la pagina activa */
  const [activePage, $activePage] = useState("Home");

  return (
    <div className={css.Container} data-theme>
      <PgHeaderMain pageName={activePage} updatePage={$activePage} />
      {/* <C.ModalGroup /> */}
      <main className={css.Container_box}>
        {activePage === "Home" && <HomePage />}
        {activePage === "Backup" && <BackupPage />}
      </main>
      <PgFooterMain />
    </div>
  );
};
