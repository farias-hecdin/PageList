import React from "react";
import ReactDOM from "react-dom/client";
import "modern-normalize";
import "./main.css";
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
 * ¡02: Fijar valores del campo de selecion.
 * #03: Captura el atributo title de una pagina al ingresar la URL en el campo de
 * crear un nuevo marcador.
 * #04: Crear un nuevo localStorage que almacene datos temporales de la App en caso
 * de que el navegador se cierre y no se hayan exportado los cambios.
 * #05: Corregir la UI.
 * #06: Crear un componente 'badge' que notificque que una accion determinada se ha
 * realizado con exito.
 * #07: Mover un elemento hacia arriba o hacia abajo.
 * #08: Carga una lista determinada de marcadores para mejorar el redimiento del App
 * al tener cientos de marcadores.
 * #09: Añadir un contador de visita frecuente de un marcador.
 * #10: Importar datos subiendo un archivo JSON.
 */
