export const callOpenAiApi = async (params) => {
  const { prompt, type } = params;
  console.log("called function");
  console.log(prompt);
  console.log(type);
  const API_KEY = "YOUR_API_KEY_HERE";

  const systemMessage = {
    role: "system",
    content: JSON.stringify(prompt),
  };

  const textRequestBody = {
    model: "gpt-3.5-turbo",
    messages: [systemMessage],
  };

  const audioRequestBody = {
    model: "tts-1",
    voice: "alloy",
    input: JSON.stringify(prompt),
  };

  const imageRequestBody = {
    model: "dall-e-2",
    prompt: JSON.stringify(prompt),
  };

  const apiUrl =
    type === "text"
      ? "https://api.openai.com/v1/chat/completions"
      : type === "image"
      ? "https://api.openai.com/v1/images/generations"
      : "https://api.openai.com/v1/audio/speech";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization:
        "Bearer " + API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      type === "text"
        ? textRequestBody
        : type === "image"
        ? imageRequestBody
        : audioRequestBody
    ),
  });

  const data = await response;
  console.log(data);

  if (type === "audio") {
    return data;
  } else {
    return data.json();
  }
};
