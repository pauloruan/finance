"use client";

import { Button } from "@/components/ui/button";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function ThemeToggleButton(): JSX.Element {
  const { currentTheme, toggleTheme } = useThemeToggle();
  const Icon = currentTheme === "dark" ? SunIcon : MoonIcon;

  return (
    <Button
      variant="outline"
      size="default"
      type="button"
      onClick={toggleTheme}
      className="w-full"
    >
      <Icon className="w-4 h-4" />
    </Button>
  );
}
