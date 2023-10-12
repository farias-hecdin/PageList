import React from "react";
import ReactDOM from "react-dom/client";
import "material-symbols/outlined.css";
import "modern-normalize";
import "./main.css";
import { App } from "./pages/App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
G'01: Guardar datos en localStorage.

P'01: ¿Como guardar los datos en el localStorage?
s'01: Ir a la pagina SAVE.
s'02: Pegar los datos en un textarea.
s'03: Oprimir el boton que almacena los datos en el textarea.

P'02: ¿Como perservar los datos en el localStorage?
s'01: Al iniciar seccion aparecera un menu para crear una nueva seccion o para
      abrir una seccion previa.
s'02: Al abrir la seccion por primera vez se validara si existe una seccion
      previa.
*/
