import { Award, Shield, Star } from "lucide-react";

interface BadgeProps {
  type: "starter" | "detective" | "expert";
  earned: boolean;
  title: string;
  description: string;
}

const badgeIcons = {
  starter: Award,
  detective: Shield,
  expert: Star,
};

export const Badge = ({ type, earned, title, description }: BadgeProps) => {
  const Icon = badgeIcons[type];
  
  return (
    <div 
      className={`relative p-6 rounded-xl border-2 transition-all ${
        earned 
          ? 'bg-gradient-badge border-secondary shadow-badge' 
          : 'bg-muted border-border opacity-60'
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className={`p-4 rounded-full ${earned ? 'bg-secondary-foreground/10' : 'bg-background'}`}>
          <Icon className={`h-10 w-10 ${earned ? 'text-secondary-foreground' : 'text-muted-foreground'}`} />
        </div>
        <div>
          <h4 className={`font-bold text-xl mb-1 ${earned ? 'text-secondary-foreground' : 'text-muted-foreground'}`}>
            {title}
          </h4>
          <p className={`text-sm ${earned ? 'text-secondary-foreground/80' : 'text-muted-foreground'}`}>
            {description}
          </p>
        </div>
        {earned && (
          <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full p-2">
            <Award className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
};
