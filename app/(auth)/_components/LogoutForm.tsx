import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import logout from "../_actions/logout";

export function LogoutForm() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          size="default"
          type="submit"
          className="w-full flex justify-center items-center"
        >
          <ExitIcon className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar, sua sessão atual vai ser encerrada.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <form
            action={logout}
            className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
          >
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="default"
                size="default"
                type="submit"
                className="w-full flex justify-center items-center"
              >
                <span className="block">Sair</span>
              </Button>
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
