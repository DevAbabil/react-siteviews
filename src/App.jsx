import SiteViews from "./index";

function App() {
  return (
    <div className="siteviews">
      <p>
        <a href="https://siteviews.netlify.app" target="_blank">
          https://siteviews.netlify.app
        </a>
      </p>
      <SiteViews
        projectName="siteviewsreact"
        visited={() => {
          alert("Website visited");
        }}
        // getData={(value) => {
        //   console.log(value);
        // }}
        refresh="10"
        placeHolder={<span>Loading...</span>}
      />
    </div>
  );
}

export default App;
