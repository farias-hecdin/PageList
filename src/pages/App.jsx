import css from "./App.module.css";
import { AppProvider } from "../context/app/AppProvider";
import { HeaderMain } from "../layout/Index.jsx";
import { HomePage } from "./home-page/HomePage.jsx";

export const App = () => {
  return (
    <AppProvider>
      <div className={css.App}>
        <HeaderMain />
        <main className={css.App_frame}>
          <HomePage />
        </main>
      </div>
    </AppProvider>
  );
};
