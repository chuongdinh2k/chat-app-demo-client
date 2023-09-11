"use client";
import { useEffect, useState } from "react";
import { useSocket } from "../../../../shared/providers/context/socket";
import { ChatEvents } from "../../../../shared/constants/socket.events";
import style from "./styles.module.scss";
import { EMessageStatus } from "../../../../shared/constants/message.interface";
import { Avatar } from "antd";
import Loading from "../../../../loading";
import LoadingComponent from "../../../common/Loading";

type TMessage = {
  sender: string;
  date: string;
  status: string;
  content: string;
  isTyping?: boolean;
};

const Message = ({
  sender,
  date,
  status,
  content,
  isTyping = false,
}: TMessage) => {
  return (
    <div className={style.message}>
      <div className={style.message__content}>
        <Avatar>A</Avatar>
        <div className={style.message__text}>
          {isTyping ? (
            <div className={style.messageTyping}>
              <LoadingComponent />
            </div>
          ) : (
            <>
              <p>{content}</p>
              <p>{date}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const ListMessage = () => {
  const { socket } = useSocket();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  console.log("isTyping", isTyping);
  useEffect(() => {
    socket.on(ChatEvents.receiveMessage, (data: any) => {
      console.log("dataSOcket", data);
    });
    socket.on(ChatEvents.getIsTyping, (data: any) => {
      console.log("dataTyping", data);
      if (data) {
        setIsTyping(data?.isTyping);
      }
    });
    return () => {
      socket.off(ChatEvents.receiveMessage);
      socket.off(ChatEvents.getIsTyping);
    };
  }, [socket]);
  return (
    <div className={style.listMessages}>
      <div className={style.wrapList}>
        {/* <Message sender={""} date={""} status={""} content={"message-one"} />
        <Message
          sender={""}
          date={""}
          status={""}
          content={"message-one"}
          isTyping={true}
        /> */}
        {isTyping && (
          <Message
            sender={""}
            date={""}
            status={""}
            content={"message-one"}
            isTyping={true}
          />
        )}
      </div>
    </div>
  );
};
