import css from "./spStartPane.module.css";

export const spStartPane = () => {
  return (
    <section className={css.Container}>
      <div>
        <h2 className={css.Container_title}>What would you to do?</h2>
        <ul className={css.Container_list}>
          <C.CardListing text="Bookmark" subtext="Create a new bookmark" icon={<IconifyBookmarkOutline />} />
          <C.CardListing text="Load" subtext="Load last section" icon={<IconifyUpdate />} />
          <C.CardListing text="Backup" subtext="Import your bookmarks" icon={<IconifyUpload />} />
        </ul>
      </div>
    </section>
  );
};
