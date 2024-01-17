import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "@/index.css";
import Router from "@/routes/Router";
import { store } from "@/store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={Router.router} />
  </Provider>
);
