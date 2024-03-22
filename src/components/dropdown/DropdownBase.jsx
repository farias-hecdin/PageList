import css from "./DropdownBase.module.css";

export const DropdownBase = ({ listing, heading }) => {
  return (
    <ul className={css.Dropdown}>
      {heading}
      <ul className={css.Dropdown_list}>
        {/* {listing.map((elem, index) => ( */}
        {/*   <li key={index}> */}
        {/*     {elem} */}
        {/*   </li> */}
        {/* ))} */}
      </ul>
    </ul>
  );
};
