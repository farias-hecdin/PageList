import css from "./app.module.css";
import { useState } from "react";
import { PgFooterMain } from "$src/features/pg-layoutPage/pgFooterMain";

export const App = () => {
  /** Mostrar la pagina activa */
  const [activePage, $activePage] = useState("Home");

  return (
    <div className={css.Container} data-theme>
      <PgHe pageName={activePage} updatePage={$activePage} />
      {/* <C.ModalGroup /> */}
      <main className={css.Container_box}>
        {/* {activePage === "Home" && <HomePage />} */}
        {/* {activePage === "Backup" && <BackupPage />} */}
      </main>
      <PgFooterMain />
    </div>
  );
};
