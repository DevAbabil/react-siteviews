# 📊 React SiteViews Integration (React & Next.js)

Track page views and gather visitor information effortlessly using [`react-siteviews`](https://www.npmjs.com/package/react-siteviews).  
Supports both **React** ⚛️ and **Next.js** ⚡ — with **zero backend setup** and full support for **JavaScript** 🟨 and **TypeScript** 🟦!

## 📦 Installation 🚀

Install the package using your favorite package manager:

```bash
npm install react-siteviews
```

## ⚛️ React Setup (Vite / CRA / Others)

### ✅ Step-by-step:

📁 `App.jsx` or `App.tsx`

```jsx
import SiteViews from "react-siteviews";

const App = () => {
  return (
    <SiteViews
      projectName="site views documentation"
      visited={() => {
        alert("Website visited 🎉");
      }}
      getData={(value) => {
        console.log(value); // 👥 Array of visitor data
      }}
      refresh="10" // 🔄 Auto-refresh every 10s
      suppressLogs // 🔇 Hide logs
      style={{ color: "red" }}
    >
      Loading...
    </SiteViews>
  );
};

export default App;
```

## ⚡ Next.js Setup

> 🧠 **Note:** Since `react-siteviews` relies on browser APIs, it must be rendered on the **client side** only.

### ✅ Step-by-step:

📁 `components/ViewsCounter.jsx` or `ViewsCounter.tsx`

```tsx
"use client";
import dynamic from "next/dynamic";

const SiteViews = dynamic(() => import("react-siteviews"), { ssr: false });

const ViewsCounter = () => {
  return (
    <SiteViews
      projectName="site views documentation"
      visited={() => {
        alert("Website visited 🎉");
      }}
      getData={(value) => {
        console.log(value); // 👥 Array of visitor data
      }}
      refresh="10" // 🔄 Auto-refresh every 10s
      suppressLogs // 🔇 Hide logs
      style={{ color: "red" }}
    >
      Loading...
    </SiteViews>
  );
};

export default ViewsCounter;
```

🧩 Use `<ViewsCounter />` inside any page or layout to start tracking visits instantly.

## 🔍 Output Example

```
446
```

✔️ Displays the total number of visits.  
✔️ Additional visitor data is available via the `getData` callback.

## 🧰 Available Props

| 🏷️ Prop        | 💬 Description                                                          |
| -------------- | ----------------------------------------------------------------------- |
| `projectName`  | ✅ **Required** — Unique name for your site or page.                    |
| `visited`      | 📥 Optional — Callback executed after a visit is successfully recorded. |
| `getData`      | 📊 Optional — Retrieves an array of detailed visitor info.              |
| `refresh`      | 🔄 Optional — Auto-refresh interval (in seconds).                       |
| `className`    | 🎨 Optional — Add custom class names.                                   |
| `style`        | 💅 Optional — Apply inline styles.                                      |
| `suppressLogs` | 🔇 Optional — Mute all console logs/warnings from SiteViews.            |

## 💡Mostly Use Cases

- 🧑‍💼 Portfolio visit counters
- 📈 Landing page or marketing page metrics

## 🛠 Tips & Tricks

- Use `refresh="10"` to auto-update visit count every 10 seconds ⏱️
- Combine `getData` with your app's state for dynamic dashboards 📊
- Set unique `projectName` values for each route/page if needed 🛣️
- Fully supports **JavaScript** 🟨 and **TypeScript** 🟦 environments out of the box!

## 📄 License

Licensed under the [MIT](./LICENSE) License.

---

Built for simplicity. Track with ease 💖 — and stay informed 🚀.
