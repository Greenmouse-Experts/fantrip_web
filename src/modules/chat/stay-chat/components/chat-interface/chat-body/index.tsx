import ChatBubble from "./component/chat-bubble";

const ChatBody = () => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-2">
        <div className="grid gap-4">
          <ChatBubble
            type="guest"
            text="Hello Green, your stay looks nice and clean, i want to inquire about
          the weather and temperature"
          />
          <ChatBubble
            type="host"
            text="Yeah, the weather is great and the room temperature is 14 deg."
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
