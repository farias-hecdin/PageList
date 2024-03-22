import "./main.css";
import "modern-normalize";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "$src/pages/App";
import { AppProvider } from "./context";

console.time("benchmark");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);

console.timeEnd("benchmark");

/* !feat:
 * #1.1: Recomendar realizar una copia de seguridad.
 * #1.2: Captura el atributo title de una pagina al ingresar la URL.
 * x1.2: Corregir la UI.
 * x1.3: Crear un componente 'badge' que notifique que una accion se ha realizado con exito.
 * #1.4: Carga una lista determinada de 30/50 marcadores para mejorar el redimiento del App.
 * #1.5: Añadir un contador de visita frecuente de un marcador.
 *
 * #2.1: Advertir sobre URL duplicados.
 * #2.2: Fecha de creacion de un marcador.
 * x2.3: Añadir marca de tiempo videos de Youtube.
 * #2.4: Estado del marcador (visto, pendiente).
 * #2.5: Multi-seleccion
 */
