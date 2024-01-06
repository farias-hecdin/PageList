import css from "./CardListing.module.css";
import * as U from "$src/components/_ui/index";

export const CardListing = ({ counter, handleClick, handleClick2, icon, styled, text }) => {
  return (
    <div className={`${css.Container} ${styled || ""}`}>
      <CardListingContent icon={icon} text={text} counter={counter} handleClick={handleClick} />
      {handleClick2 && (
        <U.ButtonBase icon={<IconifyMoreVert />} styled="is-ghost Button_WQkiS" handleClick={handleClick2} />
      )}
    </div>
  );
};

const CardListingContent = ({ icon, text, counter, handleClick }) => (
  <button className={css.Card} onClick={handleClick}>
    {icon}
    <div className={css.Card_box}>
      <p className={css.Card_text}>{text}</p>
      {counter >= 0 && <p className={css.Card_subtext}>{counter || 0} elements</p>}
    </div>
  </button>
);
