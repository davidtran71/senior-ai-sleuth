import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-4 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-detective text-primary-foreground hover:opacity-90 shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-gradient-badge text-secondary-foreground hover:opacity-90 shadow-badge",
        ghost: "hover:bg-accent/10 hover:text-accent",
        link: "text-primary underline-offset-4 hover:underline",
        evidence: "bg-gradient-evidence text-accent-foreground hover:opacity-90",
      },
      size: {
        default: "h-14 px-8 py-4 text-lg min-w-[44px]", /* Larger for seniors - easier to click */
        sm: "h-12 px-6 text-base min-w-[44px]",
        lg: "h-16 px-12 text-xl min-w-[44px]",
        icon: "h-14 w-14 min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
