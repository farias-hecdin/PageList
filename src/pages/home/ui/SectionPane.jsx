import css from "./SectionPane.module.css";
import { ButtonBase, WrapBase } from "../../../components/Index.jsx";
import { SectionCard, SectionCardItem, SectionModal } from "./SectionCard";

// BaseBox
const SectionPane = ({ pData, pTotal }) => {
  let data = pData;

  return (
    <section className={css.Container}>
      <SectionModal pShowModal={false} />
      <header className={css.Header}>
        <h2>Collections</h2>
        <div>
          <WrapBase styled="--fullWidth">
            <ButtonBase
              pText="Learning"
              pIcon="expand_circle_down"
              styled="ToolbarWrapButton"
            />
            <ButtonBase pIcon="edit" />
          </WrapBase>
          <ButtonBase pIcon="add" pText="New" />
        </div>
      </header>
      <div className={css.List}>
        <div className={css.List_header}>
          <p>{data.vault[0].vault_name}</p>
          <span>{pTotal} lists</span>
        </div>
        <ul className={css.List_items}>
          {data.vault[0].section.map((elem) => (
            <li key={elem.id}>
              <SectionCard
                pSectionName={elem.section_name}
                pSectionNameTotal={elem.id}
              >
                <ul className={css.List_subItems}>
                  <li>
                    <SectionCardItem pListName={elem.section_name} />
                  </li>
                  <li>
                    <SectionCardItem pListName={elem.section_name} />
                  </li>
                  <li>
                    <SectionCardItem pListName={elem.section_name} />
                  </li>
                </ul>
              </SectionCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SectionPane;
