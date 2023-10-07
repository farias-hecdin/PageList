import css from "./SectionPaneCard.module.css";
import { ButtonBase } from "../../../components/Index.jsx";

const SectionPaneCard = ({ pSectionName, pSectionTotal, pListData, pListShow }) => {
  const data = pListData || null;

  return (
    <div className={css.Card}>
      <div className={css.Header}>
        <span className={css.Header_num}>{pSectionTotal}</span>
        <span className={css.Header_title}>{pSectionName}</span>
      </div>
      {pListShow && (
        <ul className={css.Card_list}>
          {data.map((elem) => (
            <li key={elem.id}>
              <div className={css.Item}>
                <span className={css.Item_title}>{elem.listName}</span>
                <span className={css.Item_icon}>
                  <i className="material-symbols-outlined">chevron_right</i>
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SectionPaneCard;
