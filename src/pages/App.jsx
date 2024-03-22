import css from "./App.module.css";
import { useState } from "react";
import * as F from "$src/features/index.jsx";
import * as P from "$src/pages/index";

export const App = () => {
  /** Mostrar la pagina activa */
  const [activePage, $activePage] = useState("Home");

  return (
    <div className={css.Container} data-theme>
      <F.PgHeaderMain pageName={activePage} updatePage={$activePage} />
      {/* <C.ModalGroup /> */}
      <main className={css.Container_box}>
        {activePage === "Home" && <P.HomePage />}
        {activePage === "Backup" && <P.BackupPage />}
      </main>
      <F.PgFooterMain />
    </div>
  );
};
