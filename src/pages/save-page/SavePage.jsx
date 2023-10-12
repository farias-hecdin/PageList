import { useContext, useState } from 'react'
import { ButtonBase } from '../../components/Index'
import { BookmarksContext } from '../../context/bookmarks/bookmarksProvider'
import css from './SavePage.module.css'

export const SavePage = () => {
  const { BookmarksList } = useContext(BookmarksContext)

  // Importar datos -----------------------------------------------------------
  const funcImportBookmarksData = () => {
    let $fieldText = document.getElementById("textarea_dPGOLAD_13JMFLvIAC5FN")
    let importData = JSON.stringify(BookmarksList)

    $fieldText.value = importData
  }

  // Exportar datos y validar propiedades -------------------------------------
  const [showNotification, setShowNotification] = useState()
  const [showJsonError, setShowJsonError] = useState("")

  const funcExportBookmarksData = () => {
    let $fieldText = document.getElementById("textarea_dPGOLAD_13JMFLvIAC5FN")
    let exportData = $fieldText.value

    if (exportData === "") {
      setShowNotification("error")
      setShowJsonError("field empty")
    } else {
      let exportJSON = JSON.parse(exportData)
      if (exportJSON.collections === undefined) {
        setShowNotification("error")
        setShowJsonError("collections not found")
      } else {
        exportJSON = exportJSON.collections
        for (let i = 0; i < exportJSON.length; i++) {
          if (exportJSON[i].topics === undefined) {
            setShowNotification("error")
            setShowJsonError("topics not found")
            for (let i = 0; i < exportJSON.length; i++) {}
          } else {
            setShowNotification("ok")
            setShowJsonError("all is right")
          }
        }
      }
    }
  }

  return (
    <section className={css.SavePage}>
      <header className={css.SavePage_header}>
        <h2>Export / import</h2>
      </header>
      <div className={css.SavePage_frame}>
        <div className={css.Textarea_footer}>
          <ButtonBase pText="Import" pHandleClick={funcImportBookmarksData} />
          <ButtonBase pText="Export" pHandleClick={funcExportBookmarksData} />
        </div>
        {
          (showNotification === "error")
            ? (<AnNotification pText={`ERROR - ${showJsonError}`} />)
            : (showNotification === "ok")
              ? (<AnNotification pText={`Message - ${showJsonError}`} />)
              : null
        }
        <textarea className={css.Textarea} id="textarea_dPGOLAD_13JMFLvIAC5FN"></textarea>
      </div>
    </section>
  )
}

export const AnNotification = ({pText}) => {
  return (
    <p className={css.AnNotification}>{pText}</p>
  )
}
