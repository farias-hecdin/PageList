import { useState } from "react";
import css from "./SectionPaneCard.module.css";

const SectionPaneCard = ({ pName, pTitle }) => {
  return (
    <div className={css.Card}>
      <div className={css.Header}>
        <span className={css.Header_num}></span>
        <span className={css.Header_title}>{pName}</span>
      </div>
      <li>
        <div className={css.Item}>
          <span className={css.Item_title}>{pTitle}</span>
          <span className={css.Item_icon}>
            <i className="material-symbols-outlined">chevron_right</i>
          </span>
        </div>
      </li>
    </div>
  );
};

export default SectionPaneCard;
