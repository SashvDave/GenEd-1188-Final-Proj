import React, { useEffect, useState } from "react";
import { FaRegSun, FaRegMoon } from "react-icons/fa";
import { callOpenAiApi } from "../api.ts";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [selectedSection, setSelectedSection] = useState("text");
  const [mediaURL, setMediaURL] = useState("");
  const [output, setOutput] = useState("");
  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = async (input) => {
    setIsLoading(true);
    setMediaURL("");
    try {
      const data = await callOpenAiApi({
        prompt: input,
        type: selectedSection,
      });
      switch (selectedSection) {
        case "text":
          if (data.choices) {
            setOutput(data.choices[0].message.content);
          } else {
            setOutput(`No text was generated.`);
          }
          break;
        case "image":
          if (data && data.data && data.data.length > 0 && data.data[0].url) {
            setMediaURL(data.data[0].url);
            setOutput("Image generated successfully.");
          } else {
            setOutput(`No image was generated.`);
          }
          break;
        case "audio":
          if (data) {
            const audioBlob = await data.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            setMediaURL(audioUrl);
            setOutput("Audio generated successfully.");
          } else {
            setOutput(`No audio was generated.`);
          }
          break;
        default:
          setOutput(`Invalid section selected: ${selectedSection}`);
      }
    } catch (err) {
      console.error("Error during API call:", err);
      setOutput(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  });

  return (
    <div
      style={{ backgroundColor: darkMode ? "#25252a" : "#FFF5EE" }}
      className={
        darkMode
          ? "bg-[#25252a] w-screen h-screen flex flex-row justify-center text-white transition-all duration-500"
          : "bg-[#FFF5EE] w-screen h-screen flex flex-row justify-center text-black transition-all duration-500"
      }
    >
      <div
        style={{
          paddingRight: isMobile ? screenWidth * 0.05 : 0,
          paddingLeft: isMobile ? screenWidth * 0.05 : 0,
          width: isMobile ? screenWidth * 0.9 : screenWidth * 0.75,
          marginTop: isMobile ? 0 : screenHeight * 0.1,
        }}
      >
        <div style={{ marginTop: screenHeight * 0.05, paddingRight: 20 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={toggleDarkMode}>
              {darkMode ? (
                <FaRegSun style={{ fontSize: 20 }} />
              ) : (
                <FaRegMoon style={{ fontSize: 20 }} />
              )}
            </button>
            <h1
              className="urbanist"
              style={{
                fontWeight: 600,
                fontSize: 17,
                marginLeft: isMobile ? 10 : 20,
                position: "relative",
              }}
            >
              <a style={{ position: "relative" }}>GenEd 1188 Final Project</a>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: 2,
                }}
              ></div>
            </h1>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                borderBottom: "2px solid",
                display: "flex",
                alignItems: "center",
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const promptValue = e.target.prompt.value;
                  setPrompt(promptValue);
                  handleSubmit(promptValue);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <select
                  name="type"
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="urbanist"
                  style={{
                    fontSize: 17,
                    cursor: "pointer",
                    height: 40,
                    marginRight: 10,
                    backgroundColor: "transparent",
                    // border: "1px solid",
                    borderRadius: "5px",
                  }}
                >
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                  <option value="audio">Audio</option>
                </select>
                <input
                  name="prompt"
                  placeholder="prompt.."
                  className="urbanist"
                  style={{
                    fontSize: 17,
                    position: "relative",
                    cursor: "pointer",
                    width: "100%",
                    height: 40,
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    borderBottom: "none",
                    transition: "border-bottom-color 0.3s ease",
                  }}
                />
                <button
                  type="submit"
                  className="urbanist"
                  style={{
                    fontSize: 17,
                    cursor: "pointer",
                    height: 40,
                    width: 35,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  {isLoading ? <p>loading...</p> : <p>→</p>}
                </button>
              </form>
            </div>
          </div>
          {selectedSection === "image" && mediaURL && (
            <img
              src={mediaURL}
              className="w-[20rem] rounded-xl py-[2rem]"
              alt="Generated Visual Content"
            />
          )}
          {selectedSection === "audio" && mediaURL && (
            <audio className="mt-[2rem]" controls src={mediaURL}>
              Your browser does not support the audio element.
            </audio>
          )}
          {selectedSection !== "image" && (
            <h4 className="mt-[1rem]">Output: {output}</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
