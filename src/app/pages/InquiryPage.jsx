import { useState } from "react";
import { useParams } from "react-router";
import { motion } from "motion/react";
import { Send, Lock, UserCheck, ChevronRight, MoreVertical, CheckCheck, ChevronLeft } from "lucide-react";
import { mockConversations, mockMessages } from "../data/mockData";
import { useAppStore } from "../store/useAppStore";
import { format } from "date-fns";
function InquiryPage() {
  const { id } = useParams();
  const { currentUser } = useAppStore();
  const [newMessage, setNewMessage] = useState("");
  const [selectedConvId, setSelectedConvId] = useState(id || (mockConversations[0]?.id ?? ""));
  const [showConvList, setShowConvList] = useState(true);
  const conversation = mockConversations.find((c) => c.id === selectedConvId);
  const [localMessages, setLocalMessages] = useState(mockMessages[selectedConvId] || []);
  const handleSelectConv = (convId) => {
    setSelectedConvId(convId);
    setLocalMessages(mockMessages[convId] || []);
    setNewMessage("");
    setShowConvList(false);
  };
  const handleSend = () => {
    if (!newMessage.trim()) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConvId,
      senderId: currentUser?.id || "",
      senderName: currentUser?.name || "",
      text: newMessage.trim(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      read: true
    };
    setLocalMessages([...localMessages, newMsg]);
    setNewMessage("");
  };
  const formatTime = (ts) => {
    try {
      return format(new Date(ts), "h:mm a");
    } catch {
      return "";
    }
  };
  const formatDate = (ts) => {
    try {
      return format(new Date(ts), "MMM d, yyyy");
    } catch {
      return "";
    }
  };
  return <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#2F6B3F]/10 flex items-center justify-center">
          <Send size={20} className="text-[#2F6B3F]" />
        </div>
        <div>
          <h1 className="text-[#1F2937]" style={{ fontWeight: 700, fontSize: "1.25rem" }}>Messages</h1>
          <p className="text-sm text-[#6B7280]">Secure conversations with buyers and sellers</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2DDD5] overflow-hidden flex flex-col md:flex-row shadow-sm" style={{ minHeight: 560 }}>
        {
    /* Conversation List */
  }
        <div className={`w-full md:w-72 flex-shrink-0 border-r border-[#E2DDD5] flex flex-col ${!showConvList ? "hidden md:flex" : "flex"}`}>
          <div className="p-3 border-b border-[#F0EDE8]">
            <p className="text-xs text-[#6B7280]" style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "10px" }}>
              Conversations
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.length === 0 ? <div className="text-center py-10 text-[#6B7280] text-sm px-4">No conversations yet</div> : mockConversations.map((conv) => <button
    key={conv.id}
    onClick={() => handleSelectConv(conv.id)}
    className={`w-full text-left px-3 py-3 border-b border-[#F0EDE8] hover:bg-[#F6F4EE]/80 transition-colors duration-150 ${selectedConvId === conv.id ? "bg-[#F0F7F2] border-l-2 border-l-[#2F6B3F]" : ""}`}
  >
                  <div className="flex items-start gap-2.5">
                    <div className="relative flex-shrink-0">
                      <img
    src={currentUser?.role === "Seller" ? conv.buyerAvatar : conv.sellerAvatar}
    alt=""
    className="w-9 h-9 rounded-full object-cover border border-[#E2DDD5]"
  />
                      {conv.unread > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D64545] text-white rounded-full flex items-center justify-center" style={{ fontSize: "9px", fontWeight: 700 }}>
                          {conv.unread}
                        </span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#1F2937] truncate" style={{ fontWeight: 600 }}>
                        {currentUser?.role === "Seller" ? conv.buyerName : conv.sellerName}
                      </p>
                      <p className="text-xs text-[#6B7280] truncate">{conv.lastMessage}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <img src={conv.listingPhoto} alt="" className="w-4 h-4 rounded object-cover" />
                        <p className="text-xs text-[#9CA3AF] truncate">{conv.listingTitle}</p>
                      </div>
                    </div>
                  </div>
                </button>)}
          </div>
        </div>

        {
    /* Message Area */
  }
        {conversation ? <div className={`flex-1 flex flex-col min-w-0 ${showConvList ? "hidden md:flex" : "flex"}`}>
            {
    /* Chat Header */
  }
            <div className="px-3 sm:px-4 py-3 border-b border-[#E2DDD5] flex items-center justify-between gap-2 bg-[#FAFAF8]">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                {
    /* Mobile back button */
  }
                <button
    onClick={() => setShowConvList(true)}
    className="md:hidden p-1.5 -ml-1 rounded-lg text-[#6B7280] hover:bg-[#F6F4EE] transition-colors duration-150"
  >
                  <ChevronLeft size={20} />
                </button>
                <img
    src={currentUser?.role === "Seller" ? conversation.buyerAvatar : conversation.sellerAvatar}
    alt=""
    className="w-9 h-9 rounded-full object-cover border-2 border-[#E2DDD5]"
  />
                <div>
                  <p className="text-sm text-[#1F2937]" style={{ fontWeight: 600 }}>
                    {currentUser?.role === "Seller" ? conversation.buyerName : conversation.sellerName}
                  </p>
                  <p className="text-xs text-[#6B7280] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Active now
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                {
    /* Contact sharing */
  }
                {conversation.contactShared ? <span className="hidden sm:flex items-center gap-1.5 text-xs text-[#2F6B3F] bg-[#F0F7F2] px-2 py-1 rounded-full border border-[#C8E0CF]" style={{ fontWeight: 500 }}>
                    <UserCheck size={12} />
                    Contact Shared
                  </span> : <button className="hidden sm:flex items-center gap-1.5 text-xs text-[#C68A3A] bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full hover:bg-amber-100 transition-colors duration-150" style={{ fontWeight: 500 }}>
                    <UserCheck size={12} />
                    Share Contact
                  </button>}
                <button className="p-2 rounded-lg text-[#6B7280] hover:bg-white transition-colors duration-150">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            {
    /* Listing Reference */
  }
            <a
    href={`/listings/${conversation.listingId}`}
    className="flex items-center gap-3 px-4 py-2.5 bg-[#F6F4EE] border-b border-[#E2DDD5] hover:bg-[#EDE9E1] transition-colors duration-150"
  >
              <img src={conversation.listingPhoto} alt="" className="w-10 h-10 rounded-lg object-cover border border-[#E2DDD5] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#6B7280]">Regarding listing:</p>
                <p className="text-sm text-[#2F6B3F] truncate" style={{ fontWeight: 500 }}>{conversation.listingTitle}</p>
              </div>
              <ChevronRight size={14} className="text-[#6B7280] flex-shrink-0" />
            </a>

            {
    /* Privacy Banner */
  }
            <div className="flex items-center gap-2 px-4 py-1.5 bg-[#FAFAF8] border-b border-[#F0EDE8]">
              <Lock size={11} className="text-[#9CA3AF] flex-shrink-0" />
              <p className="text-xs text-[#9CA3AF]">Messages are end-to-end private. Only you and the other party can see this conversation.</p>
            </div>

            {
    /* Messages */
  }
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {localMessages.map((msg, i) => {
    const isMe = msg.senderId === currentUser?.id;
    const showDate = i === 0 || formatDate(msg.timestamp) !== formatDate(localMessages[i - 1].timestamp);
    return <div key={msg.id}>
                    {showDate && <div className="flex items-center gap-3 my-3">
                        <div className="flex-1 h-px bg-[#F0EDE8]" />
                        <span className="text-xs text-[#9CA3AF]">{formatDate(msg.timestamp)}</span>
                        <div className="flex-1 h-px bg-[#F0EDE8]" />
                      </div>}
                    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}
    >
                      {!isMe && <img
      src={currentUser?.role === "Seller" ? conversation.buyerAvatar : conversation.sellerAvatar}
      alt=""
      className="w-7 h-7 rounded-full object-cover border border-[#E2DDD5] flex-shrink-0 mb-0.5"
    />}
                      <div className={`max-w-[75%] sm:max-w-xs lg:max-w-sm ${isMe ? "items-end" : "items-start"} flex flex-col gap-1.5`}>
                        <div
      className={`px-3.5 py-2.5 rounded-2xl text-sm ${isMe ? "bg-[#2F6B3F] text-white rounded-br-lg" : "bg-[#F6F4EE] text-[#1F2937] rounded-bl-lg border border-[#E2DDD5]/50"}`}
      style={{ lineHeight: 1.5 }}
    >
                          {msg.text}
                        </div>
                        <div className={`flex items-center gap-1.5 text-xs text-[#9CA3AF] px-0.5 ${isMe ? "flex-row-reverse" : ""}`}>
                          <span>{formatTime(msg.timestamp)}</span>
                          {isMe && <CheckCheck size={12} className={msg.read ? "text-[#2F6B3F]" : "text-[#9CA3AF]"} />}
                        </div>
                      </div>
                    </motion.div>
                  </div>;
  })}
            </div>

            {
    /* Message Input */
  }
            <div className="px-4 py-3.5 border-t border-[#E2DDD5] bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.03)]">
              <div className="flex items-end gap-2">
                <textarea
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    }}
    placeholder="Type a message... (Enter to send)"
    rows={2}
    maxLength={500}
    className="flex-1 px-3 py-2.5 rounded-xl border border-[#E2DDD5] text-sm text-[#1F2937] resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] focus:shadow-sm"
    style={{ lineHeight: 1.5 }}
  />
                <button
    onClick={handleSend}
    disabled={!newMessage.trim()}
    className="w-10 h-10 bg-[#2F6B3F] text-white rounded-xl flex items-center justify-center hover:bg-[#3a834d] disabled:opacity-40 transition-all duration-150 active:scale-95 flex-shrink-0"
  >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-xs text-[#9CA3AF] mt-1.5">Do not share personal bank details or payment links. Report suspicious messages.</p>
            </div>
          </div> : <div className={`flex-1 flex items-center justify-center text-center px-6 ${showConvList ? "hidden md:flex" : "flex"}`}>
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#F0F7F2] to-[#e2f0e6] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Send size={22} className="text-[#2F6B3F]" />
              </div>
              <h3 className="text-[#1F2937] mb-1" style={{ fontWeight: 600 }}>No Conversation Selected</h3>
              <p className="text-sm text-[#6B7280]">Select a conversation from the left to view messages.</p>
            </div>
          </div>}
      </div>
    </div>;
}
export {
  InquiryPage as default
};
