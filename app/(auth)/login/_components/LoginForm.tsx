import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import login from "../_actions/login";

export function LogInForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Acesse sua conta</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={login}>
          <Button variant="outline" type="submit" size="lg" className="w-full">
            Entrar com o Google
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
