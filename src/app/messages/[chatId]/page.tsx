
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
import { createBrowserClient } from '@supabase/ssr';

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
    const fetchChat = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push(`/login?redirect=/messages/${chatId}`);
        return;
      }
      setCurrentUserEmail(user.id);

      const { data: convo, error } = await supabase
        .from('conversations')
        .select(`
           *,
           profiles!conversations_participant1_id_fkey (id, full_name, avatar_url),
           profiles2:profiles!conversations_participant2_id_fkey (id, full_name, avatar_url)
        `)
        .eq('id', chatId)
        .single();

      if (error || !convo) {
        setError("Chat not found!");
        setIsLoading(false);
        return;
      }

      const p1 = convo.profiles as any;
      const p2 = (convo as any).profiles2 as any;
      const otherProfile = convo.participant1_id === user.id ? p2 : p1;

      setOtherParticipant({
        id: otherProfile?.id || "unknown",
        name: otherProfile?.full_name || "Unknown User",
        avatarUrl: otherProfile?.avatar_url,
      });

      const { data: msgs } = await supabase.from('messages').select('*').eq('conversation_id', chatId).order('created_at', { ascending: true });
      if (msgs) {
        setMessages(msgs.map(m => ({
          id: m.id,
          chatId,
          senderId: m.sender_id,
          receiverId: otherProfile?.id,
          content: m.content,
          timestamp: m.created_at,
          isRead: true
        })));
      }
      const channel = supabase.channel(`realtime_chat_${chatId}`)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${chatId}` }, (payload) => {
          if (payload.new) {
            setMessages(prev => {
              // avoid duplicate if sent by ourselves just now
              if (prev.find(m => m.id === payload.new.id)) return prev;
              
              return [...prev, {
                id: payload.new.id,
                chatId,
                senderId: payload.new.sender_id,
                receiverId: otherProfile?.id,
                content: payload.new.content,
                timestamp: payload.new.created_at,
                isRead: payload.new.is_read
              }];
            });
          }
        }).subscribe();

      return () => { supabase.removeChannel(channel); };
    };
    const cleanup = fetchChat();
    return () => { cleanup.then(fn => fn && fn()); };
  }, [chatId, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUserEmail || !otherParticipant) return;

    const content = newMessage.trim();
    setNewMessage('');

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      const { data: newMsg, error } = await supabase.from('messages').insert({
        conversation_id: chatId,
        sender_id: currentUserEmail,
        content: content
      }).select().single();

      if (error) throw error;

      setMessages(prev => [...prev, {
        id: newMsg.id,
        chatId,
        senderId: currentUserEmail,
        receiverId: otherParticipant.id,
        content: content,
        timestamp: newMsg.created_at,
        isRead: false
      }]);
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
                msg.senderId === currentUserEmail ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto"
              )}
            >
              <div
                className={cn(
                  "p-2.5 rounded-xl text-sm shadow",
                  msg.senderId === currentUserEmail
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-card text-card-foreground border border-border/50 rounded-bl-none"
                )}
              >
                <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                <p className={cn(
                    "text-xs mt-1",
                    msg.senderId === currentUserEmail ? "text-primary-foreground/70 text-right" : "text-muted-foreground/80 text-left"
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
