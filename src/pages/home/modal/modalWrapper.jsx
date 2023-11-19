import { useContext } from "react";
import { StateContext } from "../../../context";
import { CollectionsModal } from "../collections/collectionsModal";
import { ModalAddBookmarks } from "./modalAddBookmarks";
import { ModalEditMode } from "./modalEditMode";

export const ModalWrapper = () => {
  const {
    openCollectionsModal,
    setOpenCollectionsModal,
    openModalAddBookmarks,
    setOpenModalAddBookmarks,
    openModalEditMode,
    setOpenModalEditMode,
  } = useContext(StateContext);

  return (
    <>
      <CollectionsModal
        isOpen={openCollectionsModal}
        handleClick={() => setOpenCollectionsModal(!openCollectionsModal)}
      />
      <ModalAddBookmarks
        isOpen={openModalAddBookmarks}
        handleClick={() => setOpenModalAddBookmarks(!openModalAddBookmarks)}
      />
      <ModalEditMode
        isOpen={openModalEditMode}
        handleClick={() => setOpenModalEditMode(!openModalEditMode)}
      />
    </>
  );
};
