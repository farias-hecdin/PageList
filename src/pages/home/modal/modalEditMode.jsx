import css from "./modalEditMode.module.css";
import { ButtonBase, ButtonSelect, DetailsBase, ModalBase } from "../../../components/index.jsx";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../context/index.jsx";
import {
  deleteElementAndUpdateState,
  moveElementAndUpdateState,
  updateElementAndUpdateState,
} from "./modalEditMode.script.js";

/**
 * @param {object} prop
 * @param {boolean} prop.isOpen
 * @param {Function} prop.handleClick
 * @returns {HTMLElement}
 */
export const ModalEditMode = ({ isOpen, handleClick }) => {
  const {dataCollections, dataTopics, setDataCollections, setDataTopics, dataBookmarks, dataLists, setDataBookmarks, setDataLists, targetItem} = useContext(DataContext);
  const [titleValue, setTitleValue] = useState("");
  const [urlValue, setUrlValue] = useState("");

  // Actualizar los imputs al selecionar un elemento
  useEffect(() => {
    setTitleValue(targetItem.title);
    setUrlValue(targetItem.url);
  }, [targetItem]);

  // Declarar los datos necesarios para cada tipo de elemento
  const elementType = {
    collection: {
      dataParent: null,
      dataElement: dataCollections,
      setElement: setDataCollections,
    },
    topic: {
      dataParent: dataCollections,
      dataElement: dataTopics,
      setElement: setDataTopics,
    },
    list: {
      dataParent: dataTopics,
      dataElement: dataLists,
      setElement: setDataLists,
    },
    bookmark: {
      dataParent: dataLists,
      dataElement: dataBookmarks,
      setElement: setDataBookmarks,
    },
  };
  const { dataParent, dataElement, setElement } = elementType[targetItem.type] || elementType["bookmark"];

  // Parametros comunes para las funciones correspondientes
  const sharedParams = {
    pElement: targetItem.id,
    pData: dataElement,
    pUpdater: setElement,
  };
  const ToFuncDelete = sharedParams;
  const ToFuncMove = {
    ...sharedParams,
    pSelector: "#select_LCAXUzHOdk",
  };
  const ToFuncUpdate = {
    ...sharedParams,
    pType: targetItem.type,
    pValue: titleValue,
    pValue2: urlValue,
  };

  return (
    <ModalBase isOpen={isOpen} handleClick={handleClick}>
      <header className={css.Container_header}>
        <p className={css.Container_title}>Edit</p>
        <p className={css.Container_text}>
          What do you want to do with:
          <span className={css.Container_subtext}>{`"${targetItem.title}"`}</span>
        </p>
      </header>
      <div className={css.Container_box}>
        <DetailsBase title="Delete this element" icon={<IconifyDeleteForeverOutline/>}>
          <div className={css.Container_details}>
            <p>
              Do you want delete <b>{targetItem.title}</b>
            </p>
            <ButtonBase text="Delete" handleClick={() => deleteElementAndUpdateState(ToFuncDelete)} />
          </div>
        </DetailsBase>
        {targetItem.type !== "collection" && targetItem.type !== "topic" && (
          <DetailsBase title="Move this element" icon={<IconifyPanToolOutline />}>
            <div className={css.Container_details}>
              <p>In which list would you like to move the bookmark?</p>
              <ButtonSelect id="select_LCAXUzHOdk" styled="ModalEditMode_mojxs">
                {dataParent.map((item) => (
                  <option key={crypto.randomUUID()} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </ButtonSelect>
              <ButtonBase text="Move" handleClick={() => moveElementAndUpdateState(ToFuncMove)} />
            </div>
          </DetailsBase>
        )}
        <DetailsBase title="Update this element" icon={<IconifyTitle/>}>
          <div className={css.Container_details}>
            <form onSubmit={(e) => updateElementAndUpdateState({ ...ToFuncUpdate, pEvent: e })}>
              <input
                type="text"
                value={titleValue}
                onChange={(e) => setTitleValue(e.currentTarget.value)}
                id="input_EJ7aOOCCQI"
              />
              {targetItem.type === "bookmark" && (
                <input
                  type="text"
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.currentTarget.value)}
                  id="input_P0Z5gb5BMg"
                />
              )}
              <ButtonBase text="Update" type="submit" />
            </form>
          </div>
        </DetailsBase>
      </div>
    </ModalBase>
  );
};
