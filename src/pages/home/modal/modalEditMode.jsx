import css from "./modalEditMode.module.css";
import { ButtonBase, ButtonSelect, DetailsBase, ModalBase } from "../../../components/index.jsx";
import { useContext, useState } from "react";
import { DataContext } from "../../../context/index.jsx";
import { deleteElementAndUpdateState, moveElementAndUpdateState, updateElementAndUpdateState } from "./modalEditMode.script.js";

/**
 * @param {object} prop
 * @param {boolean} prop.isOpen
 * @param {Function} prop.handleClick
 * @returns {HTMLElement}
 */
export const ModalEditMode = ({ isOpen, handleClick }) => {
  const { targetItem, dataLists, setDataLists, setDataBookmarks, dataBookmarks, dataTopics } = useContext(DataContext);
  const [titleValue, setTitleValue] = useState(null)
  const [urlValue, setUrlValue] = useState(null)
  console.log(urlValue)

  const typeElms = {
    list: {
      dataOrigin: dataTopics,
      dataFromElement: dataLists,
      setFromElement: setDataLists,
    },
    bookmark: {
      dataOrigin: dataLists,
      dataFromElement: dataBookmarks,
      setFromElement: setDataBookmarks,
    },
  };
  const { dataOrigin, dataFromElement, setFromElement } = typeElms[targetItem.type] || typeElms["bookmark"];

  const ToFuncDelete = {
    pElement: targetItem.id,
    pOrigin: targetItem.state,
    pUpdater: setFromElement,
  };
  const ToFuncMove = {
    pElement: targetItem.id,
    pOrigin: targetItem.state,
    pUpdater: setFromElement,
    pSelector: "#select_LCAXUzHOdk",
  };
  const ToFuncUpdate = {
    pElement: targetItem.id,
    pOrigin: targetItem.state,
    pUpdater: setFromElement,
    pType: targetItem.type,
    pSelector: "#input_EJ7aOOCCQI",
    pSelector2: "#input_P0Z5gb5BMg",
  };

  return (
    <ModalBase isOpen={isOpen} handleClick={handleClick}>
      <header className={css.Container_header}>
        <p className={css.Container_title}>Edit</p>
        <p className={css.Container_text}>
          What do you want to do with:
          <span className={css.Container_subtext}>{`"${targetItem.name}"`}</span>
        </p>
      </header>
      <div className={css.Container_box}>
        <DetailsBase title="Delete this element" icon="delete-forever-outline">
          <div className={css.Container_details}>
            <p>Do you want delete <b>{targetItem.name}</b></p>
            <ButtonBase text="Delete" handleClick={() => deleteElementAndUpdateState(ToFuncDelete)} />
          </div>
        </DetailsBase>
        {targetItem.type !== "collection" && targetItem.type !== "topic" && (
          <DetailsBase title="Move this element" icon="pan-tool-outline">
            <div className={css.Container_details}>
              <p>In which list would you like to move the bookmark?</p>
              <ButtonSelect id="select_LCAXUzHOdk" styled="ModalEditMode_mojxs">
                {dataOrigin.map((item) => (
                  <option key={crypto.randomUUID()} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </ButtonSelect>
              <ButtonBase text="Move" handleClick={() => moveElementAndUpdateState(ToFuncMove)} />
            </div>
          </DetailsBase>
        )}
        <DetailsBase title="Update this element" icon="title">
          {/* <div className={css.Container_details}> */}
          {/*   <input */}
          {/*     type="text" */}
          {/*     value={titleValue || targetItem.name} */}
          {/*     onChange={e => setTitleValue(e.target.value)} */}
          {/*     id="input_EJ7aOOCCQI" */}
          {/*   /> */}
          {/*   {targetItem.type === "bookmark" && */}
          {/*     <input */}
          {/*       type="text" */}
          {/*       value={urlValue || targetItem.url} */}
          {/*       onChange={e => setUrlValue(e.target.value)} */}
          {/*       id="input_P0Z5gb5BMg" */}
          {/*     /> */}
          {/*   } */}
          {/*   <ButtonBase */}
          {/*     text="Update" */}
          {/*     handleClick={() => updateElementAndUpdateState(ToFuncUpdate)} */}
          {/*   /> */}
          {/* </div> */}
        </DetailsBase>
      </div>
    </ModalBase>
  );
};
