import { FC, Fragment } from "react";

const GlobalContextProvider: FC = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export default GlobalContextProvider;
