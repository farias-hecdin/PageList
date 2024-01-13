import css from "./modalEdit.module.css";
import { ButtonBase, ButtonSelect, DetailsBase, ModalBase } from "../../../components/index.jsx";
import { useContext, useEffect, useState } from "react";
import { DataContext, StateContext } from "../../../context/index.jsx";
import * as M from "./modalEdit.script.js";

/**
 * @param {object} prop
 * @param {boolean} prop.isOpen
 * @param {Function} prop.handleClick
 * @returns {HTMLElement}
 */
export const mgRenameElements = ({ isOpen, handleClick }) => {
  const { dataCollection, dataFolder, $dataCollection, $dataFolder } = useContext(DataContext);
  const { dataBookmark, dataTopic, $dataBookmark, $dataTopic } = useContext(DataContext);
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
      root: null,
      parent: null,
      element: dataCollection,
      $element: $dataCollection,
    },
    topic: {
      root: null,
      parent: dataCollection,
      element: dataFolder,
      $element: $dataFolder,
    },
    list: {
      root: dataCollection,
      parent: dataFolder,
      element: dataTopic,
      $element: $dataTopic,
    },
    bookmark: {
      root: dataFolder,
      parent: dataTopic,
      element: dataBookmark,
      $element: $dataBookmark,
    },
  };
  const { parent, element, $element, root } = elementType[targetItem.type] || elementType.bookmark;

  // Parametros comunes para las funciones correspondientes
  const sharedParams = { pElement: targetItem.id, pData: element, pSetState: $element };
  const ToFuncDelete = { ...sharedParams };
  const ToFuncRelocate = { ...sharedParams, pSelector: "#select_LCAXUzHOdk" };
  const ToFuncUpdate = { ...sharedParams, pKeyword: targetItem.type, pValue: titleValue, pValue2: urlValue };

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
        <DeleteElem nameTag="details_hWkbC7Yfgd" targetItem={targetItem} sharedParams={sharedParams} />
        {targetItem.type !== "collection" && <MoveElem nameTag="details_hWkbC7Yfgd" />}
        <UpdateElem nameTag="details_hWkbC7Yfgd" />
      </div>
    </ModalBase>
  );
};

const DeleteElem = ({ nameTag, data, targetItem, sharedParams }) => {
  const { $openSection } = useContext(StateContext);

  return (
    <DetailsBase name={nameTag} title="Delete this element" icon={<IconifyDeleteForeverOutline />}>
      <div className={css.Container_details}>
        <p>Do you want delete this element?</p>
        <ButtonBase
          text="Delete"
          handleClick={() => {
            const theData = M.removeElementById(data);
            M.confirmAndUpdateStateAndStorageGroup(
              true,
              theData,
              targetItem.type,
              sharedParams.pSetState,
              targetItem.title
            );
            $openSection((prev) => ({ ...prev, editElem: !prev.editElem }));
          }}
        />
      </div>
    </DetailsBase>
  );
};
const MoveElem = ({ nameTag, root, parent }) => {
  return (
    <DetailsBase name={nameTag} title="Move this element" icon={<IconifyPanToolOutline />}>
      <div className={css.Container_details}>
        <p>Where would you like to move this element?</p>
        <ButtonSelect id="select_LCAXUzHOdk" styled="ModalEditMode_mojxs">
          {targetItem.type !== "topic" &&
            root.map((root) =>
              parent.map((parent) => {
                if (parent.parent === root.id) {
                  return (
                    <option key={crypto.randomUUID()} value={parent.id}>
                      {root.title + " - " + parent.title}
                    </option>
                  );
                }
              })
            )}
          {targetItem.type === "topic" &&
            parent.map((parent) => {
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
            const data = M.relocateElementAndUpdateState(ToFuncRelocate);
            M.confirmAndUpdateStateAndStorageGroup(false, data, targetItem.type, sharedParams.pSetState);
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
            const data = M.modifyElementAndUpdateState({ ...ToFuncUpdate, pEvent: e });
            M.confirmAndUpdateStateAndStorageGroup(false, data, targetItem.type, sharedParams.pSetState);
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
