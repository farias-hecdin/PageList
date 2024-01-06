import css from "./paneSide.module.css";
import { ButtonBase } from "../../../components/index.jsx";
import { StateContext } from "../../../context";
import { useContext } from "react";

export const PaneSide = ({ children, counter, title, showButton = true }) => {
  const { $selectedItem } = useContext(StateContext);

  return (
    <section className={css.Container}>
      <header className={css.Header}>
        <div className={css.Header_box}>
          <h2 className={css.Header_title}>{title}</h2>
          <p className={css.Header_text}>{counter} elements</p>
        </div>
        {showButton && (
          <PgeButtonBaseDeleteItem
            icon={<IconifyArrowBackIosNew />}
            handleClick={() => $selectedItem((prev) => ({ ...prev, collection: { id: "", name: "" } }))}
          />
        )}
      </header>
      {children}
    </section>
  );
};
