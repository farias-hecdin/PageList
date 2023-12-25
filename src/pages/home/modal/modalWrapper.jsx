import { useContext, useEffect } from "react";
import { StateContext } from "../../../context";
import { MessageFloat } from "../../../layout";
import { ModalAdd } from "./modalAdd";
import { ModalEdit } from "./modalEdit";

export const ModalWrapper = () => {
  const { showModal, $showModal, showPopup, $showPopup, $pinData } = useContext(StateContext);

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
      {/* <CollectionsModal */}
      {/*   isOpen={showModal.collectionsPane} */}
      {/*   handleClick={() => $ShowModal((prev) => ({ ...prev, collectionsPane: !prev.collectionsPane }))} */}
      {/* /> */}
      <ModalAdd
        isOpen={showModal.addBookmarks}
        handleClick={() => {
          $showModal((prev) => ({ ...prev, addBookmarks: !prev.addBookmarks }));
          $pinData(false);
        }}
      />
      <ModalEdit isOpen={showModal.editMode} handleClick={() => $showModal((prev) => ({ ...prev, editMode: !prev.editMode }))} />
      {showPopup.show === true && <MessageFloat text={showPopup.message} />}
    </>
  );
};
