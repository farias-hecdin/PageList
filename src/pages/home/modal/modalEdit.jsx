import css from "./modalEdit.module.css";
import { ButtonBase, ButtonSelect, DetailsBase, ModalBase } from "../../../components/index.jsx";
import { useContext, useEffect, useState } from "react";
import { DataContext, StateContext } from "../../../context/index.jsx";
import {
  removeElementById,
  relocateElementAndUpdateState,
  modifyElementAndUpdateState,
  confirmAndUpdateStateAndStorageGroup,
} from "./modalEdit.script.js";

/**
 * @param {object} prop
 * @param {boolean} prop.isOpen
 * @param {Function} prop.handleClick
 * @returns {HTMLElement}
 */
export const ModalEdit = ({ isOpen, handleClick }) => {
  const {
    dataCollections,
    dataTopics,
    setDataCollections,
    setDataTopics,
    dataBookmarks,
    dataLists,
    setDataBookmarks,
    setDataLists,
    targetItem,
  } = useContext(DataContext);
  const { setShowModal } = useContext(StateContext);

  // Alamacenar el Title y Url de un elemento
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
      dataMajor: null,
      dataParent: null,
      dataElement: dataCollections,
      setElement: setDataCollections,
    },
    topic: {
      dataMajor: null,
      dataParent: dataCollections,
      dataElement: dataTopics,
      setElement: setDataTopics,
    },
    list: {
      dataMajor: dataCollections,
      dataParent: dataTopics,
      dataElement: dataLists,
      setElement: setDataLists,
    },
    bookmark: {
      dataMajor: dataTopics,
      dataParent: dataLists,
      dataElement: dataBookmarks,
      setElement: setDataBookmarks,
    },
  };
  const { dataParent, dataElement, setElement, dataMajor } = elementType[targetItem.type] || elementType["bookmark"];

  // Parametros comunes para las funciones correspondientes
  const sharedParams = {
    pElement: targetItem.id,
    pData: dataElement,
    pSetState: setElement,
  };
  const ToFuncDelete = {
    ...sharedParams,
  };
  const ToFuncRelocate = {
    ...sharedParams,
    pSelector: "#select_LCAXUzHOdk",
  };
  const ToFuncUpdate = {
    ...sharedParams,
    pKeyword: targetItem.type,
    pValue: titleValue,
    pValue2: urlValue,
  };

  return (
    <ModalBase isOpen={isOpen} handleClick={handleClick}>
      <header className={css.Header}>
        <p className={css.Header_title}>Edit</p>
        <p className={css.Header_text}>
          What do you want to do with:
          <span className={css.Header_subtext}>{`"${targetItem.title}"`}</span>
        </p>
      </header>
      <div className={css.Container}>
        <DetailsBase name="gFOSr" title="Delete this element" icon={<IconifyDeleteForeverOutline />}>
          <div className={css.Container_details}>
            <p>Do you want delete this element?</p>
            <ButtonBase
              text="Delete"
              icon={<IconifyDone />}
              handleClick={() => {
                const data = removeElementById(ToFuncDelete);
                confirmAndUpdateStateAndStorageGroup(
                  true,
                  data,
                  targetItem.type,
                  sharedParams.pSetState,
                  targetItem.title
                );
                setShowModal((prev) => ({ ...prev, editMode: !prev.editMode }));
              }}
            />
          </div>
        </DetailsBase>
        {targetItem.type !== "collection" && (
          <DetailsBase name="gFOSr" title="Move this element" icon={<IconifyPanToolOutline />}>
            <div className={css.Container_details}>
              <p>Where would you like to move this element?</p>
              <ButtonSelect id="select_LCAXUzHOdk" styled="ModalEditMode_mojxs">
                {targetItem.type !== "topic" &&
                  dataMajor.map((major) =>
                    dataParent.map((parent) => {
                      if (parent.parent === major.id) {
                        return (
                          <option key={crypto.randomUUID()} value={parent.id}>
                            {major.title + " - " + parent.title}
                          </option>
                        );
                      }
                    })
                  )}
                {targetItem.type === "topic" &&
                  dataParent.map((parent) => {
                    return (
                      <option key={crypto.randomUUID()} value={parent.id}>
                        {parent.title}
                      </option>
                    );
                  })}
              </ButtonSelect>
              <ButtonBase
                text="Move"
                icon={<IconifyDone />}
                handleClick={() => {
                  const data = relocateElementAndUpdateState(ToFuncRelocate);
                  confirmAndUpdateStateAndStorageGroup(false, data, targetItem.type, sharedParams.pSetState);
                  setShowModal((prev) => ({ ...prev, editMode: !prev.editMode }));
                }}
              />
            </div>
          </DetailsBase>
        )}
        <DetailsBase name="gFOSr" title="Update this element" icon={<IconifyTitle />}>
          <div className={css.Container_details}>
            <form
              onSubmit={(e) => {
                const data = modifyElementAndUpdateState({ ...ToFuncUpdate, pEvent: e });
                confirmAndUpdateStateAndStorageGroup(false, data, targetItem.type, sharedParams.pSetState);
              }}
            >
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
              <ButtonBase text="Update" icon={<IconifyDone />} type="submit" />
            </form>
          </div>
        </DetailsBase>
      </div>
    </ModalBase>
  );
};
