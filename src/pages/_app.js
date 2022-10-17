import "../../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ControlsProvider } from "../hooks/controls";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <ControlsProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </ControlsProvider>
    </>
  );
}

export default MyApp;
