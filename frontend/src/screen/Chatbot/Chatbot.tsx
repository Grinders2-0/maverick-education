import React, { useState } from "react";

// Define the Message interface with strict sender types
interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");

  // Function to handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add the user's message to the messages list
    const userMessage: Message = { sender: "user", text: userInput };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    // Call the API to get the response
    const responseText = await fetchChatBotResponse(userInput);

    // Add the bot's response to the messages list
    const botMessage: Message = { sender: "bot", text: responseText };
    setMessages([...newMessages, botMessage]);

    // Clear the input field
    setUserInput("");
  };

  // Function to call the API
  const fetchChatBotResponse = async (userText: string): Promise<string> => {
    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();
      return data.response; // Adjust based on your API response structure
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      return "Sorry, I couldn't process your request.";
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatWindow}>
        {messages.map((message, index) => (
          <div
            key={index} // Add a unique key to each element
            style={{
              ...styles.message,
              alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor:
                message.sender === "user" ? "#DCF8C6" : "#E6E6E6",
            }}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form style={styles.inputContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    width: "400px",
    margin: "0 auto",
    border: "1px solid #ddd",
    borderRadius: "5px",
    overflow: "hidden",
  },
  chatWindow: {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column" as const,
    overflowY: "auto" as const,
    height: "400px",
    backgroundColor: "#f7f7f7",
  },
  message: {
    maxWidth: "60%",
    padding: "10px",
    borderRadius: "15px",
    margin: "5px 0",
    wordBreak: "break-word" as const,
  },
  inputContainer: {
    display: "flex",
    borderTop: "1px solid #ddd",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Chatbot;
