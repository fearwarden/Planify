import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import Router from "@/routes/Router";
import { store } from "@/store/store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextUIProvider } from "@nextui-org/react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <NextUIProvider>
        <main className="dark text-foreground bg-background">
          <RouterProvider router={Router.router} />
          <ReactQueryDevtools />
        </main>
      </NextUIProvider>
    </Provider>
  </QueryClientProvider>
);
