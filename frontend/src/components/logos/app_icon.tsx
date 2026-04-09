import Image from "next/image";
import { cn } from "@/lib/utils";

interface AppIconProps {
  className?: string;
  size?: number;
}

export default function AppIcon({ className, size = 32 }: AppIconProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/favicon.svg"
        alt="GridMind"
        width={size}
        height={size}
        className="rounded-lg"
      />
    </div>
  );
}
