import { useContext, useEffect } from "react";
import { DataContext, StateContext } from "../../../context";
import { MessageFloat } from "../../../layout";
import { CollectionsModal } from "../collections/collectionsModal";
import { ModalAddBookmarks } from "./modalAddBookmarks";
import { ModalEditMode } from "./modalEditMode";

export const ModalWrapper = () => {
  const { showModal, $showModal, showPopup, $showPopup } = useContext(StateContext);
  const { $pinData } = useContext(DataContext);

  // Esconder mensaje de notificacion al ser activado
  useEffect(() => {
    if (showPopup.show === true) {
      setTimeout(() => {
        $showPopup((prev) => ({ ...prev, show: false, message: "" }));
      }, 3000);
    }
  }, [showPopup]);

  return (
    <>
      <CollectionsModal
        isOpen={showModal.collectionsPane}
        handleClick={() => $showModal((prev) => ({ ...prev, collectionsPane: !prev.collectionsPane }))}
      />
      <ModalAddBookmarks
        isOpen={showModal.addBookmarks}
        handleClick={() => {
          $showModal((prev) => ({ ...prev, addBookmarks: !prev.addBookmarks }));
          $pinData(false);
        }}
      />
      <ModalEditMode
        isOpen={showModal.editMode}
        handleClick={() => $showModal((prev) => ({ ...prev, editMode: !prev.editMode }))}
      />
      {showPopup.show === true && <MessageFloat text={showPopup.message} />}
    </>
  );
};
