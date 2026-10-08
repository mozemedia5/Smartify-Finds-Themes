import { ChatMessage, Conversation } from '../types';

const STORAGE_KEY_CONVERSATIONS = 'agrisell_conversations_v1';
const STORAGE_KEY_MESSAGES = 'agrisell_messages_v1';

export class MessagingService {
  public static getConversations(): Conversation[] {
    const raw = localStorage.getItem(STORAGE_KEY_CONVERSATIONS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public static getMessages(conversationId: string): ChatMessage[] {
    const raw = localStorage.getItem(STORAGE_KEY_MESSAGES);
    if (!raw) return [];
    try {
      const all: ChatMessage[] = JSON.parse(raw);
      return all.filter(m => m.conversationId === conversationId);
    } catch {
      return [];
    }
  }

  public static sendMessage(
    conversationId: string,
    senderId: string,
    senderName: string,
    text: string,
    attachment?: ChatMessage['attachment']
  ): ChatMessage {
    const rawMessages = localStorage.getItem(STORAGE_KEY_MESSAGES);
    const messages: ChatMessage[] = rawMessages ? JSON.parse(rawMessages) : [];

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      conversationId,
      senderId,
      senderName,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true,
      attachment
    };

    const updatedMessages = [...messages, newMessage];
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(updatedMessages));

    // Update conversation last message
    const conversations = this.getConversations();
    const convIndex = conversations.findIndex(c => c.id === conversationId);
    if (convIndex > -1) {
      conversations[convIndex].lastMessage = text || (attachment ? `[Attachment: ${attachment.type}]` : '');
      conversations[convIndex].lastMessageTimestamp = 'Just now';
      localStorage.setItem(STORAGE_KEY_CONVERSATIONS, JSON.stringify(conversations));
    }

    return newMessage;
  }

  public static createConversation(
    participantId: string,
    participantName: string,
    participantAvatar: string,
    participantRole: string,
    isVerified: boolean
  ): Conversation {
    const conversations = this.getConversations();
    const existing = conversations.find(c => c.participantId === participantId);
    if (existing) return existing;

    const newConv: Conversation = {
      id: `conv_${Date.now()}`,
      participantId,
      participantName,
      participantAvatar,
      participantRole,
      isVerified,
      lastMessage: 'Conversation started',
      lastMessageTimestamp: 'Just now',
      unreadCount: 0
    };

    const updated = [newConv, ...conversations];
    localStorage.setItem(STORAGE_KEY_CONVERSATIONS, JSON.stringify(updated));
    return newConv;
  }
}
