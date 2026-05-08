"use client";

import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { io, type Socket } from "socket.io-client";

type SocketContextValue = {
  getSocket: () => Socket | null;
  isEnabled: boolean;
};

const SocketContext = createContext<SocketContextValue>({
  getSocket: () => null,
  isEnabled: false,
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<Socket | null>(null);
  const endpoint = process.env.NEXT_PUBLIC_SOCKET_URL;

  useEffect(() => {
    if (!endpoint) {
      return;
    }

    const socketClient = io(endpoint, {
      transports: ["websocket"],
      autoConnect: true,
    });

    socketRef.current = socketClient;

    return () => {
      socketClient.disconnect();
      socketRef.current = null;
    };
  }, [endpoint]);

  const value = useMemo(
    () => ({
      getSocket: () => socketRef.current,
      isEnabled: Boolean(endpoint),
    }),
    [endpoint],
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  return useContext(SocketContext);
}