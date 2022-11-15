import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="*" element={<App />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
