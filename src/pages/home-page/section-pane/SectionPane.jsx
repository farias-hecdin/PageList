import css from "./SectionPane.module.css";
import { ButtonBase } from "../../../components/Index.jsx";
import SectionPaneCard from "./SectionPaneCard";
import { SectionModal } from "../section-modal/SectionModal";
import { useState } from "react";

export const SectionPane = ({ pDataSection, pSelectedCollection }) => {
  const [selectedCollection, idSelectedCollection] = pSelectedCollection

  // Contador de secciones ----------------------------------------------------
  const counterElements = (value) => {
    let amount = 0
    value.map(elem => {
      if (elem.parent == idSelectedCollection) {amount += 1}
    })
    return amount
  }

  return (
    <section className={css.Container}>
      <SectionModal />
      <header className={css.Header}>
        <div>
          <h2 className={css.Header_title}>{selectedCollection}</h2>
          <p className={css.Header_text}>{counterElements(pDataSection)} Lists</p>
        </div>
        <ButtonBase pIcon="edit" />
      </header>
      <div className={css.List}>
        <ul className={css.List_items}>
          {pDataSection.map((elem) => {
            if (elem.parent == idSelectedCollection) {
              return (
                <li key={crypto.randomUUID()}>
                  <SectionPaneCard pSectionName={elem.name} pListShow={false} />
                </li>
              );
            }
          })}
        </ul>
      </div>
    </section>
  );
};
