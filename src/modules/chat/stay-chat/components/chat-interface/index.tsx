import { FC } from "react"
import ChatBody from "./chat-body"
import ChatFooter from "./chat-footer"
import ChatHeader from "./chat-header"

interface Props{
    close: () => void
}
const ChatInterface:FC<Props> = ({close}) => {
  return (
    <div className="h-full">
        <div className="h-[64px]">
            <ChatHeader close={close}/>
        </div>
        <div className="h-[calc(100%_-_130px)]">
            <ChatBody/>
        </div>
        <div className="h-[70px] border">
            <ChatFooter/>
        </div>
    </div>
  )
}

export default ChatInterface