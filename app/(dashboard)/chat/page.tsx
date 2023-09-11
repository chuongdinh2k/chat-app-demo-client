"use client";
import { lazy, useEffect } from "react";
import { useSocket } from "../../shared/providers/context/socket";
import { RoomEvents } from "../../shared/constants/socket.events";
import { ListMessage } from "../../components/platform/chat/listMessage";

const FormChat = lazy(() => import("../../components/platform/chat/formChat"));

export default function Chat() {
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.emit(RoomEvents.JOIN_ROOM, {
        room: `room1`,
      });
    }
    return () => {
      socket.emit(RoomEvents.LEAVE_ROOM, {
        room: `room1`,
      });
    };
  });
  return (
    <>
      <FormChat />
      <ListMessage />
    </>
  );
}
