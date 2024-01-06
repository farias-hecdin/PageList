import css from "./TabBase.module.css";
import { Fragment } from "react";

export const TabBase = ({ pickTabs, funcSet, handleChange, tabs }) => {
  return (
    <div className={css.Tab}>
      {tabs.map((tab, index) => (
        <Fragment key={index}>
          <input
            type="radio"
            className={css.Tab_input}
            id={`tab_${index + 1}`}
            group="tabs"
            onChange={() => handleChange("value", tab.text, funcSet)}
            checked={pickTabs.value === tab.text}
          />
          <label htmlFor={`tab_${index + 1}`}>{tab.text}</label>
        </Fragment>
      ))}
    </div>
  );
};
