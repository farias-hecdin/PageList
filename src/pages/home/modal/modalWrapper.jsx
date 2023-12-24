import { useContext, useEffect } from "react";
import { DataContext, StateContext } from "../../../context";
import { MessageFloat } from "../../../layout";
import { ModalAdd } from "./modalAdd";
import { ModalEdit } from "./modalEdit";

export const ModalWrapper = () => {
  const { showModal, setShowModal, showPopup, setShowPopup } = useContext(StateContext);
  const { setPinData } = useContext(ReferenceContext);

  // Esconder mensaje de notificacion al ser activado
  useEffect(() => {
    if (showPopup.show === true) {
      setTimeout(() => {
        setShowPopup((prev) => ({ ...prev, show: false, message: "" }));
      }, 3000);
    }
  }, [showPopup]);

  return (
    <>
      {/* <CollectionsModal */}
      {/*   isOpen={showModal.collectionsPane} */}
      {/*   handleClick={() => setShowModal((prev) => ({ ...prev, collectionsPane: !prev.collectionsPane }))} */}
      {/* /> */}
      <ModalAdd
        isOpen={showModal.addBookmarks}
        handleClick={() => {
          setShowModal((prev) => ({ ...prev, addBookmarks: !prev.addBookmarks }));
          setPinData(false);
        }}
      />
      <ModalEdit
        isOpen={showModal.editMode}
        handleClick={() => setShowModal((prev) => ({ ...prev, editMode: !prev.editMode }))}
      />
      {showPopup.show === true && <MessageFloat text={showPopup.message} />}
    </>
  );
};
