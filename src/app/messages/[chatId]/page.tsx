
"use client";

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Message, User } from '@/types';
import { Send, ArrowLeft, AlertTriangle, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CHAT_ID_SEPARATOR } from '@/lib/constants';

const MESSAGES_DB_KEY = 'internaMockMessagesDB';
const USERS_DB_KEY = 'internaMockUserDB';

export default function ChatPage() {
  const params = useParams();
  const chatId = params.chatId as string;
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [otherParticipant, setOtherParticipant] = useState<{ id: string; name: string; avatarUrl?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userEmailFromStorage = localStorage.getItem('userEmail');
    if (!userEmailFromStorage) {
      router.push(`/login?redirect=/messages/${chatId}`);
      return;
    }
    const lowerUserEmail = userEmailFromStorage.toLowerCase();
    setCurrentUserEmail(lowerUserEmail);

    if (!chatId || typeof chatId !== 'string') {
        setError("Invalid chat ID provided in URL.");
        setIsLoading(false);
        return;
    }

    const participantEmails = chatId.split(CHAT_ID_SEPARATOR);
    if (participantEmails.length !== 2 || 
        !participantEmails[0] || participantEmails[0].trim() === '' || !participantEmails[0].includes('@') ||
        !participantEmails[1] || participantEmails[1].trim() === '' || !participantEmails[1].includes('@')
    ) {
        setError(`Invalid chat ID format. Chat ID should consist of two valid, non-empty emails separated by '${CHAT_ID_SEPARATOR}'. Received: ${chatId}`);
        setIsLoading(false);
        return;
    }

    const otherUserEmail = participantEmails.find(email => email.toLowerCase() !== lowerUserEmail);

    if (!otherUserEmail) {
        setError("Could not determine the other participant in this chat. Ensure the chat ID is correct and you are part of this chat.");
        setIsLoading(false);
        return;
    }

    const storedUsersRaw = localStorage.getItem(USERS_DB_KEY);
    const allUsers: Record<string, User & { name: string; avatarUrl?: string }> = storedUsersRaw ? JSON.parse(storedUsersRaw) : {};
    const otherUserDetails = allUsers[otherUserEmail.toLowerCase()];

    setOtherParticipant({
      id: otherUserEmail.toLowerCase(),
      name: otherUserDetails?.name || otherUserEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || "User",
      avatarUrl: otherUserDetails?.avatarUrl,
    });

    const storedMessagesRaw = localStorage.getItem(MESSAGES_DB_KEY);
    const allChats: Record<string, Message[]> = storedMessagesRaw ? JSON.parse(storedMessagesRaw) : {};
    const chatMessages = allChats[chatId] || [];
    setMessages(chatMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()));
    setIsLoading(false);
  }, [chatId, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUserEmail || !otherParticipant) return;

    const messageToSend: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      chatId,
      senderId: currentUserEmail,
      receiverId: otherParticipant.id,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      isRead: false, 
    };

    try {
      const storedMessagesRaw = localStorage.getItem(MESSAGES_DB_KEY);
      let allChats: Record<string, Message[]> = storedMessagesRaw ? JSON.parse(storedMessagesRaw) : {};
      if (!allChats[chatId]) {
        allChats[chatId] = [];
      }
      allChats[chatId].push(messageToSend);
      localStorage.setItem(MESSAGES_DB_KEY, JSON.stringify(allChats));

      setMessages(prevMessages => [...prevMessages, messageToSend].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()));
      setNewMessage('');
    } catch (err) {
        console.error("Failed to send message:", err);
        setError("Could not send message. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !otherParticipant) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader className="items-center text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mb-3" />
            <CardTitle>{error ? "Error" : "Chat Not Found"}</CardTitle>
            {error && <CardDescription>{error}</CardDescription>}
            {!error && !otherParticipant && <CardDescription>Could not load participant details for this chat.</CardDescription>}
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.back()}>Go Back</Button>
            <Button variant="link" onClick={() => router.push('/messages')} className="ml-2">View All Conversations</Button>
          </CardContent>
        </Card>
      </div>
    );
  }


  return (
    <div className="container mx-auto py-6 px-2 md:px-4 flex flex-col h-[calc(100vh-8rem)] max-w-2xl">
      <Card className="flex flex-col flex-grow shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="p-4 border-b flex flex-row items-center space-x-3 bg-card">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push('/messages')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={otherParticipant.avatarUrl || `https://dummyimage.com/40x40.png/eeeeee/333333&text=${otherParticipant.name.substring(0,1).toUpperCase()}`} alt={otherParticipant.name} data-ai-hint="person avatar" />
            <AvatarFallback>{otherParticipant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{otherParticipant.name}</CardTitle>
            {/* <CardDescription className="text-xs">Online (mock status)</CardDescription> */}
          </div>
        </CardHeader>

        <ScrollArea className="flex-grow p-4 space-y-4 bg-muted/20">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-end space-x-2 max-w-[80%]",
                msg.senderId.toLowerCase() === currentUserEmail ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto"
              )}
            >
              <div
                className={cn(
                  "p-2.5 rounded-xl text-sm shadow",
                  msg.senderId.toLowerCase() === currentUserEmail
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-card text-card-foreground border border-border/50 rounded-bl-none"
                )}
              >
                <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                <p className={cn(
                    "text-xs mt-1",
                    msg.senderId.toLowerCase() === currentUserEmail ? "text-primary-foreground/70 text-right" : "text-muted-foreground/80 text-left"
                    )}
                >
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>

        <CardFooter className="p-3 border-t bg-card">
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="Type a message..."
              className="flex-1 rounded-lg h-10"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              autoComplete="off"
            />
            <Button type="submit" size="icon" className="rounded-lg h-10 w-10" disabled={!newMessage.trim()}>
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
