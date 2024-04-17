import React from "react";
import NavBar from "./components/Navigations/NavBar";

interface AppProps {
  children: React.ReactNode;
}

function App({ children }: AppProps) {
  return (
    <div>
      {/* TODO: add header here */}
      <NavBar />
      <main>{children}</main>
    </div>
  );
}

export default App;
