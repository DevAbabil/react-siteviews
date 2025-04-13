import React from "react";
import ReactDOM from "react-dom/client";
import SiteViews from "../src";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <SiteViews
    refresh={"10"}
    projectName="site views documentation"
    visited={() => alert("hello world")}
    getData={(value) => {
      console.log(value);
    }}
    // suppressLogs
  >
    Loading...
  </SiteViews>
  // </React.StrictMode>
);
