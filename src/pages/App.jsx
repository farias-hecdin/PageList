import css from "./App.module.css";
import { TheHeader } from "../layout/Index.jsx";
import HomePage from "./home/HomePage.jsx";

const App = () => {
  return (
    <div className={css.Container}>
      <TheHeader />
      <main className={css.Container_box}>
        <HomePage />
      </main>
    </div>
  );
};

export default App;
