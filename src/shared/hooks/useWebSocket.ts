'use client';

import { useEffect, useState } from 'react';
import { websocketService } from '@/shared/lib/websocket';

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);

  useEffect(() => {
    websocketService.connect();

    const handleConnection = (data: any) => {
      setIsConnected(data.status === 'connected');
    };

    websocketService.on('connection', handleConnection);

    const handleMessage = (data: any) => {
      setLastMessage(data);
    };

    websocketService.on('todo-updated', handleMessage);
    websocketService.on('todo-created', handleMessage);
    websocketService.on('todo-deleted', handleMessage);

    return () => {
      websocketService.off('connection', handleConnection);
      websocketService.off('todo-updated', handleMessage);
      websocketService.off('todo-created', handleMessage);
      websocketService.off('todo-deleted', handleMessage);
    };
  }, []);

  const sendMessage = (event: string, data: any) => {
    websocketService.send(event, data);
  };

  return {
    isConnected,
    lastMessage,
    sendMessage,
  };
}
