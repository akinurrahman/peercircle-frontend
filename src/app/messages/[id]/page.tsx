import MessageHeader from "../components/message/header";
import MessageScrollArea from "../components/message/message-scroll-area";
import SendMessage from "../components/message/send-mesage";

export default function Message() {
  return (
    <div className="flex h-screen flex-col">
      <MessageHeader />
      <MessageScrollArea />
      <SendMessage />
    </div>
  );
}
