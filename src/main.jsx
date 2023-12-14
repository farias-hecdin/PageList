import "./main.css";
import "modern-normalize";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./pages/app.jsx";
import { AppProvider } from "./context/app/appProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);

/* !feat:
 * #01: Notificar que se han producidos cambios en los datos a traves de una notificacion.
 * #03: Captura el atributo title de una pagina al ingresar la URL en el campo de
 * crear un nuevo marcador.
 * #05: Corregir la UI.
 * #06: Crear un componente 'badge' que notificque que una accion determinada se ha
 * realizado con exito.
 * #07: Carga una lista determinada de marcadores para mejorar el redimiento del App
 * al tener cientos de marcadores.
 * #08: Añadir un contador de visita frecuente de un marcador.
 */
