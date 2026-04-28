
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { ChatSummary, Message, User } from '@/types';
import { AlertTriangle, Inbox, Loader2 } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';

export default function MessagesPage() {
  const [chatSummaries, setChatSummaries] = useState<ChatSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/login?redirect=/messages');
          return;
        }
        setCurrentUserEmail(user.id);

        const { data: convos, error } = await supabase
          .from('conversations')
          .select(`
             id,
             participant1_id,
             participant2_id,
             profiles!conversations_participant1_id_fkey (id, full_name, avatar_url),
             profiles2:profiles!conversations_participant2_id_fkey (id, full_name, avatar_url)
          `);

        if (error) throw error;
        
        const summaries: ChatSummary[] = [];

        if (convos) {
          for (const convo of convos) {
            // Because postgREST handles the two foreign keys, standard query output looks somewhat complex,
            // we will fetch using a simpler trick or just assume we have it:
            // Workaround logic for mapped columns:
            const p1 = convo.profiles as any;
            const p2 = (convo as any).profiles2 as any;
            const otherProfile = convo.participant1_id === user.id ? p2 : p1;
            
            const otherParticipant = {
              id: otherProfile?.id || (convo.participant1_id === user.id ? convo.participant2_id : convo.participant1_id),
              name: otherProfile?.full_name || "Unknown User",
              avatarUrl: otherProfile?.avatar_url,
            };

            const { data: msgs } = await supabase
              .from('messages')
              .select('*')
              .eq('conversation_id', convo.id)
              .order('created_at', { ascending: false })
              .limit(1);

            const lastMessage = msgs?.[0] ? {
               id: msgs[0].id,
               chatId: convo.id,
               senderId: msgs[0].sender_id,
               receiverId: otherParticipant.id,
               content: msgs[0].content,
               timestamp: msgs[0].created_at,
               isRead: true
            } : null;

            summaries.push({
              chatId: convo.id,
              otherParticipant,
              lastMessage,
            });
          }
        }
        
        summaries.sort((a, b) => {
          if (!a.lastMessage) return 1;
          if (!b.lastMessage) return -1;
          return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime();
        });

        setChatSummaries(summaries);
      } catch (e) {
        console.error("Error fetching conversations", e);
        setError("Failed to load conversations.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchConversations();
  }, [router]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-3 text-muted-foreground">Loading conversations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader className="items-center text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mb-3" />
            <CardTitle>Error Loading Messages</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push('/')}>Go to Homepage</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-8 min-h-[calc(100vh-5rem)] bg-gradient-to-br from-indigo-50/40 via-white to-violet-50/40">
      <div className="container mx-auto px-4">
      <Card className="max-w-2xl mx-auto shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center"><Inbox className="mr-3 h-6 w-6 text-primary" /> Your Conversations</CardTitle>
          <CardDescription>View and reply to your messages.</CardDescription>
        </CardHeader>
        <CardContent>
          {chatSummaries.length === 0 ? (
            <div className="text-center py-10">
              <Inbox className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground">You have no active conversations yet.</p>
              <p className="text-xs text-muted-foreground mt-1">Start a new conversation by messaging a student or client.</p>
              <Button asChild className="mt-6">
                <Link href="/talent">Find Talent to Message</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {chatSummaries.map((chat) => (
                <Link href={`/messages/${chat.chatId}`} key={chat.chatId} className="block">
                  <Card className="hover:bg-muted/50 transition-colors p-4 rounded-lg border-border/50">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={chat.otherParticipant.avatarUrl || `https://dummyimage.com/48x48.png/eeeeee/333333&text=${chat.otherParticipant.name.substring(0,1).toUpperCase()}`} alt={chat.otherParticipant.name} data-ai-hint="person avatar" />
                        <AvatarFallback>{chat.otherParticipant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{chat.otherParticipant.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {chat.lastMessage?.senderId === currentUserEmail ? "You: " : ""}
                          {chat.lastMessage?.content || "No messages yet."}
                        </p>
                      </div>
                      {chat.lastMessage && (
                        <p className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(chat.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
