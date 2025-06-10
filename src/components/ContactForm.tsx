'use client';

import { useState, useTransition } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import type { Dictionary } from '@/lib/dictionaries';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormData = z.infer<typeof formSchema>;

// This would typically be a server action in a separate file or defined with 'use server'
async function submitContactForm(data: FormData): Promise<{ success: boolean; message: string }> {
  // 'use server'; // Uncomment if defining action in the same file as a server component
  console.log('Form data submitted:', data);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Simulate a random success/failure for demonstration
  // In a real app, this would interact with your backend (e.g., send an email, save to DB)
  if (Math.random() > 0.2) {
    return { success: true, message: "Message sent successfully!" };
  } else {
    return { success: false, message: "Failed to send message. Please try again." };
  }
}


type ContactFormProps = {
  dictionary: Dictionary['contactPage']['form'];
};

export default function ContactForm({ dictionary }: ContactFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    startTransition(async () => {
      const result = await submitContactForm(data); // Call the (simulated) server action
      if (result.success) {
        toast({
          title: "Success",
          description: dictionary.success,
        });
        reset();
      } else {
        toast({
          title: "Error",
          description: dictionary.error,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-foreground">{dictionary.name}</Label>
        <Input id="name" {...register('name')} placeholder={dictionary.namePlaceholder} className="mt-1 bg-card" />
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email" className="text-foreground">{dictionary.email}</Label>
        <Input id="email" type="email" {...register('email')} placeholder={dictionary.emailPlaceholder} className="mt-1 bg-card" />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="subject" className="text-foreground">{dictionary.subject}</Label>
        <Input id="subject" {...register('subject')} placeholder={dictionary.subjectPlaceholder} className="mt-1 bg-card" />
        {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <Label htmlFor="message" className="text-foreground">{dictionary.message}</Label>
        <Textarea id="message" {...register('message')} placeholder={dictionary.messagePlaceholder} rows={5} className="mt-1 bg-card" />
        {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
      </div>

      <Button type="submit" disabled={isPending} size="lg" className="w-full button-text bg-secondary hover:bg-secondary/90 text-secondary-foreground">
        {isPending ? 'Sending...' : dictionary.submit}
      </Button>
    </form>
  );
}
