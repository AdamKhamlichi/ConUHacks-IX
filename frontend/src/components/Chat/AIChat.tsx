import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";  // Import the markdown renderer

interface Message {
    content: string;
    role: "user" | "assistant";
}

export const AIChat = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hello! I'm your AI financial assistant. How can I help you today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        // Add the user's message to the chat
        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // Send the message to the backend
            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch response");
            }

            const data = await response.json();
            const assistantMessage: Message = { role: "assistant", content: data.message };

            // Add the assistant's formatted response to the chat
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (err) {
            console.error("Error:", err);
            const errorMessage: Message = {
                role: "assistant",
                content: "Sorry, I couldn't process your request. Please try again.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="flex flex-col h-[500px] bg-white shadow-lg animate-fadeIn">
            <div className="p-4 border-b">
                <h2 className="text-2xl font-semibold text-primary">AI Financial Assistant</h2>
            </div>

            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                message.role === "user" ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-[80%] rounded-lg p-3 ${
                                    message.role === "user"
                                        ? "bg-primary text-white"
                                        : "bg-accent/10 text-primary"
                                }`}
                            >
                                {message.role === "assistant" ? (
                                    <ReactMarkdown>{message.content}</ReactMarkdown> // Render markdown
                                ) : (
                                    message.content
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="max-w-[80%] rounded-lg p-3 bg-accent/10 text-primary">
                                Thinking...
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>

            <div className="p-4 border-t flex gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about your finances..."
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1"
                    disabled={isLoading}
                />
                <Button
                    onClick={handleSend}
                    className="bg-primary hover:bg-primary/90"
                    disabled={isLoading}
                >
                    Send
                </Button>
            </div>
        </Card>
    );
};
