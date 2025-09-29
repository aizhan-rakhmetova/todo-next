'use client';

import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { useWebSocket } from '@/shared/hooks/useWebSocket';

export function WebSocketStatus() {
  const { isConnected, lastMessage } = useWebSocket();

  return (
    <div className="flex items-center space-x-2">
      <div className={`flex items-center space-x-1 ${
        isConnected ? 'text-green-600' : 'text-red-600'
      }`}>
        {isConnected ? (
          <Wifi className="w-4 h-4" />
        ) : (
          <WifiOff className="w-4 h-4" />
        )}
        <span className="text-sm font-medium">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      
      {lastMessage && (
        <div className="text-xs text-gray-500">
          Last update: {new Date().toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
