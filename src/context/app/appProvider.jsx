import { DataProvider } from "../data/dataProvider";
import { StateProvider } from "../state/stateProvider";

export const AppProvider = ({ children }) => {
  return (
    <DataProvider>
      <StateProvider>{children}</StateProvider>
    </DataProvider>
  );
};
