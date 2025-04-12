import React from "react";
import ReactDOM from "react-dom/client";
import SiteViews from "../src";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SiteViews projectName="my project" rootProps={{}}>
      Loading...
    </SiteViews>
  </React.StrictMode>
);
