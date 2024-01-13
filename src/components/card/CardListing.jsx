import css from "./CardListing.module.css";
import * as C from "$src/components/index";

export const CardListing = ({ counter, handleClick, handleClick2, icon, styled, text, subtext }) => {
  return (
    <div className={`${css.Container} ${styled || ""}`}>
      <CardListingContent icon={icon} text={text} subtext={subtext} counter={counter} handleClick={handleClick} />
      {handleClick2 && (
        <C.ButtonBase icon={<IconifyMoreVert />} styled="is-ghost Button_tjNBzZfFxp" handleClick={handleClick2} />
      )}
    </div>
  );
};

export const CardListingContent = ({ icon, text, counter, handleClick, subtext }) => (
  <button className={css.Card} onClick={handleClick}>
    {icon}
    <div className={css.Card_box}>
      {text && <p className={css.Card_text}>{text}</p>}
      {subtext && <p className={css.Card_subtext}>{subtext}</p>}
      {counter >= 0 && <p className={css.Card_subtext}>{counter || 0} elements</p>}
    </div>
  </button>
);
