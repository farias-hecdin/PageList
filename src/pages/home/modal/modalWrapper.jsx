import { useContext, useEffect } from "react";
import { DataContext, StateContext } from "../../../context";
import { MessageFloat } from "../../../layout";
import { CollectionsModal } from "../collections/collectionsModal";
import { ModalAddBookmarks } from "./modalAddBookmarks";
import { ModalEditMode } from "./modalEditMode";

export const ModalWrapper = () => {
  const { showModal, setShowModal, showPopup, setShowPopup } = useContext(StateContext);
  const { setPinData } = useContext(DataContext);

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
      <CollectionsModal
        isOpen={showModal.collectionsPane}
        handleClick={() => setShowModal((prev) => ({ ...prev, collectionsPane: !prev.collectionsPane }))}
      />
      <ModalAddBookmarks
        isOpen={showModal.addBookmarks}
        handleClick={() => {
          setShowModal((prev) => ({ ...prev, addBookmarks: !prev.addBookmarks }));
          setPinData(false);
        }}
      />
      <ModalEditMode
        isOpen={showModal.editMode}
        handleClick={() => setShowModal((prev) => ({ ...prev, editMode: !prev.editMode }))}
      />
      {showPopup.show === true && <MessageFloat text={showPopup.message} />}
    </>
  );
};
