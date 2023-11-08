import { useContext } from "react";
import { ButtonBase } from "../../../components";
import { StateContext } from "../../../context";
import css from "./bookmarksCard.module.css";

/**
 * @param {object} prop
 * @param {string} prop.title
 * @param {string} prop.url
 * @returns {HTMLElement}
 */
export const BookmarksCard = ({ title, url }) => {
  const { openModalEditMode, setOpenModalEditMode } = useContext(StateContext);
  let titleLinks = title;

  /**
   * Obtener las primeras dos letras de un titulo
   * @param {string} pText
   * @returns {string}
   */
  const funcGetFirstTwoLettersText = (pText) => pText.slice(0, 2);

  /**
   * Convertir en mayuscula un titulo
   * @param {string} pText
   * @returns {string}
   */
  const funcToUppperCase = (pText) => pText.toUpperCase();

  titleLinks = funcGetFirstTwoLettersText(titleLinks);
  titleLinks = funcToUppperCase(titleLinks);

  return (
    <article className={css.Card}>
      <p className={css.Card_thumb}>{titleLinks}</p>
      <p className={css.Card_content}>
        <a className={css.Card_title} href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
        <span className={css.Card_text}>{url}</span>
      </p>
      <ButtonBase
        icon="more-vert"
        styled="--ghost TopicsPane_WQkiS"
        handleClick={() => setOpenModalEditMode(!openModalEditMode)}
      />
    </article>
  );
};
