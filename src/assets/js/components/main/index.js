import React from "react";
import { Categories } from "../../containers";
import ModalError from "../common/ModalError";
import { RightSideSection } from "../common/Wrappers";

const Main = ({params, children}) => (
  <main
    className="main"
  >
    <ModalError />
    <Categories
      params={params}
    />
    <RightSideSection>
      {children}
    </RightSideSection>
  </main>
);


export default Main;