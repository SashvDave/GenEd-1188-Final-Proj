import { useEffect, useState } from "react";
import Home from "./Screens/home";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = "Papers to Inbox";
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return <Home />;
}

export default App;
