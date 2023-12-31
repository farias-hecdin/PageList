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
    $dataCollections,
    $dataTopics,
    dataBookmarks,
    dataLists,
    $dataBookmarks,
    $dataLists,
  } = useContext(DataContext);
  const { targetItem, $openSection } = useContext(StateContext);

  // Alamacenar el Title y Url de un elemento
  const [titleValue, $titleValue] = useState("");
  const [urlValue, $urlValue] = useState("");

  // Actualizar los imputs al selecionar un elemento
  useEffect(() => {
    $titleValue(targetItem.title);
    $urlValue(targetItem.url);
  }, [targetItem]);

  // Declarar los datos necesarios para cada tipo de elemento
  const elementType = {
    collection: {
      dataMajor: null,
      dataParent: null,
      dataElement: dataCollections,
      $element: $dataCollections,
    },
    topic: {
      dataMajor: null,
      dataParent: dataCollections,
      dataElement: dataTopics,
      $element: $dataTopics,
    },
    list: {
      dataMajor: dataCollections,
      dataParent: dataTopics,
      dataElement: dataLists,
      $element: $dataLists,
    },
    bookmark: {
      dataMajor: dataTopics,
      dataParent: dataLists,
      dataElement: dataBookmarks,
      $element: $dataBookmarks,
    },
  };
  const { dataParent, dataElement, $element, dataMajor } = elementType[targetItem.type] || elementType["bookmark"];

  // Parametros comunes para las funciones correspondientes
  const sharedParams = {
    pElement: targetItem.id,
    pData: dataElement,
    pSetState: $element,
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
        <DeleteElem nameTag="details_hWkbC7Yfgd" />
        {targetItem.type !== "collection" && <MoveElem nameTag="details_hWkbC7Yfgd" />}
        <UpdateElem nameTag="details_hWkbC7Yfgd" />
      </div>
    </ModalBase>
  );
};

const DeleteElem = ({ nameTag, data }) => {
  return (
    <DetailsBase name={nameTag} title="Delete this element" icon={<IconifyDeleteForeverOutline />}>
      <div className={css.Container_details}>
        <p>Do you want delete this element?</p>
        <ButtonBase
          text="Delete"
          handleClick={() => {
            const data = removeElementById(data);
            confirmAndUpdateStateAndStorageGroup(true, data, targetItem.type, sharedParams.pSetState, targetItem.title);
            $openSection((prev) => ({ ...prev, editElem: !prev.editElem }));
          }}
        />
      </div>
    </DetailsBase>
  );
};
const MoveElem = ({ nameTag }) => {
  return (
    <DetailsBase name={nameTag} title="Move this element" icon={<IconifyPanToolOutline />}>
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
          handleClick={() => {
            const data = relocateElementAndUpdateState(ToFuncRelocate);
            confirmAndUpdateStateAndStorageGroup(false, data, targetItem.type, sharedParams.pSetState);
            $openSection((prev) => ({ ...prev, editElem: !prev.editElem }));
          }}
        />
      </div>
    </DetailsBase>
  );
};

const UpdateElem = ({ nameTag }) => {
  return (
    <DetailsBase name={nameTag} title="Update this element" icon={<IconifyTitle />}>
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
            onChange={(e) => $titleValue(e.currentTarget.value)}
            id="input_EJ7aOOCCQI"
          />
          {targetItem.type === "bookmark" && (
            <input
              type="text"
              value={urlValue}
              onChange={(e) => $urlValue(e.currentTarget.value)}
              id="input_P0Z5gb5BMg"
            />
          )}
          <ButtonBase text="Update" type="submit" />
        </form>
      </div>
    </DetailsBase>
  );
};
