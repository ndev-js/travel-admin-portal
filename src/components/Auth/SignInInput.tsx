import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InputWithAdornmentDemo({ onSubmit }: { onSubmit?: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      className="w-full max-w-xs space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <div className="flex items-center rounded-md border px-3 focus-within:ring-1 focus-within:ring-ring">
        <MailIcon className="size-4 shrink-0 text-muted-foreground" />
        <Input
          className="border-0 shadow-none focus-visible:ring-0"
          placeholder="Email"
          type="email"
        />
      </div>
      <div className="flex items-center rounded-md border px-3 focus-within:ring-1 focus-within:ring-ring">
        <LockIcon className="size-4 shrink-0 text-muted-foreground" />
        <Input
          className="border-0 shadow-none focus-visible:ring-0"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOffIcon className="size-4 text-muted-foreground" />
          ) : (
            <EyeIcon className="size-4 text-muted-foreground" />
          )}
        </Button>
      </div>
      <Button type="submit" className="w-full">Log In</Button>
    </form>
  );
}