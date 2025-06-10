'use client';

import { useState, useTransition } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionaries';
import { getChatbotIdeasAction } from '@/app/[lang]/chatbot-generator/actions';
import type { ChatbotIdeaOutput } from '@/ai/flows/chatbot-idea-generator'; // For type checking

const formSchema = z.object({
  businessNeeds: z.string().min(20, { message: "Please describe your business needs in at least 20 characters." }),
});

type FormData = z.infer<typeof formSchema>;

type ChatbotGeneratorClientProps = {
  dictionary: Dictionary['chatbotGeneratorPage'];
};

export default function ChatbotGeneratorClient({ dictionary }: ChatbotGeneratorClientProps) {
  const [isPending, startTransition] = useTransition();
  const [ideas, setIdeas] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIdeas(null);
    setError(null);
    startTransition(async () => {
      const result = await getChatbotIdeasAction({ businessNeeds: data.businessNeeds });
      if ('error' in result) {
        setError(result.error);
      } else {
        setIdeas(result.chatbotIdeas);
      }
    });
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">{dictionary.title}</CardTitle>
          <CardDescription className="text-body text-muted-foreground">{dictionary.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="businessNeeds" className="text-foreground text-lg">{dictionary.businessNeedsLabel}</Label>
              <Textarea
                id="businessNeeds"
                {...register('businessNeeds')}
                placeholder={dictionary.businessNeedsPlaceholder}
                rows={6}
                className="mt-2 bg-card"
              />
              {errors.businessNeeds && <p className="text-sm text-destructive mt-1">{errors.businessNeeds.message}</p>}
            </div>
            <Button type="submit" disabled={isPending} size="lg" className="w-full md:w-auto button-text bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {dictionary.generating}
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  {dictionary.generateButton}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isPending && (
        <div className="text-center py-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground mt-2">{dictionary.generating}</p>
        </div>
      )}

      {error && (
        <Card className="border-destructive shadow-lg">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground">{error}</p>
          </CardContent>
        </Card>
      )}

      {ideas && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl text-primary">{dictionary.ideasTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-foreground"
                 dangerouslySetInnerHTML={{ __html: ideas.replace(/\n/g, '<br />') }} />
          </CardContent>
        </Card>
      )}
       {!ideas && !isPending && !error && (
         <p className="text-center text-muted-foreground py-4">{dictionary.noIdeas}</p>
       )}
    </div>
  );
}
