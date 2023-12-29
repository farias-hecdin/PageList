import { InputRadio } from "../index.jsx";
import css from "./tabsBase.module.css";

export const TabsBase = ({ pickTabs, funcSet, handleChange, tabs }) => {
  return (
    <div className={css.Tabs}>
      {tabs.map((tab, index) => (
        <InputRadio
          key={index}
          className={css.Tabs_input}
          id={`tab_${index + 1}`}
          group="tabs"
          text={tab.text}
          onChange={() => handleChange("value", tab.text, funcSet)}
          checked={pickTabs.value === tab.text}
        />
      ))}
    </div>
  );
};
