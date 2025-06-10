
type ValueItemProps = { 
  icon: React.ReactNode;
  text: string;
};

export default function ValueItem({ icon, text }: ValueItemProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-4 bg-background p-8 rounded-xl shadow-lg border border-border/70 hover:shadow-xl hover:border-primary transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="text-accent p-3 bg-accent/10 rounded-full mb-2">
        {icon}
      </div>
      <span className="text-body text-xl font-medium text-foreground">{text}</span>
    </div>
  );
}
