import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  type MessageModel,
} from "@chatscope/chat-ui-kit-react";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export default function AiChat() {
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState<MessageModel[]>([
    {
      message: "Hello, I am your Movie Assistant!",
      sentTime: "just now",
      sender: "DeepSeek",
      direction: "incoming",
      position: "single",
    },
  ]);

  const handleSend = async (message: string) => {
    const newMessage: MessageModel = {
      message,
      sentTime: new Date().toLocaleTimeString(),
      sender: "user",
      direction: "outgoing",
      position: "single",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);

    await processMessageToDeepSeek(newMessages);
  };

  async function processMessageToDeepSeek(chatMessages: MessageModel[]) {
    // Only keep the last 5 user+AI messages to save tokens
    const recentMessages = chatMessages.slice(-5);

    const apiMessages = recentMessages.map((m) => ({
      role: m.sender === "DeepSeek" ? "assistant" : "user",
      content: m.message,
    }));

    const systemMessage = {
      role: "system",
      content:
        "You are a helpful AI movie assistant. Suggest movies, explain in simple terms, and keep responses short.",
    };

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + OPENROUTER_API_KEY,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin, // optional for rankings
          "X-Title": "My Movie App", // optional
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-0528",
          messages: [systemMessage, ...apiMessages],
          max_tokens: 500, // prevent over-credit error
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("AI Response Error:", data.error);
        const aiError: MessageModel = {
          message: "⚠️ " + data.error.message,
          sentTime: new Date().toLocaleTimeString(),
          sender: "DeepSeek",
          direction: "incoming",
          position: "single",
        };
        setMessages([...chatMessages, aiError]);
        return;
      }

      const aiReply: MessageModel = {
        message: data.choices?.[0]?.message?.content || "⚠️ No reply from DeepSeek.",
        sentTime: new Date().toLocaleTimeString(),
        sender: "DeepSeek",
        direction: "incoming",
        position: "single",
      };

      setMessages([...chatMessages, aiReply]);
    } catch (err) {
      console.error("AI request failed:", err);
      const aiError: MessageModel = {
        message: "⚠️ Failed to connect to DeepSeek.",
        sentTime: new Date().toLocaleTimeString(),
        sender: "DeepSeek",
        direction: "incoming",
        position: "single",
      };
      setMessages([...chatMessages, aiError]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <div style={{ position: "relative", height: "300px", width: "100%" }}>
      <MainContainer className="rounded-2xl bg-gray-900 shadow-lg border border-gray-700">
        <ChatContainer className="rounded-2xl shadow-lg border p-3">
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={typing ? <TypingIndicator content="AI is typing..." /> : null}
          >
            {messages.map((msg, i) => (
              <Message
                key={i}
                model={msg}
                className={`${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-2xl px-3 py-2"
                    : "bg-gray-200 text-black rounded-2xl px-3 py-2"
                }`}
              />
            ))}
          </MessageList>

          <MessageInput
            className="rounded-full border border-gray-600 bg-gray-800 text-white px-4 py-2"
            placeholder="Ask about movies..."
            onSend={handleSend}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
