import { useContext, useEffect } from "react";
import { StateContext } from "../../../context";
import { MessageFloat } from "../../../layout";
import { ModalAdd } from "./modalAdd";
import { ModalEdit } from "./modalEdit";

export const ModalWrapper = () => {
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
      {showPopup.show === true && <MessageFloat text={showPopup.message} />}
    </>
  );
};
