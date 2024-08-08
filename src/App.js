import React from "react";
import { SnackbarProvider } from "notistack";
import Form from "./Form";
import "./form.css";


// import TreeView from "./TreeView";

export default function App() {
  return (
    <SnackbarProvider maxSnack={4}>
      <Form />
    </SnackbarProvider>
  );
}
