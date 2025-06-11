"use client"

import * as React from "react"
import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Action,
  Cancel,              // ← el botón que cierra el diálogo
} from "@radix-ui/react-alert-dialog"
import { Slot } from "@radix-ui/react-slot"
import { X } from "lucide-react"   // o la librería de iconos que uses

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// Re-export de los primitivos
const AlertDialog = Root
const AlertDialogTrigger = Trigger
const AlertDialogPortal = Portal
const AlertDialogClose = Cancel    // ⇐ alias para el botón 'Close'

// Overlay personalizado
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof Overlay>,
  React.ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
  <Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 " +
      "data-[state=open]:animate-in data-[state=closed]:animate-out " +
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = Overlay.displayName

// Content con botón de cierre arriba a la derecha
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg " +
        "translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 " +
        "shadow-lg duration-200 " +
        "data-[state=open]:animate-in data-[state=closed]:animate-out " +
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] " +
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] " +
        "sm:rounded-lg",
        className
      )}
      {...props}
    >
      {/* botón de cerrar */}
      <AlertDialogClose className="
        absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background
        transition-opacity hover:opacity-100 focus:outline-none focus:ring-2
        focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none
        data-[state=open]:bg-accent data-[state=open]:text-muted-foreground
      ">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </AlertDialogClose>

      {children}
    </Content>
  </AlertDialogPortal>
))
AlertDialogContent.displayName = Content.displayName

// Tus wrappers para Header, Footer, Title, Description, Action y Cancel
// (estos no cambian — siguen usando Title, Description, Action y Cancel del primitivo)
const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<React.ElementRef<typeof Title>, React.ComponentPropsWithoutRef<typeof Title>>(
  ({ className, ...props }, ref) => (
    <Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
  )
)
AlertDialogTitle.displayName = Title.displayName

const AlertDialogDescription = React.forwardRef<React.ElementRef<typeof Description>, React.ComponentPropsWithoutRef<typeof Description>>(
  ({ className, ...props }, ref) => (
    <Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
)
AlertDialogDescription.displayName = Description.displayName

const AlertDialogAction = React.forwardRef<React.ElementRef<typeof Action>, React.ComponentPropsWithoutRef<typeof Action>>(
  ({ className, ...props }, ref) => (
    <Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
  )
)
AlertDialogAction.displayName = Action.displayName

const AlertDialogCancel = React.forwardRef<React.ElementRef<typeof Cancel>, React.ComponentPropsWithoutRef<typeof Cancel>>(
  ({ className, ...props }, ref) => (
    <Cancel
      ref={ref}
      className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
      {...props}
    />
  )
)
AlertDialogCancel.displayName = Cancel.displayName

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
