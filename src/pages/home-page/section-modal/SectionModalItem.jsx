import css from "./SectionModalItem.module.css";

const SectionCardItem = ({ pListName }) => {
  return (
    <div className={css.CardItem}>
      <span className={css.CardItem_title}>{pListName}</span>
      <span className={css.CardItem_icon}>
        <i className="material-symbols-outlined">chevron_right</i>
      </span>
    </div>
  );
};

export default SectionCardItem;
