import css from "./headerMain.module.css";
import { ButtonBase, WrapBase } from "../../components/index.jsx";
import { DataContext, StateContext } from "../../context/index.jsx";
import { useContext } from "react";

/**
 * @param {object} prop
 * @param {Function} prop.updatePage
 * @param {string} prop.pageName
 * @param {string} prop.changeTheme
 * @returns {HTMLElement}
 */
export const HeaderMain = ({ updatePage, pageName }) => {
  const { $dataBookmarks, $dataCollections, $dataLists, $dataTopics } = useContext(DataContext);
  const { $showPopup, $selectedItem } = useContext(StateContext);

  /**
   * Mostrar la pagina selecionada
   * @param {string} selectedPage - Nombre de la pagina
   */
  const showActivePage = (selectedPage) => {
    updatePage(selectedPage);
  };

  /** Carga la ultima seccion */
  const checkLatestSection = () => {
    const answer = confirm("Are you sure?");

    if (answer) {
      let storage = [
        { data: localStorage.getItem("pagelist_collections"), funcSet: $dataCollections },
        { data: localStorage.getItem("pagelist_topics"), funcSet: $dataTopics },
        { data: localStorage.getItem("pagelist_lists"), funcSet: $dataLists },
        { data: localStorage.getItem("pagelist_bookmarks"), funcSet: $dataBookmarks },
      ];
      let message = "";

      for (elem in storage) {
        if (typeof elem.data === "string") {
          message = "Load section";
          elem.funSet(JSON.parse(elem.data));
        } else {
          message = "No data";
        }
      }
      $selectedItem((prev) => ({ ...prev, collectionId: "0" }));
      $showPopup((prev) => ({ ...prev, show: true, message: message }));
    }
  };

  return (
    <header className={css.Container}>
      <AnLogo />
      <SearchBar />
      <nav className={css.Navbar}>
        <WrapBase>
          <ButtonBase
            styled={`Button_kbRsO ${pageName === "Home" ? "is-active" : "is-ghost"}`}
            icon={<IconifyBookmarkOutline />}
            text="Bookmarks"
            handleClick={() => showActivePage("Home")}
          />
          <ButtonBase
            styled={`Button_kbRsO ${pageName === "Backup" ? "is-active" : "is-ghost"}`}
            icon={<IconifySaveOutline />}
            text="Backup"
            handleClick={() => showActivePage("Backup")}
          />
        </WrapBase>
        <div className={css.Navbar_box}>
          <ButtonBase text="Load" icon={<IconifyUpdate />} handleClick={checkLatestSection} styled="is-outline" />
        </div>
      </nav>
    </header>
  );
};

const SearchBar = () => {
  const { dataBookmarks } = useContext(DataContext);
  const [searchTerm, $searchTerm] = useState("");
  const inputRef = useRef();

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = inputRef.current.value;
    $searchTerm(searchTerm);
  };

  /**
   * @param {Array<object>} data
   * @param {string} term
   */
  const filteredItems = (data, term) => {
    return !term ? [] : data.filter((elem) => elem.title.toLowerCase().includes(term.toLowerCase()));
  };

  return (
    <div className={css.Searchbar}>
      <form onSubmit={handleSearch} htmlFor="Wa1NCpukLL" className={css.Search}>
        <input id="Input_aGk4mDleYN" type="text" placeholder="Search bookmarks..." autoComplete="off" ref={inputRef} />
        <ButtonBase type="submit" icon={<IconifySearch />} />
      </form>
      <ul>
        {filteredItems(dataBookmarks, searchTerm).map((elem) => (
          <li key={elem.id} className={css.Searchbar_result}>
            <a href={elem.url} target="_blank" rel="noopener noreferrer">
              {elem.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AnLogo = () => {
  return (
    <div className={css.Logo}>
      <iconify-icon icon="tabler:bookmarks"></iconify-icon>
      <span className={css.Logo_title}>Pagelist</span>
    </div>
  );
};
