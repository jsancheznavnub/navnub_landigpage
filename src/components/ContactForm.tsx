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

async function submitContactForm(data: FormData): Promise<{ success: boolean; message: string }> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    console.error("NEXT_PUBLIC_BACKEND_URL is not defined in .env");
    return { success: false, message: "Backend URL is not configured." };
  }

  try {
    const response = await fetch(`${backendUrl}/v1/contact_messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Assuming the backend returns a success message or similar on 2xx status
      // You might want to read the response body if it contains useful info
      // const result = await response.json();
      console.log("Backend response OK"); // Added log
      return { success: true, message: "Message sent successfully!" };
    } else {
      // Handle non-2xx responses
      const errorBody = await response.text(); // or .json() if backend sends JSON error
      console.error("Failed to send message:", response.status, errorBody); // Added log
      return { success: false, message: `Failed to send message: ${response.statusText}` };
    }
  } catch (error) {
    console.error("Error submitting form:", error); // Added log
    return { success: false, message: "An error occurred while sending the message." };
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
    console.log('onSubmit triggered'); // Log al inicio
    startTransition(async () => {
      console.log('startTransition started'); // Log al inicio de la transición
      const result = await submitContactForm(data);
      console.log('submitContactForm result:', JSON.stringify(result)); // Log del resultado
      if (result.success) {
        console.log('Submission successful, attempting to reset form.'); // Log en caso de éxito
        toast({
          title: "Success",
          description: dictionary.success,
        });
        reset();
        console.log('Form reset called.'); // Log después de llamar a reset
      } else {
        console.log('Submission failed:', result.message); // Log en caso de error
        toast({
          title: "Error",
          description: result.message, // Use the message from the submit function
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
        {isPending ? 'Enviando...' : dictionary.submit}
      </Button>
    </form>
  );
}
