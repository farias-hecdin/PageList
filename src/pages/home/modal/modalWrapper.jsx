import { useContext } from "react";
import { StateContext } from "../../../context";
import { CollectionsModal } from "../collections/collectionsModal";
import { ModalAddBookmarks } from "./modalAddBookmarks";
import { ModalEditMode } from "./modalEditMode";

export const ModalWrapper = () => {
  const { openCollectionsModal, openModalAddBookmarks, openModalEditMode } = useContext(StateContext);

  return (
    <>
      <CollectionsModal showModal={openCollectionsModal} />
      <ModalAddBookmarks showModal={openModalAddBookmarks} />
      {/* <ModalEditMode showModal={openModalEditMode} /> */}
    </>
  );
};
