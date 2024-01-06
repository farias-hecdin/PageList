import css from "./FieldSearch.module.css";
import * as U from "../index.jsx";

export const SearchItems = ({ data, placeholder }) => {
  /**
   * @param {Array} data
   * @param {string} term
   */
  const filteredItems = (data, term) => {
    return !term ? [] : data.filter((elem) => elem.title.toLowerCase().includes(term.toLowerCase()));
  };

  // Capturar un termino de busqueda
  const [searchTerm, $searchTerm] = useState("");
  const inputRef = useRef();

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = inputRef.current.value;
    $searchTerm(searchTerm);
  };

  return (
    <div className={css.Field}>
      <form onSubmit={handleSearch} className={css.Field_form}>
        <input type="text" placeholder={placeholder} autoComplete="off" ref={inputRef} />
        <U.ButtonBase type="submit" icon={<IconifySearch />} />
      </form>
      <ul className={css.Field_results}>
        {filteredItems(data, searchTerm).map((elem) => (
          <li key={elem.id} className={css.Field_items}>
            <a href={elem.url} target="_blank" rel="noopener noreferrer">
              {elem.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
