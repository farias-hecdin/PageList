import { BookmarksProvider } from "../bookmarks/bookmarksProvider";
import { DataProvider } from "../data/dataProvider";
import { StateProvider } from "../state/stateProvider";

export const AppProvider = ({ children }) => {
  return (
    <DataProvider>
      <BookmarksProvider>
        <StateProvider>{children}</StateProvider>
      </BookmarksProvider>
    </DataProvider>
  );
};
