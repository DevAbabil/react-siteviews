# react-siteviews

#### react-siteviews is a React component for counting user visit.

## How to use?

### _install_

```
npm i react-siteviews
```

### _`SiteViews`_ Component

```jsx
import SiteViews from "react-siteviews";

const ViewsCounter = () => {
  return (
    <SiteViews
      projectName="my-project"
      visited={() => {
        alert("Website visited");
      }}
      getData={(value) => {
        console.log(value);
      }}
      refresh="10"
      placeHolder={<span>Loading...</span>}
    />
  );
};

export default ViewsCounter;
```

### SiteViews `props` object Details:

| props       | description                                                                    |
| ----------- | ------------------------------------------------------------------------------ |
| projectName | Required, Replace with your desired project name                               |
| visited     | Optional, `functioin defination` Execute after a visit count might successfull |
| getData     | Optional, `functioin defination` to retrive additional visitor information     |
| refresh     | Optional, for refresh every new visit count autometic, Remove if unnecessary   |
| placeHolder | Optional, Remove if unnecessary.                                               |

> ## Note :
>
> If you use `visited` or `getData` props. then you shuld make your own component memoized first. Otherwise you might get unexpected rerender from `SiteViews` Component. because when you use those props in `SiteViews` component, its enternally called after complete some operation. Which is reson for rerendering of `SiteViews`. So if you prevent this unexected behavior, Here is the simple solution that you can follow.

```jsx
import { memo } from "react";
import SiteViews from "react-siteviews";

const ViewsCounter = () => {
  return (
    <SiteViews
      projectName="my-project"
      visited={() => {
        alert("Website visited");
      }}
      getData={(value) => {
        console.log(value);
      }}
      refresh="10"
      placeHolder={<span>Loading...</span>}
    />
  );
};

export default memo(ViewsCounter);
```

### Website [https://siteviews.netlify.app](https://siteviews.netlify.app)

### NPM Source [https://www.npmjs.com/package/react-siteviews](https://www.npmjs.com/package/react-siteviews)
