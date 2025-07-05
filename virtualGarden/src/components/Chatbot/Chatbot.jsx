

// import React, { useState, useEffect } from "react";

// export default function Chatbot() {
//   const [plants, setPlants] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [remedies, setRemedies] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [chatMessages, setChatMessages] = useState([
//     { from: "bot", text: "Hi! Ask me about plants, products or remedies." }
//   ]);
//   const [inputValue, setInputValue] = useState("");

//   // Fetch plants
//   useEffect(() => {
//     const fetchPlants = async () => {
//       try {
//         const response = await fetch("http://localhost:8802/alldata/plants");
//         const data = await response.json();
//         const formattedData = data.data.map(item => ({
//           title: item.plant.commonName || "Unknown Plant",
//           commonName: item.plant.commonName || "Unknown",
//           sanskritName: item.plant.sanskritName || "Sanskrit Name",
//           botanicalName: item.plant.botanicalName || "Botanical Name",
//           image: item.plant.image_link || "https://via.placeholder.com/150",
//           description: item.plant.sanskritName || "No Sanskrit Name available",
//           modelUrl: item.plant.modelname || "/models/DefaultModel.glb",
//           size: item.plant.plantSize || "Medium",
//           nativeRegion: item.plant.nativeRegion || "India",
//           preferredClimate: item.plant.preferredClimate || "Tropical",
//           requiredSunlight: item.plant.requiredSunlight || "Full Sun",
//           requiredSoil: item.plant.requiredSoil || "Loamy",
//           partsUsed: item.plant.partsUsedInMedicine || ["Leaves"],
//           activeCompounds: item.plant.activeCompounds || ["Flavonoids"],
//           therapeuticProperties: item.plant.therapeuticProperties || ["Anti-inflammatory", "Digestive"],
//           dosageForms: item.plant.dosageForm || ["Powder", "Capsule"],
//           ayushApplications: item.plant.ayushApplications || ["Used in Ayurvedic medicine."],
//           healthBenefits: item.plant.healthBenefits || ["Boosts immunity"],
//         }));
//         setPlants(formattedData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching plant data:", error);
//         setLoading(false);
//       }
//     };

//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:8802/alldata/product");
//         const data = await response.json();
//         setProducts(data.data || []);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     const fetchRemedies = async () => {
//       try {
//         const response = await fetch("http://localhost:8802/alldata/homeRemedies");
//         const data = await response.json();
//         setRemedies(data.data || []);
//       } catch (error) {
//         console.error("Error fetching remedies:", error);
//       }
//     };

//     // Fetch all data in parallel
//     Promise.all([fetchPlants(), fetchProducts(), fetchRemedies()]).then(() =>
//       setLoading(false)
//     );
//   }, []);

//   // Find item by name in plants, products, remedies
//   function findItemByName(name) {
//     const lowerName = name.toLowerCase();

//     if (!Array.isArray(plants) || !Array.isArray(products) || !Array.isArray(remedies)) {
//       return null;
//     }

//     const plant = plants.find(
//       (p) =>
//         p.commonName?.toLowerCase() === lowerName ||
//         p.botanicalName?.toLowerCase() === lowerName ||
//         p.sanskritName?.toLowerCase() === lowerName
//     );
//     if (plant) return { type: "plant", data: plant };

//     const product = products.find((prod) => prod.name?.toLowerCase() === lowerName);
//     if (product) return { type: "product", data: product };

//     const remedy = remedies.find(
//       (r) =>
//         r.name?.toLowerCase() === lowerName ||
//         r.disease?.toLowerCase() === lowerName
//     );
//     if (remedy) return { type: "remedy", data: remedy };

//     return null;
//   }

//   // Handle user input submit
//   function handleSend() {
//     if (!inputValue.trim()) return;

//     const userText = inputValue.trim();
//     setChatMessages((msgs) => [...msgs, { from: "user", text: userText }]);
//     setInputValue("");

//     const foundItem = findItemByName(userText);
//     if (foundItem) {
//       let reply = "";

//       if (foundItem.type === "plant") {
//         const p = foundItem.data;
//         reply = `Plant Info:
// - Common Name: ${p.commonName}
// - Botanical Name: ${p.botanicalName}
// - Sanskrit Name: ${p.sanskritName}
// - Description: ${p.description}
// - Health Benefits: ${p.healthBenefits.join(", ")}
// `;
//       } else if (foundItem.type === "product") {
//         const pr = foundItem.data;
//         reply = `Product Info:
// - Name: ${pr.name}
// - Price: $${pr.price}
// - Rating: ${pr.rating}
// - Review: ${pr.review}`;
//       } else if (foundItem.type === "remedy") {
//         const r = foundItem.data;
//         reply = `Remedy Info:
// - Name: ${r.name}
// - Disease: ${r.disease}
// - Description: ${r.description || "No description available."}`;
//       }

//       setChatMessages((msgs) => [...msgs, { from: "bot", text: reply }]);
//     } else {
//       setChatMessages((msgs) => [
//         ...msgs,
//         { from: "bot", text: "Sorry, I couldn't find any information on that. Please try another name." }
//       ]);
//     }
//   }

//   // Handle enter key press
//   function onKeyDown(e) {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSend();
//     }
//   }

//   if (loading) return <div>Loading data...</div>;

//   return (
//     <div style={styles.container}>
//       <div style={styles.chatBox}>
//         {chatMessages.map((msg, idx) => (
//           <div
//             key={idx}
//             style={{
//               ...styles.message,
//               alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
//               backgroundColor: msg.from === "user" ? "#DCF8C6" : "#F1F0F0",
//             }}
//           >
//             <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{msg.text}</pre>
//           </div>
//         ))}
//       </div>

//       <div style={styles.inputArea}>
//         <input
//           type="text"
//           placeholder="Ask about a plant, product or remedy..."
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={onKeyDown}
//           style={styles.input}
//         />
//         <button onClick={handleSend} style={styles.button}>Send</button>
//       </div>
//     </div>
//   );
// }

// // Basic inline styles (replace with CSS file if you want)
// const styles = {
//   container: {
//     maxWidth: 600,
//     margin: "20px auto",
//     display: "flex",
//     flexDirection: "column",
//     border: "1px solid #ccc",
//     borderRadius: 8,
//     fontFamily: "Arial, sans-serif",
//     height: "500px",
//   },
//   chatBox: {
//     flexGrow: 1,
//     padding: 10,
//     overflowY: "auto",
//     display: "flex",
//     flexDirection: "column",
//     gap: 8,
//     backgroundColor: "#fff",
//   },
//   message: {
//     padding: 10,
//     borderRadius: 12,
//     maxWidth: "75%",
//     whiteSpace: "pre-line",
//     fontSize: 14,
//   },
//   inputArea: {
//     display: "flex",
//     borderTop: "1px solid #ccc",
//   },
//   input: {
//     flexGrow: 1,
//     border: "none",
//     padding: 10,
//     fontSize: 16,
//     outline: "none",
//   },
//   button: {
//     border: "none",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     padding: "0 20px",
//     cursor: "pointer",
//   },
// };



// ChatBot.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatBot.css";

const API_BASE = "http://localhost:8802/alldata";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm your Herbal Garden Assistant. Ask me about plants, products, or home remedies." },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll chat to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to add message (user or bot)
  const addMessage = (sender, text) => {
    setMessages((msgs) => [...msgs, { sender, text }]);
  };

  // Simple intent detection from user input
  const detectIntent = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("plant")) return "plant";
    if (lower.includes("product")) return "product";
    if (lower.includes("remedy") || lower.includes("home remedy")) return "remedy";
    return "general";
  };

  // Fetch plant info by keyword
  const fetchPlant = async (keyword) => {
    try {
      const res = await axios.get(`${API_BASE}/plants`);
      const plants = res.data?.data || [];
      const found = plants.find((p) =>
        p.plant.commonName?.toLowerCase().includes(keyword.toLowerCase()) ||
        p.plant.botanicalName?.toLowerCase().includes(keyword.toLowerCase()) ||
        p.plant.sanskritName?.toLowerCase().includes(keyword.toLowerCase())
      );
      if (found) {
        const info = found.plant;
        return `🌿 Plant Info:
- Common Name: ${info.commonName}
- Botanical Name: ${info.botanicalName}
- Sanskrit Name: ${info.sanskritName}
- Therapeutic Properties: ${info.therapeuticProperties?.join(", ") || "N/A"}
- Uses: ${info.ayushApplications?.join("; ") || "N/A"}`;
      } else {
        return `Sorry, I couldn't find any plant matching "${keyword}".`;
      }
    } catch (error) {
      return "Oops! Error fetching plant data.";
    }
  };

  // Fetch product info by keyword
  const fetchProduct = async (keyword) => {
    try {
      const res = await axios.get(`${API_BASE}/product`);
      const products = res.data?.data || [];
      const found = products.find((p) =>
        p.name?.toLowerCase().includes(keyword.toLowerCase())
      );
      if (found) {
        return `🛒 Product Info:
- Name: ${found.name}
- Price: ₹${found.price}
- Rating: ${found.rating || "N/A"}`;
      } else {
        return `Sorry, no product found for "${keyword}".`;
      }
    } catch (error) {
      return "Oops! Error fetching product data.";
    }
  };

  // Fetch home remedy info by keyword
  const fetchRemedy = async (keyword) => {
    try {
      const res = await axios.get(`${API_BASE}/homeRemedies`);
      const remedies = res.data?.data || [];
      // Find disease or remedy matching keyword
      const foundDisease = remedies.find((disease) =>
        disease.disease.toLowerCase().includes(keyword.toLowerCase())
      );
      if (foundDisease) {
        let reply = `🏥 Home Remedies for ${foundDisease.disease}:\n`;
        foundDisease.remedies.forEach((remedy, idx) => {
          reply += `\n${idx + 1}. ${remedy.name}\nIngredients: ${remedy.ingredients.join(", ")}\nSteps:\n`;
          remedy.steps.forEach((step, i) => {
            reply += `  ${i + 1}. ${step}\n`;
          });
        });
        return reply;
      } else {
        return `Sorry, no home remedy found for "${keyword}".`;
      }
    } catch (error) {
      return "Oops! Error fetching home remedy data.";
    }
  };

  // Handle user input submit
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    addMessage("user", userMsg);
    setInput("");

    // Detect intent & extract keyword for query
    const intent = detectIntent(userMsg);
    let keyword = userMsg;

    // Extract keyword: for simplicity, remove intent words
    if (intent !== "general") {
      keyword = userMsg.toLowerCase().replace(intent, "").trim();
      if (!keyword) {
        addMessage("bot", `Please specify the ${intent} name or keyword.`);
        return;
      }
    }

    addMessage("bot", "Let me check...");

    let reply = "";
    if (intent === "plant") {
      reply = await fetchPlant(keyword);
    } else if (intent === "product") {
      reply = await fetchProduct(keyword);
    } else if (intent === "remedy") {
      reply = await fetchRemedy(keyword);
    } else {
      reply = "I can help with info about plants, products, or home remedies. Try asking 'plant Ashwagandha' or 'product Neem oil'.";
    }

    // Replace "Let me check..." with real answer
    setMessages((msgs) => {
      const lastBotIndex = msgs.map(m => m.sender).lastIndexOf("bot");
      const newMsgs = [...msgs];
      if (lastBotIndex !== -1 && newMsgs[lastBotIndex].text === "Let me check...") {
        newMsgs[lastBotIndex].text = reply;
      } else {
        newMsgs.push({ sender: "bot", text: reply });
      }
      return newMsgs;
    });
  };

  // Submit on Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">Herbal Garden Chatbot</div>
      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chatbot-message ${msg.sender === "user" ? "user-msg" : "bot-msg"}`}
          >
            <pre>{msg.text}</pre>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input-area">
        <input
          type="text"
          placeholder="Type your question here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
