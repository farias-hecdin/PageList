import css from "./modalEdit.module.css";
import { ButtonBase, ButtonSelect, DetailsBase, ModalBase } from "$src/components/index.jsx";
import { useContext, useEffect, useState } from "react";
import { DataContext, StateContext } from "../../../context/index.jsx";
import * as M from "./modalEdit.script.js";

/**
 * @param {object} prop
 * @param {boolean} prop.isOpen
 * @param {Function} prop.handleClick
 * @returns {HTMLElement}
 */
export const mgManageElements = ({ isOpen, handleClick }) => {
  const { dataCollection, dataTopic, $dataCollection, $dataTopic } = useContext(DataContext);
  const { dataBookmark, dataList, $dataBookmark, $dataList } = useContext(DataContext);
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
      element: dataTopic,
      $element: $dataTopic,
    },
    list: {
      root: dataCollection,
      parent: dataTopic,
      element: dataList,
      $element: $dataList,
    },
    bookmark: {
      root: dataTopic,
      parent: dataList,
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
        <ManageDelete nameTag="details_hWkbC7Yfgd" targetItem={targetItem} sharedParams={sharedParams} />
        {targetItem.type !== "collection" && <ManageMove nameTag="details_hWkbC7Yfgd" />}
        <ManageRename nameTag="details_hWkbC7Yfgd" />
      </div>
    </ModalBase>
  );
};
