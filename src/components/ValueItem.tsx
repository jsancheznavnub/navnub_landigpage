type ValueItemProps = { 
  icon: React.ReactNode;
  text: string;
};

export default function ValueItem({ icon, text }: ValueItemProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-3 bg-card p-8 rounded-xl shadow-lg border border-border/50 hover:shadow-2xl hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105">
      <div className="text-accent p-3 bg-accent/10 rounded-full mb-3">
        {icon}
      </div>
      <span className="text-body text-xl font-medium text-foreground">{text}</span>
    </div>
  );
}
