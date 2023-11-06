import css from "./sectionPane-modal.module.css";
import { DataContext, StateContext } from "../../../context/index.jsx";
import { ButtonBase, ModalBase } from "../../../components/index.jsx";
import { SectionPaneModalTile } from "./sectionPane-tile";
import { useContext, useState } from "react";
import { deleteThisElement } from "../../../utils/common";
import { HomePageModalEditMode } from "../homePage-modal-editMode";

export const SectionPaneModal = ({ pShowModal }) => {
  // Mostrar ventana de la lista de colecciones -------------------------------

  const { showCollectionModal, setShowCollectionModal } = useContext(StateContext);

  // Cierra la ventana modal
  const toggleModal = () => setShowCollectionModal(!showCollectionModal);

  // Selecionar una coleccion de marcadores -----------------------------------

  const {
    dataCollections,
    setDataCollections,
    dataTopics,
    selectedCollection,
    setSelectedCollection
  } = useContext(DataContext);

  /**
   * Comparar `descendent.originId` con `element.id` y retorna el numero de coincidencias.
   * @param {Array} pDescendentData ¿Datos de los elementos descendientes?
   * @param {string} pElementId ¿Id del elemento?
   * @returns {number}
   */
  const compareIdAndReturnNumberMatches = (pDescendentData, pElementId) => {
    let numberCoincidence = 0;
    for (const item of pDescendentData) {
      if (item.originId === pElementId) {
        numberCoincidence++;
      }
    }
    return numberCoincidence;
  };

  /**
   * Actualiza el estado `selectedCollection()` de acuerdo la coleccion selecionada.
   * @param {Array|string} pData
   */
  const selectCollection = (pData) => {
    try {
      // Actualizar el estado
      let elementNumbers = pData ? compareIdAndReturnNumberMatches(dataTopics, pData.id) : 0;
      let elementId = pData?.id || "None";
      let elementName = pData?.name || "None";

      setSelectedCollection(() => ({
        id: elementId,
        number: elementNumbers,
        name: elementName,
      }));

      // Cerrar la ventana modal
      toggleModal();
    } catch (error) {
      console.warn("SectionPaneModal > selectCollection:" + error.message);
    }
  };

  // Activar el modo edicion NEW:
  const [editMode, setEditMode] = useState(false);
  const enabledEditMode = () => setEditMode(!editMode);

  const [onModal, setOnModal] = useState(false);
  const [elementData, setElementData] = useState({ name: "", id: "", type: "" });

  /**
   * @param {object} pData ¿Datos del elemento?
   * @param {string} pType ¿Tipo de elemento (collection, topic, ...)?
   */
  const enterOnEditMode = (pData, pType) => {
    setOnModal(!onModal);
    setElementData({
      name: pData.name,
      id: pData.id,
      type: pType,
    });
  };

  return (
    <>
      <ModalBase pId="modal_pVWgBDgt4eY" pIsOpen={pShowModal}>
        <div className={css.Container_header}>
          <div>
            <p className={css.Container_title}>Collections</p>
            <p className={css.Container_text}>Choose a collection boorkmarks</p>
          </div>
          <ButtonBase pIcon="filter-list" />
        </div>
        <ul className={css.Container_list}>
          <li>
            <SectionPaneModalTile
              icon="note-stack-outline"
              text={"None"}
              styled={selectedCollection.id === "None" && "--active"}
              handleClick={() => selectCollection("None")}
            />
          </li>
          {Array.isArray(dataCollections)
            ? dataCollections.map((pCollection) => (
              <li key={crypto.randomUUID()}>
                <SectionPaneModalTile
                  icon="note-stack-outline"
                  text={pCollection.name}
                  styled={selectedCollection.id === pCollection.id && "--active"}
                  handleClick={() => selectCollection(pCollection)}
                  handleSecondClick={() => enterOnEditMode(pCollection, "collection")}
                  hasMenu={true}
                />
              </li>
            ))
            : console.warn("SectionPaneModal > rendering list (dataCollections)")}
        </ul>
      </ModalBase>
      <HomePageModalEditMode
        pShowModal={onModal}
        pDataElement={elementData}
        pDataSource={elementData.type ? [dataCollections, setDataCollections] : ""}
      />
    </>
  );
};
