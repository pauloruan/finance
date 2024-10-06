export function Container({ children }: ContainerProps) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 bg-muted/40">
      {children}
    </div>
  );
}
