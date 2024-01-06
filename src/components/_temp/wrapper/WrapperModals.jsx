import { useContext, useEffect } from "react";
import { StateContext } from "../../../context";
import { AlertFloat } from "../../../layout";
import { ModalAdd } from "./modalAdd";
import { ModalEdit } from "../modalEdit/modalEdit.jsx";

export const WrapperModals = () => {
  const { openSection, $openSection, showPopup, $showPopup, $pinData } = useContext(StateContext);

  // Esconder mensaje de notificacion al ser activado
  useEffect(() => {
    if (showPopup.show) {
      setTimeout(() => {
        $showPopup((prev) => ({ ...prev, show: false, message: "" }));
      }, 3000);
    }
  }, [showPopup]);

  return (
    <>
      <ModalBase isOpen={isOpen} handleClick={handleClick}>
        <AddElements />
      </ModalBase>
      <ModalAdd
        isOpen={openSection.addElem}
        handleClick={() => {
          $openSection((prev) => ({ ...prev, addElem: !prev.addElem }));
          $pinData(false);
        }}
      />

      <ModalEdit
        isOpen={openSection.editElem}
        handleClick={() => $openSection((prev) => ({ ...prev, editElem: !prev.editElem }))}
      />
      {showPopup.show === true && <AlertFloat text={showPopup.message} />}
    </>
  );
};
