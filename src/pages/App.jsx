import css from "./App.module.css";
import { AppProvider } from "../context/app/AppProvider";
import { HeaderMain } from "../layout/Index.jsx";
import { HomePage } from "./home-page/HomePage.jsx";
import { SavePage } from "./save-page/SavePage.jsx";
import { useState } from "react";

export const App = () => {
  const [viewPage, setViewPage] = useState("home")

  return (
    <AppProvider>
      <div className={css.App}>
        <HeaderMain pViewPage={setViewPage} pView={viewPage} />
        <main className={css.App_frame}>
          {viewPage == "home" && <HomePage />}
          {viewPage == "save" && <SavePage />}
        </main>
      </div>
    </AppProvider>
  );
};
