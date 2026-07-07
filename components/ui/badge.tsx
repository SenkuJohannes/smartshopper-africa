import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:opacity-90",

        secondary:
          "bg-secondary text-secondary-foreground hover:opacity-90",

        destructive:
          "bg-red-100 text-red-700 hover:bg-red-200",

        outline:
          "border border-border text-foreground",

        ghost:
          "hover:bg-muted hover:text-muted-foreground",

        link:
          "text-primary underline-offset-4 hover:underline",

        success:
          "bg-green-100 text-green-700 border-green-200",

        inactive:
          "bg-gray-100 text-gray-600 border-gray-200",

        warning:
          "bg-yellow-100 text-yellow-700 border-yellow-200",

        info:
          "bg-blue-100 text-blue-700 border-blue-200",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  };

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };