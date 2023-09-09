import css from "./SectionCard.module.css";
import { ButtonBase } from "../../../components/Index.jsx";

const SectionCard = ({ children, pSectionName, pSectionNameTotal }) => {
  return (
    <div className={css.Card}>
      <div className={css.Card_header}>
        <span className={css.Card_num}>{pSectionNameTotal}</span>
        <span className={css.Card_title}>{pSectionName}</span>
        <ButtonBase pIcon="edit" />
      </div>
      <div className={css.Card_list}>
        {children}
      </div>
    </div>
  );
};

const SectionCardItem = ({ pListName }) => {
  return (
    <div className={css.CardItem}>
      <span className={css.CardItem_title}>{pListName}</span>
      <span className={css.CardItem_icon}>
        <i className="material-symbols-outlined">chevron_right</i>
      </span>
    </div>
  )
}

export { SectionCard, SectionCardItem };
