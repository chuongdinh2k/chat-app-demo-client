"use client";
import { createContext, useContext, useMemo } from "react";
import { Socket, io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "";
const socketOptions = {
  forceNew: true,
  autoConnect: false,
  transports: ["websocket"],
  reconnection: false,
  query: {},
};

const SocketContext = createContext<any>({
  socket: Socket,
});

const SocketsProvider = ({ children }: any) => {
  console.log("runhere");
  const socket = useMemo(() => {
    const _io = io(SOCKET_URL, socketOptions);
    console.log("SOCKET_URL", SOCKET_URL);
    _io.connect().on("connect", () => {
      console.log("socket is connected with id =", _io.id);
    });
    return _io;
  }, []);
  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketsProvider;
