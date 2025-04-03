# AI multi model application

## Next js resources | Blocks
<!-- https://ui.shadcn.com/view/styles/new-york/sidebar-13#
https://21st.dev/?tab=components&sort=recommended
https://www.shadcn-svelte.com/blocks
https://21st.dev/aceternity/background-beams/default
https://21st.dev/kokonutd/bento-grid/default
https://awesome-shadcn-ui.vercel.app
https://www.shadcnui-blocks.com/blocks
 -->

Usefull components -
<!-- https://21st.dev/originui/dialog/onboardin-dialog
https://21st.dev/kokonutd/v0-ai-chat/default
https://21st.dev/kokonutd/action-search-bar/default
https://21st.dev/aceternity/sidebar/default
https://21st.dev/originui/tabs/with-scroll-and-icons
Privacy policy 
https://21st.dev/originui/dialog/scrollable-sticky-header
 -->

<!-- Theme idea -
https://21st.dev/aceternity/stars-background/default
https://21st.dev/kokonutd/action-search-bar/default
 -->

check

sidebar mode : or Dialog mode 
<!-- https://ui.shadcn.com/view/styles/new-york/sidebar-13# -->

Handling Global State in a Next.js Application

You need a global state management solution to store and propagate `thing` (the model selected by the user) and `theme` (the theme selected by the user) across the entire app. Here are three effective ways to handle this:

### 1️⃣ **Using React Context API (Recommended for Simplicity)**
Define a `ChosenOptionProvider` that holds both `thing` and `theme` and provides them to all components.

#### 🔹 **Create Context**
```jsx
import { createContext, useContext, useState } from "react";

const ChosenOptionContext = createContext();

export const ChosenOptionProvider = ({ children }) => {
  const [thing, setThing] = useState(null);
  const [theme, setTheme] = useState("default");

  return (
    <ChosenOptionContext.Provider value={{ thing, setThing, theme, setTheme }}>
      {children}
    </ChosenOptionContext.Provider>
  );
};

export const useChosenOption = () => useContext(ChosenOptionContext);
```

#### 🔹 **Wrap Your App with Provider**
```jsx
import { ChosenOptionProvider } from "./ChosenOptionContext";
import App from "./App";

const Root = () => (
  <ChosenOptionProvider>
    <App />
  </ChosenOptionProvider>
);

export default Root;
```

#### 🔹 **Access it Anywhere**
```jsx
import { useChosenOption } from "./ChosenOptionContext";

const Component = () => {
  const { thing, theme, setThing, setTheme } = useChosenOption();

  return (
    <div style={{ background: theme === "dark" ? "#333" : "#fff" }}>
      <h1>Selected Thing: {thing}</h1>
      <button onClick={() => setThing("NewThing")}>Change Thing</button>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle Theme
      </button>
    </div>
  );
};
```

---

### 2️⃣ **Using Zustand (Lightweight & More Powerful)**
If you prefer a more scalable solution, **Zustand** is a great option.

#### 🔹 **Install Zustand**
```bash
npm install zustand
```

#### 🔹 **Create Store**
```jsx
import { create } from "zustand";

const useChosenOptionStore = create((set) => ({
  thing: null,
  theme: "default",
  setThing: (thing) => set({ thing }),
  setTheme: (theme) => set({ theme }),
}));

export default useChosenOptionStore;
```

#### 🔹 **Access it Anywhere**
```jsx
import useChosenOptionStore from "./ChosenOptionStore";

const Component = () => {
  const { thing, theme, setThing, setTheme } = useChosenOptionStore();

  return (
    <div style={{ background: theme === "dark" ? "#333" : "#fff" }}>
      <h1>Selected Thing: {thing}</h1>
      <button onClick={() => setThing("NewThing")}>Change Thing</button>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle Theme
      </button>
    </div>
  );
};
```

---

### 3️⃣ **Using Redux (For Large Apps)**
If your app is large, you can use Redux for centralized state management. However, for your use case, Context API or Zustand should be sufficient.

Which approach do you prefer? 🚀
