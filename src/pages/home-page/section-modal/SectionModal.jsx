import css from "./SectionModal.module.css";
import { BookmarksContext, StateContext } from "../../../context/Index.jsx";
import { ButtonBase } from "../../../components/Index.jsx";
import { useContext } from "react";
import { useState } from "react";

export const SectionModal = () => {
  // Mostrar ventana modal ----------------------------------------------------
  const { showCollectionModal, setShowCollectionModal } = useContext(StateContext);

  // Selecionar una colecion --------------------------------------------------
  const { dataBookmarks, selectedCollection, setSelectedCollection, setCantidadDeTemas } = useContext(BookmarksContext);

  const fnSelectCollection = (event, name) => {
    setSelectedCollection(() => name);
    let cantidad = obtenerCantidadTotalTemas(event)

    setCantidadDeTemas(cantidad)
  };

  // Contador del total --------------------------------------------------
  const [contadorTemas, setContadorTemas] = useState()

  const obtenerCantidadTotalTemas = (event) => {
    let idElementoSeleccionado = event.currentTarget.dataset.id
    let datosColeccion = dataBookmarks.collections
    let numeroDeTemas = 0

    for (let i = 0; i < datosColeccion.length; i++) {
      if (datosColeccion[i].name === idElementoSeleccionado) {
        numeroDeTemas = datosColeccion[i].topics.length
      }
    }
    return numeroDeTemas
  }

  return (
    <>
      {showCollectionModal && (
        <aside className={css.Modal}>
          <div className={css.Container}>
            <p className={css.Container_text}>Choose a collection</p>
            <ul className={css.Container_list}>
              <li key={crypto.randomUUID()}>
                <SectionModalCard pText={"Empty"}
                  pStyled={null === selectedCollection && "--active"}
                  pHandleClick={() => fnSelectCollection(null)} />
              </li>
              {dataBookmarks.collections.map((collections) => (
                <li key={crypto.randomUUID()}>
                  <SectionModalCard pText={collections.name}
                    pId={collections.name}
                    pStyled={collections.name === selectedCollection && "--active"}
                    pHandleClick={(e) => fnSelectCollection(e, collections.name)}
                  />
                </li>
              ))}
            </ul>
            <footer className={css.Container_footer}>
              <ButtonBase pText="Cancel"
                pHandleClick={() => setShowCollectionModal(!showCollectionModal)}
              />
            </footer>
          </div>
        </aside>
      )}
    </>
  );
};

export const SectionModalCard = ({ pHandleClick, pText, pStyled, pId }) => {
  return (
    <div className={`${css.Card} ${pStyled || null}`} onClick={pHandleClick} data-id={pId}>
      <p className={css.Card_text}>{pText}</p>
    </div>
  )
}
