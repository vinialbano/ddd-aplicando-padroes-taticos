/**
 * Integration Message Envelope
 * Wrapper for messages exchanged between bounded contexts via message bus
 */
export interface IntegrationMessage<T> {
  messageId: string;
  topic: string;
  timestamp: Date;
  payload: T;
}

/**
 * Message Bus Interface
 * Pub/sub abstraction for cross-bounded-context communication
 */
export interface MessageBus {
  publish<T>(topic: string, payload: T): Promise<void>;

  subscribe<T>(
    topic: string,
    handler: (message: IntegrationMessage<T>) => Promise<void>,
  ): void;
}

export const MESSAGE_BUS = Symbol('MessageBus');
