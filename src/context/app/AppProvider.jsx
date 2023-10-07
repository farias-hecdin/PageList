import { BookmarksProvider } from "../bookmarks/bookmarksProvider";
import { StateProvider } from "../state/stateProvider";

export const AppProvider = ({ children }) => {
  return (
    <BookmarksProvider>
      <StateProvider>{children}</StateProvider>
    </BookmarksProvider>
  );
};
