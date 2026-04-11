import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Shield, RotateCcw, Zap } from "lucide-react";
import { getRecommendations, generateChatResponse } from "../utils/ai";
import type { GcpRole, ChatMessage, AiRecommendation } from "../types";

interface AiChatProps {
  roles: GcpRole[];
  onRoleClick: (role: GcpRole) => void;
}

const SUGGESTIONS = [
  "Read Cloud Storage objects",
  "Deploy Cloud Run services",
  "Run BigQuery queries",
  "Manage Kubernetes clusters",
  "Access secrets",
  "Set up CI/CD pipelines",
  "Monitor logs and metrics",
  "Manage service accounts",
];

export function AiChat({ roles, onRoleClick }: AiChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(text?: string) {
    const query = (text ?? input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: query,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const recommendations: AiRecommendation[] = getRecommendations(
        roles,
        query
      );
      const response = generateChatResponse(query, recommendations);

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response,
        recommendations,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 300 + Math.random() * 500);
  }

  function handleReset() {
    setMessages([]);
    setInput("");
    inputRef.current?.focus();
  }

  return (
    <div className="bg-surface-raised rounded-2xl border border-slate-200/80 shadow-sm flex flex-col h-[650px] overflow-hidden animate-fade-up">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-brand-950 to-brand-900">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-brand-400 to-violet-400 rounded-xl p-2 shadow-lg shadow-brand-500/20">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm tracking-tight">
              Role Advisor
            </h3>
            <p className="text-[11px] text-brand-300/70">
              Describe what you need, get the right role
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleReset}
            className="p-2 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-xl transition-all"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-200 to-violet-200 rounded-3xl blur-xl opacity-40" />
              <div className="relative bg-gradient-to-br from-brand-50 to-violet-50 rounded-3xl p-8 border border-brand-100/50">
                <Zap className="h-10 w-10 text-brand-400 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-slate-800 mb-1.5">
                  What access do you need?
                </h4>
                <p className="text-sm text-slate-500 max-w-sm">
                  Describe your use case in plain language. I will recommend the
                  narrowest GCP role that fits.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center max-w-md">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-xs px-3.5 py-2 bg-slate-50 hover:bg-brand-50 text-slate-500 hover:text-brand-700 rounded-xl border border-slate-200 hover:border-brand-200 transition-all font-medium"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-up`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-md shadow-brand-500/10"
                  : "bg-slate-50 text-slate-700 border border-slate-200/80"
              }`}
            >
              <div className="text-sm whitespace-pre-wrap leading-relaxed">
                {msg.role === "assistant" ? (
                  <FormattedMessage content={msg.content} />
                ) : (
                  msg.content
                )}
              </div>

              {msg.recommendations && msg.recommendations.length > 0 && (
                <div className="mt-3 space-y-2">
                  {msg.recommendations.slice(0, 3).map((rec) => (
                    <button
                      key={rec.role.name}
                      onClick={() => onRoleClick(rec.role)}
                      className="w-full text-left p-3 bg-surface-raised rounded-xl border border-slate-200/80 hover:border-brand-200 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="h-3.5 w-3.5 text-brand-400 shrink-0" />
                        <span className="text-xs font-bold text-slate-700 group-hover:text-brand-700 truncate">
                          {rec.role.title}
                        </span>
                        <span className="ml-auto shrink-0">
                          <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-lg border border-brand-100">
                            {rec.score}%
                          </span>
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 font-mono truncate">
                        {rec.role.name}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-up">
            <div className="bg-slate-50 rounded-2xl px-5 py-3.5 border border-slate-200/80">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-brand-300 rounded-full animate-bounce [animation-delay:0ms]" />
                <div className="w-2 h-2 bg-brand-300 rounded-full animate-bounce [animation-delay:150ms]" />
                <div className="w-2 h-2 bg-brand-300 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you need access to..."
            className="flex-1 px-4 py-3 bg-surface-raised border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-4 py-3 bg-gradient-to-br from-brand-600 to-brand-700 text-white rounded-xl hover:shadow-lg hover:shadow-brand-500/20 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none transition-all"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

function FormattedMessage({ content }: { content: string }) {
  const parts = content.split(/(\*\*[^*]+\*\*|`[^`]+`|>[^\n]+)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-slate-800">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="text-[11px] bg-brand-50 text-brand-700 px-1.5 py-0.5 rounded-md font-mono border border-brand-100"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith(">")) {
          return (
            <blockquote
              key={i}
              className="border-l-2 border-brand-300 pl-3 my-2 text-slate-500 italic"
            >
              {part.slice(2)}
            </blockquote>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
