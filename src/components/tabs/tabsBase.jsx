import { InputRadio } from "../input/InputRadio";
import css from "./tabsBase.module.css";

export const TabsBase = ({ pickTabs, setPickTabs, handleChange, tabs }) => {
  return (
    <div key={crypto.randomUUID()} className={css.Tabs}>
      {tabs.map((tab, index) => (
        <InputRadio
          key={index}
          className={css.Tabs_input}
          id={`tab_${index + 1}`}
          group="tabs"
          text={tab.text}
          onChange={() => handleChange("value", tab.text, setPickTabs)}
          checked={pickTabs.value === tab.text}
        />
      ))}
    </div>
  );
};
