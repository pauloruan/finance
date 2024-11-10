import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogoutForm } from "./(auth)/_components/LogoutForm";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chart } from "./_components/Chart";
import { randomUUID } from "crypto";

export const description =
  "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information.";

enum PaymentMethod {
  PIX = "PIX",
  CASH = "DINHEIRO",
  DEPOSIT = "DEPÓSITO",
  VA = "VALE ALIMENTAÇÃO",
  TRANSFER = "TRANSFERÊNCIA",
  DEBIT = "CARTÃO DE DÉBITO",
  CREDIT = "CARTÃO DE CRÉDITO",
}

enum Recurrence {
  ONCE = "ÚNICA",
  DAILY = "DIÁRIA",
  WEEKLY = "SEMANAL",
  MONTHLY = "MENSAL",
  QUARTERLY = "TRIMESTRAL",
  SEMIANNUALLY = "SEMESTRAL",
  YEARLY = "ANUAL",
}

interface Institution {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// interface Recurrence {
//   id: string;
//   amount: number;
//   current: number;
//   recurrenceType: RecurrenceType;
//   dueDate: Date;
//   paymentDate: Date | null;
//   recurrenceAt: Date;
//   createdAt: Date;
//   updatedAt: Date;
// }

interface Payment {
  id: string;
  method: PaymentMethod;
  amount: number;
  count: number;
  dueDate: Date;
  paymentDate: Date | null;
  recurrenceAt: Date| null;
  createdAt: Date;
  updatedAt: Date;
}

interface Transaction {
  id: string;
  title: string;
  institution: Institution;
  payments: Array<Payment>;
  createdAt: Date;
  updatedAt: Date;
}

interface Expense extends Transaction {}

interface Salary extends Transaction {}

interface ChartData {
  month: string;
  salaries: number;
  expenses: number;
}

export default async function Home() {
  let user = undefined;
  const session = await auth();
  if (session) {
    user = session.user;
  } else {
    return redirect("/login");
  }

  const currentDate = new Date();
  const institutions: Array<Institution> = [
    {
      id: crypto.randomUUID(),
      name: "PicPay",
      createdAt: new Date("2024-10-04"),
      updatedAt: new Date("2024-10-04"),
    },
    {
      id: crypto.randomUUID(),
      name: "Caju",
      createdAt: new Date("2024-10-04"),
      updatedAt: new Date("2024-10-04"),
    },
  ]
  const salaries: Array<Salary> = [
    {
      id: crypto.randomUUID(),
      title: "Salário",
      createdAt: new Date("2024-10-04"),
      updatedAt: new Date("2024-10-04"),
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-10-07"),
        paymentDate: new Date("2024-10-04"),
        method: PaymentMethod.DEPOSIT,
        recurrences: [
          {
            id: crypto.randomUUID(),
            current: 1,
            amount:  1522.92,
            recurrenceAt: new Date("2024-10-04"),
            recurrenceType: Recurrence.MONTHLY,
            createdAt: new Date("2024-10-04"),
            updatedAt: new Date("2024-10-04"),
          }
        ],
        createdAt: new Date("2024-10-04"),
        updatedAt: new Date("2024-10-04"),
      },
    },
    {
      id: crypto.randomUUID(),
      title: "Vale Alimentação",
      institution: institutions[1],
      payment: {
        id: crypto.randomUUID(),
        method: PaymentMethod.VA,
        recurrences: [
          {
            id: crypto.randomUUID(),
            current: 1,
            amount: 417.6,
            recurrenceType: Recurrence.MONTHLY,
            dueDate: new Date("2024-10-04"),
            paymentDate: new Date("2024-10-04"),
            recurrenceAt: new Date("2024-09-09"),
            createdAt: new Date("2024-09-09"),
            updatedAt: new Date("2024-09-09"),
          },
          {
            id: crypto.randomUUID(),
            current: 2,
            amount: 500.0,
            recurrenceAt: new Date("2024-10-26"),
            recurrenceType: Recurrence.MONTHLY,
            createdAt: new Date("2024-10-26"),
            updatedAt: new Date("2024-10-26"),
          },
          {
            id: crypto.randomUUID(),
            current: 2,
            amount: 500.0,
            recurrenceAt: new Date("2024-10-26"),
            recurrenceType: Recurrence.MONTHLY,
            createdAt: new Date("2024-10-26"),
            updatedAt: new Date("2024-10-26"),
          },
        ],
        createdAt: new Date("2024-10-04"),
        updatedAt: new Date("2024-10-04"),
      },
      createdAt: new Date("2024-10-04"),
      updatedAt: new Date("2024-10-04"),
    },
  ];
  const expenses: Array<Expense> = [
    {
      id: crypto.randomUUID(),
      title: "Aporte no Cofrinho Pelo Picpay Card",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-10-05"),
        method: PaymentMethod.DEPOSIT,
        paymentDate: new Date("2024-10-05"),
        recurrences: [
          {
            id: crypto.randomUUID(),
            recurrenceType: Recurrence.ONCE,
            recurrenceAt: new Date("2024-10-05"),
            current: 1,
            amount: 2.0,
            createdAt: new Date("2024-10-05"),
            updatedAt: new Date("2024-10-05"),
          }
        ],
        createdAt: new Date("2024-10-05"),
        updatedAt: new Date("2024-10-05"),
      },
      createdAt: new Date("2024-10-05"),
      updatedAt: new Date("2024-10-05"),
    },
    {
      id: crypto.randomUUID(),
      title: "Aporte na carteira Cofrinho por compra parcial",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-10-05"),
        method: PaymentMethod.CREDIT,
        paymentDate: new Date("2024-10-05"),
        recurrences: [
          {
            id: crypto.randomUUID(),
            current: 1,
            amount: 41.73,
            recurrenceAt: new Date("2024-10-05"),
            recurrenceType: Recurrence.ONCE,
            createdAt: new Date("2024-10-05"),
            updatedAt: new Date("2024-10-05"),
          },
        ],
        createdAt: new Date("2024-10-05"),
        updatedAt: new Date("2024-10-05"),
      },
      createdAt: new Date("2024-10-05"),
      updatedAt: new Date("2024-10-05"),
    },
    {
      id: crypto.randomUUID(),
      title: "Aporte na carteira Cofrinho por compra parcial",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-10-05"),
        method: PaymentMethod.CREDIT,
        paymentDate: new Date("2024-10-05"),
        recurrences: [
          {
            id: crypto.randomUUID(),
            amount: 7.98,
            current: 1,
            recurrenceAt: new Date("2024-10-05"),
            recurrenceType: Recurrence.ONCE,
            createdAt: new Date("2024-10-05"),
            updatedAt: new Date("2024-10-05"),
          },
        ],
        createdAt: new Date("2024-10-05"),
        updatedAt: new Date("2024-10-05"),
      },
      createdAt: new Date("2024-10-05"),
      updatedAt: new Date("2024-10-05"),
    },
    {
      id: crypto.randomUUID(),
      title: "Pix Enviado",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-10-05"),
        method: PaymentMethod.PIX,
        paymentDate: new Date("2024-10-05"),
        recurrences: [

          {
            id: crypto.randomUUID(),
          amount: 53.0,
          current: 1,
          recurrenceAt: new Date("2024-10-05"),
          recurrenceType: Recurrence.ONCE,
          createdAt: new Date("2024-10-05"),
          updatedAt: new Date("2024-10-05"),}
        ],

        createdAt: new Date("2024-10-05"),
        updatedAt: new Date("2024-10-05"),
      },
      createdAt: new Date("2024-10-05"),
      updatedAt: new Date("2024-10-05"),
    },
    {
      id: crypto.randomUUID(),
      title: "Pagamento realizado - PicPay Card Débito",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-10-05"),
        method: PaymentMethod.DEBIT,
        paymentDate: new Date("2024-10-05"),
        recurrences: [{
          id: crypto.randomUUID(),
          amount: 20.25,
          current: 1,
          recurrenceAt: new Date("2024-10-05"),
          recurrenceType: Recurrence.ONCE,
          createdAt: new Date("2024-10-05"),
          updatedAt: new Date("2024-10-05"),
        },],
        createdAt: new Date("2024-10-05"),
        updatedAt: new Date("2024-10-05"),
      },
      createdAt: new Date("2024-10-05"),
      updatedAt: new Date("2024-10-05"),
    },
    {
      id: crypto.randomUUID(),
      title: "Pagamento realizado / Pagamento recebido",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-10-04"),
        paymentDate: new Date("2024-10-04"),
        method: PaymentMethod.TRANSFER,
        recurrences: [
          {
            id: crypto.randomUUID(),
            amount: 20.0,
            current: 1,
            recurrenceAt: new Date("2024-10-04"),
            recurrenceType: Recurrence.ONCE,
            createdAt: new Date("2024-10-04"),
            updatedAt: new Date("2024-10-04"),
          }
        ],
        createdAt: new Date("2024-10-04"),
        updatedAt: new Date("2024-10-04"),
      },
      createdAt: new Date("2024-10-04"),
      updatedAt: new Date("2024-10-04"),
    },
    {
      id: crypto.randomUUID(),
      title: "Pagamento realizado / Pagamento recebido",
      institution: institutions[0], // Supondo que `institutions` é um array definido com objetos `Institution`
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-10-04"),
        paymentDate: new Date("2024-10-04"),
        method: PaymentMethod.TRANSFER,
        recurrences: [
          {
            id: crypto.randomUUID(),
            amount: 8.0,
            current: 1,
            recurrenceAt: new Date("2024-10-04"),
            recurrenceType: Recurrence.ONCE,
            createdAt: new Date("2024-10-04"),
            updatedAt: new Date("2024-10-04"),
          }
        ],
        createdAt: new Date("2024-10-04"),
        updatedAt: new Date("2024-10-04"),
      },
      createdAt: new Date("2024-10-04"),
      updatedAt: new Date("2024-10-04"),
    },
    {
      id: crypto.randomUUID(),
      title: "Pagamento realizado / Pagamento recebido",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-10-04"),
        paymentDate: new Date("2024-10-04"),
        method: PaymentMethod.TRANSFER,
        recurrences: [
          {
            id: crypto.randomUUID(),
            amount: 30.0,
            current: 1,
            recurrenceAt: new Date("2024-10-04"),
            recurrenceType: Recurrence.ONCE,
            createdAt: new Date("2024-10-04"),
            updatedAt: new Date("2024-10-04"),
          }
        ],
        createdAt: new Date("2024-10-04"),
        updatedAt: new Date("2024-10-04"),
      },
      createdAt: new Date("2024-10-04"),
      updatedAt: new Date("2024-10-04"),
    },
    {
      id: crypto.randomUUID(),
      title: "Pix Enviado",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-10-04"),
        paymentDate: new Date("2024-10-04"),
        method: PaymentMethod.PIX,
        recurrences: [
          {
            id: crypto.randomUUID(),
            amount: 80.59,
            current: 1,
            recurrenceAt: new Date("2024-10-04"),
            recurrenceType: Recurrence.ONCE,
            createdAt: new Date("2024-10-04"),
            updatedAt: new Date("2024-10-04"),
          }
        ],
        createdAt: new Date("2024-10-04"),
        updatedAt: new Date("2024-10-04"),
      },
      createdAt: new Date("2024-10-04"),
      updatedAt: new Date("2024-10-04"),
    },
    {
      id: crypto.randomUUID(),
      title: "Pagamento realizado / Pagamento recebido",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-10-04"),
        paymentDate: new Date("2024-10-04"),
        method: PaymentMethod.TRANSFER,
        recurrences: [
          {
            id: crypto.randomUUID(),
            amount: 10.0,
            current: 1,
            recurrenceAt: new Date("2024-10-04"),
            recurrenceType: Recurrence.ONCE,
            createdAt: new Date("2024-10-04"),
            updatedAt: new Date("2024-10-04"),
          }
        ],
        createdAt: new Date("2024-10-04"),
        updatedAt: new Date("2024-10-04"),
      },
      createdAt: new Date("2024-10-04"),
      updatedAt: new Date("2024-10-04"),
    },
    {
      id: crypto.randomUUID(),
      title: "Pix Enviado",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-10-04"),
        paymentDate: new Date("2024-10-04"),
        method: PaymentMethod.PIX,
        recurrences: [
          {
            id: crypto.randomUUID(),
            amount: 16.24,
            current: 1,
            recurrenceAt: new Date("2024-10-04"),
            recurrenceType: Recurrence.ONCE,
            createdAt: new Date("2024-10-04"),
            updatedAt: new Date("2024-10-04"),
          }
        ],
        createdAt: new Date("2024-10-04"),
        updatedAt: new Date("2024-10-04"),
      },
      createdAt: new Date("2024-10-04"),
      updatedAt: new Date("2024-10-04"),
    },
    {
      id: crypto.randomUUID(),
      title: "Pagamento realizado / Pagamento recebido",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-10-04"),
        paymentDate: new Date("2024-10-04"),
        method: PaymentMethod.TRANSFER,
        recurrences: [
          {
            id: crypto.randomUUID(),
            amount: 200.0,
            current: 1,
            recurrenceAt: new Date("2024-10-04"),
            recurrenceType: Recurrence.MONTHLY,
            createdAt: new Date("2024-10-04"),
            updatedAt: new Date("2024-10-04"),
          }
        ],
        createdAt: new Date("2024-10-04"),
        updatedAt: new Date("2024-10-04"),
      },
      createdAt: new Date("2024-10-04"),
      updatedAt: new Date("2024-10-04"),
    },
    {
      id: crypto.randomUUID(),
      title: "Pagamento realizado em Digital Goods",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-10-04"),
        paymentDate: new Date("2024-10-04"),
        method: PaymentMethod.TRANSFER,
        recurrences: [
          {
            id: crypto.randomUUID(),
            amount: 17.0,
            current: 1,
            recurrenceAt: new Date("2024-10-04"),
            recurrenceType: Recurrence.ONCE,
            createdAt: new Date("2024-10-04"),
            updatedAt: new Date("2024-10-04"),
          }
        ],
        createdAt: new Date("2024-10-04"),
        updatedAt: new Date("2024-10-04"),
      },
      createdAt: new Date("2024-10-04"),
      updatedAt: new Date("2024-10-04"),
    },
    {
      id: crypto.randomUUID(),
      title: "Pagamento de boleto",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-10-04"),
        paymentDate: new Date("2024-10-04"),
        method: PaymentMethod.TRANSFER,
        recurrences: [
          {
            id: crypto.randomUUID(),
            amount: 321.5,
            current: 1,
            recurrenceAt: new Date("2024-10-04"),
            recurrenceType: Recurrence.MONTHLY,
            createdAt: new Date("2024-10-04"),
            updatedAt: new Date("2024-10-04"),
          }
        ],
        createdAt: new Date("2024-10-04"),
        updatedAt: new Date("2024-10-04"),
      },
      createdAt: new Date("2024-10-04"),
      updatedAt: new Date("2024-10-04"),
    },
    {
      id: crypto.randomUUID(),
      title: "Pix Enviado",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-10-04"),
        paymentDate: new Date("2024-10-04"),
        method: PaymentMethod.PIX,
        recurrences: [
          {
            id: crypto.randomUUID(),
            amount: 150.0,
            current: 1,
            recurrenceAt: new Date("2024-10-04"),
            recurrenceType: Recurrence.MONTHLY,
            createdAt: new Date("2024-10-04"),
            updatedAt: new Date("2024-10-04"),
          }
        ],
        createdAt: new Date("2024-10-04"),
        updatedAt: new Date("2024-10-04"),
      },
      createdAt: new Date("2024-10-04"),
      updatedAt: new Date("2024-10-04"),
    },
    {
      id: crypto.randomUUID(),
      title: "Pagamento realizado / Pagamento recebido",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-10-03"),
        paymentDate: new Date("2024-10-03"),
        method: PaymentMethod.TRANSFER,
        recurrences: [
          {
            id: crypto.randomUUID(),
            amount: 5.72,
            current: 1,
            recurrenceAt: new Date("2024-10-03"),
            recurrenceType: Recurrence.ONCE,
            createdAt: new Date("2024-10-03"),
            updatedAt: new Date("2024-10-03"),
          }
        ],
        createdAt: new Date("2024-10-03"),
        updatedAt: new Date("2024-10-03"),
      },
      createdAt: new Date("2024-10-03"),
      updatedAt: new Date("2024-10-03"),
    },
    {
      id: crypto.randomUUID(),
      title: "Pagamento realizado / Pagamento recebido",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-09-29"),
        paymentDate: new Date("2024-09-29"),
        method: PaymentMethod.TRANSFER,
        recurrences: [
          {
            id: crypto.randomUUID(),
            amount: 15.0,
            current: 1,
            recurrenceAt: new Date("2024-09-29"),
            recurrenceType: Recurrence.ONCE,
            createdAt: new Date("2024-09-29"),
            updatedAt: new Date("2024-09-29"),
          }
        ],
        createdAt: new Date("2024-09-29"),
        updatedAt: new Date("2024-09-29"),
      },
      createdAt: new Date("2024-09-29"),
      updatedAt: new Date("2024-09-29"),
    },
    {
      id: crypto.randomUUID(),
      title: "Pix Enviado",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-09-28"),
        paymentDate: new Date("2024-09-28"),
        method: PaymentMethod.PIX,
        recurrences: [
          {
            id: crypto.randomUUID(),
            amount: 16.0,
            current: 1,
            recurrenceAt: new Date("2024-09-28"),
            recurrenceType: Recurrence.ONCE,
            createdAt: new Date("2024-09-28"),
            updatedAt: new Date("2024-09-28"),
          }
        ],
        createdAt: new Date("2024-09-28"),
        updatedAt: new Date("2024-09-28"),
      },
      createdAt: new Date("2024-09-28"),
      updatedAt: new Date("2024-09-28"),
    },
    {
      id: crypto.randomUUID(),
      title: "Pix Enviado",
      institution: institutions[0],
      payment: {
        id: crypto.randomUUID(),
        dueDate: new Date("2024-09-17"),
        paymentDate: new Date("2024-09-17"),
        method: PaymentMethod.PIX,
        recurrences: [
          {
            id: crypto.randomUUID(),
            amount: 5.03,
            current: 1,
            recurrenceAt: new Date("2024-09-17"),
            recurrenceType: Recurrence.ONCE,
            createdAt: new Date("2024-09-17"),
            updatedAt: new Date("2024-09-17"),
          }
        ],
        createdAt: new Date("2024-09-17"),
        updatedAt: new Date("2024-09-17"),
      },
      createdAt: new Date("2024-09-17"),
      updatedAt: new Date("2024-09-17"),
    }
  ];
  const chartData: Array<ChartData> = [{ month: "Janeiro", salaries: 186, expenses: 80 }];

  function formattedCurrencyValue(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  }

  const currentSalary: number = salaries.reduce((acc, salary) => {
    if (
      salary.payment.paymentDate?.getMonth() === currentDate.getMonth() &&
      salary.payment.paymentDate?.getFullYear() === currentDate.getFullYear()
    ) {
      return salary.payment.recurrences[0].amount + acc;
    }
    return acc;
  }, 0);

  const previousSalary: number = salaries.reduce((acc, salary) => {
    if (
      salary.payment.paymentDate?.getMonth() === currentDate.getMonth() - 1 &&
      salary.payment.paymentDate?.getFullYear() === currentDate.getFullYear()
    ) {
      return salary.payment.amount + acc;
    }
    return acc;
  }, 0);

  const currentExpense: number = expenses.reduce((acc, expense) => {
    if (
      expense.payment.paymentDate?.getMonth() === currentDate.getMonth() &&
      expense.payment.paymentDate?.getFullYear() === currentDate.getFullYear()
    ) {
      return expense.payment.amount + acc;
    }
    return acc;
  }, 0);

  const previousExpense: number = expenses.reduce((acc, expense) => {
    if (
      expense.payment.paymentDate?.getMonth() === currentDate.getMonth() - 1 &&
      expense.payment.paymentDate?.getFullYear() === currentDate.getFullYear()
    ) {
      return expense.payment.amount + acc;
    }
    return acc;
  }, 0);

  function getSalaryDifferenceMessage(): string {
    if (previousSalary === 0) {
      return "Salário anterior foi igual a 0.";
    }

    const difference =
      ((currentSalary - previousSalary) / previousSalary) * 100;
    const formattedDifference = Math.abs(difference).toFixed(2);

    if (difference > 0) {
      return `Você recebeu +${formattedDifference}% comparado ao mês anterior.`;
    } else if (difference < 0) {
      return `Você recebeu -${formattedDifference}% comparado ao mês anterior.`;
    }
    return "Salário atual é igual ao salário anterior.";
  }

  function getExpenseDifferenceMessage(): string {
    if (previousExpense === 0) {
      return "Você não gastou nenhum valor no mês anterior.";
    }

    const difference =
      ((currentExpense - previousExpense) / previousExpense) * 100;
    const formattedDifference = Math.abs(difference).toFixed(2);

    if (difference > 0) {
      return `Você gastou +${formattedDifference}% comparado ao mês anterior.`;
    } else if (difference < 0) {
      return `Você gastou -${formattedDifference}% comparado ao mês anterior.`;
    }
    return "Gasto atual é igual ao gasto anterior.";
  }

  function getLastWeekExpenses(): Array<Expense> {
    const lastWeekDate = new Date();
    lastWeekDate.setDate(currentDate.getDate() - 7);

    return expenses.filter(
      (expense) =>
        expense.isPaid &&
        expense.paymentDate &&
        new Date(expense.paymentDate) >= lastWeekDate &&
        new Date(expense.paymentDate) <= currentDate,
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between space-y-4">
      {/* TODO: HEADER */}
      <nav className="w-full bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2 lg:h-10 lg:w-10 lg:mr-4">
                  <AvatarImage
                    src={String(user?.image)}
                    alt={String(user?.name)}
                  />
                  <AvatarFallback>
                    {String(user?.name).charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium capitalize">
                  {String(user?.name)}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 lg:space-x-8">
              <ThemeToggleButton />
              <LogoutForm />
            </div>
          </div>
        </div>
      </nav>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 bg-red-500">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 bg-sky-500">
          {/* TODO: CARDS */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 bg-orange-500">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Your Orders</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Introducing Our Dynamic Orders Dashboard for Seamless
                  Management and Insightful Analysis.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button>Create New Order</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>Ganhos Este Mês</CardDescription>
                <CardTitle className="text-4xl">
                  {formattedCurrencyValue(currentSalary)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {getSalaryDifferenceMessage()}
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={currentSalary}
                  max={currentSalary}
                  aria-label={getSalaryDifferenceMessage()}
                />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>Gastos Este Mês</CardDescription>
                <CardTitle className="text-4xl">
                  {formattedCurrencyValue(currentExpense)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {getExpenseDifferenceMessage()}
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={currentExpense}
                  max={currentSalary}
                  aria-label={getExpenseDifferenceMessage()}
                />
              </CardFooter>
            </Card>
          </div>
          <Tabs defaultValue="week">
            <div className="flex items-center bg-pink-600">
              <TabsList>
                <TabsTrigger value="week">Semana</TabsTrigger>
                <TabsTrigger value="month">Mês</TabsTrigger>
                <TabsTrigger value="year">Ano</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="week">
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                  <CardTitle>Gastos Recentes</CardTitle>
                  <CardDescription>
                    Gastos dos últimos 7 dias com base nos seus registros.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descrição</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Método
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Situação
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Data de Pagamento
                        </TableHead>
                        <TableHead>Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getLastWeekExpenses().map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell>
                            <div className="font-medium">
                              {expense.title}
                            </div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              {expense.institution.name}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {expense.payment.method}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="outline">
                              {expense.payment.recurrences[expense.payment.recurrences.length - 1].recurrenceAt ? "Pago" : "Pendente"}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {expense.payment.recurrences[expense.payment.recurrences.length - 1].recurrenceAt?.toLocaleDateString("pt-BR")}
                          </TableCell>
                          <TableCell className="text-left">
                            {formattedCurrencyValue(expense.payment.recurrences[expense.payment.recurrences.length - 1].amount)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="bg-emerald-300">
          {/* <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Order Oe31b70H
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Order ID</span>
                  </Button>
                </CardTitle>
                <CardDescription>Date: November 23, 2023</CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <Truck className="h-3.5 w-3.5" />
                  <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    Track Order
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MoreVertical className="h-3.5 w-3.5" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Export</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Trash</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Order Details</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Glimmer Lamps x <span>2</span>
                    </span>
                    <span>$250.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Aqua Filters x <span>1</span>
                    </span>
                    <span>$49.00</span>
                  </li>
                </ul>
                <Separator className="my-2" />
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>$299.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>$5.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>$25.00</span>
                  </li>
                  <li className="flex items-center justify-between font-semibold">
                    <span className="text-muted-foreground">Total</span>
                    <span>$329.00</span>
                  </li>
                </ul>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <div className="font-semibold">Shipping Information</div>
                  <address className="grid gap-0.5 not-italic text-muted-foreground">
                    <span>Liam Johnson</span>
                    <span>1234 Main St.</span>
                    <span>Anytown, CA 12345</span>
                  </address>
                </div>
                <div className="grid auto-rows-max gap-3">
                  <div className="font-semibold">Billing Information</div>
                  <div className="text-muted-foreground">
                    Same as shipping address
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">Customer Information</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Customer</dt>
                    <dd>Liam Johnson</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>
                      <a href="mailto:">liam@acme.com</a>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd>
                      <a href="tel:">+1 234 567 890</a>
                    </dd>
                  </div>
                </dl>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">Payment Information</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-1 text-muted-foreground">
                      <CreditCard className="h-4 w-4" />
                      Visa
                    </dt>
                    <dd>**** **** **** 4532</dd>
                  </div>
                </dl>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <div className="text-xs text-muted-foreground">
                Updated <time dateTime="2023-11-23">November 23, 2023</time>
              </div>
              <Pagination className="ml-auto mr-0 w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <Button size="icon" variant="outline" className="h-6 w-6">
                      <ChevronLeft className="h-3.5 w-3.5" />
                      <span className="sr-only">Previous Order</span>
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button size="icon" variant="outline" className="h-6 w-6">
                      <ChevronRight className="h-3.5 w-3.5" />
                      <span className="sr-only">Next Order</span>
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card> */}
          <Chart />
        </div>
      </div>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </main>
  );
}
