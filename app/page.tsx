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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Chart } from "./_components/Chart";

// export const description =
//   "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information.";

enum PaymentMethod {
  PIX = "PIX",
  CASH = "DINHEIRO",
  DEPOSIT = "DEPÓSITO",
  VA = "VALE ALIMENTAÇÃO",
  TRANSFER = "TRANSFERÊNCIA",
  DEBIT = "CARTÃO DE DÉBITO",
  CREDIT = "CARTÃO DE CRÉDITO",
}

// enum Recurrence {
//   ONCE = "ÚNICA",
//   DAILY = "DIÁRIA",
//   WEEKLY = "SEMANAL",
//   MONTHLY = "MENSAL",
//   QUARTERLY = "TRIMESTRAL",
//   SEMIANNUALLY = "SEMESTRAL",
//   YEARLY = "ANUAL",
// }

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

// interface Payment { // TODO: Renomear para "Transaction"
interface Transaction {
  id: string;
  method: PaymentMethod;
  amount: number;
  count: number;
  dueDate: Date;
  paymentDate: Date | null;
  recurrenceAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface FinancialRecord {
  id: string;
  title: string;
  institution: Institution;
  transactions: Array<Transaction>;
  createdAt: Date;
  updatedAt: Date;
}

interface Expense extends FinancialRecord {
  type: "expense";
}

interface Income extends FinancialRecord {
  type: "income";
}

// interface ChartData {
//   month: string;
//   salaries: number;
//   expenses: number;
// }

interface EnrichedTransaction extends Transaction {
  parentTitle: string;
  parentInstitution: Institution;
  type: "income" | "expense";
}

// TODO: Referência -> https://dribbble.com/shots/22462116-Mobile-Banking-Mobile-App-Screens
// TODO: Implementar:

export default async function Home() {
  let user = undefined;
  const session = await auth();
  console.log("session:", JSON.stringify(session, null, 2));
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
  ];
  const incomes: Array<Income> = [
    {
      id: crypto.randomUUID(),
      type: "income",
      title: "Salário",
      institution: institutions[0],
      transactions: [
        {
          id: crypto.randomUUID(),
          method: PaymentMethod.DEPOSIT,
          amount: 3000,
          count: 1,
          dueDate: new Date("2025-08-10T00:00:00"),
          paymentDate: new Date("2025-08-10T00:00:00"),
          recurrenceAt: new Date("2025-08-10T00:00:00"),
          createdAt: new Date("2025-08-10T00:00:00"),
          updatedAt: new Date("2025-08-10T00:00:00"),
        },
        {
          id: crypto.randomUUID(),
          method: PaymentMethod.DEPOSIT,
          amount: 3000,
          count: 2,
          dueDate: new Date("2025-09-10T00:00:00"),
          paymentDate: null,
          recurrenceAt: new Date("2025-08-10T00:00:00"),
          createdAt: new Date("2025-08-10T00:00:00"),
          updatedAt: new Date("2025-08-10T00:00:00"),
        },
      ],
      createdAt: new Date("2025-08-10T00:00:00"),
      updatedAt: new Date("2025-08-10T00:00:00"),
    },
  ];

  const expenses: Array<Expense> = [
    {
      id: crypto.randomUUID(),
      type: "expense",
      title: "Aluguel",
      institution: institutions[1],
      transactions: [
        {
          id: crypto.randomUUID(),
          method: PaymentMethod.PIX,
          amount: 500,
          count: 1,
          dueDate: new Date("2025-08-10T00:00:00"),
          paymentDate: new Date("2025-08-10T00:00:00"),
          recurrenceAt: new Date("2025-08-10T00:00:00"),
          createdAt: new Date("2025-08-10T00:00:00"),
          updatedAt: new Date("2025-08-10T00:00:00"),
        },
        {
          id: crypto.randomUUID(),
          method: PaymentMethod.PIX,
          amount: 500,
          count: 2,
          dueDate: new Date("2025-09-10T00:00:00"),
          paymentDate: null,
          recurrenceAt: new Date("2025-08-10T00:00:00"),
          createdAt: new Date("2025-08-10T00:00:00"),
          updatedAt: new Date("2025-08-10T00:00:00"),
        },
      ],
      createdAt: new Date("2025-08-10T00:00:00"),
      updatedAt: new Date("2025-08-10T00:00:00"),
    },
  ];

  // const chartData: Array<ChartData> = [
  //   { month: "Janeiro", salaries: 186, expenses: 80 },
  // ];

  function formattedCurrencyValue(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  }

  function formattedDate(date: Date | null | undefined): string {
    if (!date) {
      return "Pagamento não efetuado";
    }

    const dateObj = new Date(date);

    return dateObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  // 1. Filter: Pega apenas os 'incomes' que são do mês/ano atual.
  const incomesThisMonth = incomes.filter((income) =>
    income.transactions.some((transaction) => {
      if (!transaction.paymentDate) return false;
      const transactionDate = new Date(transaction.paymentDate.toString());

      // Usando a lógica UTC que definimos
      return (
        transactionDate.getUTCMonth() === currentDate.getUTCMonth() &&
        transactionDate.getUTCFullYear() === currentDate.getUTCFullYear()
      );
    }),
  );

  // 2. FlatMap: Extrai TODAS as transações de todos os incomes filtrados em um único array.
  const allTransactionsThisMonth = incomesThisMonth.flatMap(
    (income) => income.transactions,
  );

  // 3. Reduce: Agora, com um array simples de transações, faz a soma final.
  const currentSalary = allTransactionsThisMonth.reduce(
    (acc, transaction) => acc + transaction.amount,
    0,
  );

  console.log("incomesThisMonth:", incomesThisMonth);
  console.log("allTransactionsThisMonth:", allTransactionsThisMonth);
  console.log("Salário do mês atual:", currentSalary);

  const currentExpense: number = expenses.reduce((acc, expense) => {
    // verificar se o expense é do mês atual
    if (
      expense.transactions.some(
        (transaction) =>
          transaction.paymentDate &&
          new Date(transaction.paymentDate).getMonth() ===
            currentDate.getMonth() &&
          new Date(transaction.paymentDate).getFullYear() ===
            currentDate.getFullYear(),
      )
    ) {
      return (
        acc +
        expense.transactions.reduce(
          (acc, transaction) => acc + transaction.amount,
          0,
        )
      );
    }
    return acc;
  }, 0);

  const previousSalary: number = incomes.reduce((acc, income) => {
    // verificar se o income é do mês anterior
    if (
      income.transactions.some(
        (transaction) =>
          transaction.paymentDate &&
          new Date(transaction.paymentDate).getMonth() ===
            currentDate.getMonth() - 1 &&
          new Date(transaction.paymentDate).getFullYear() ===
            currentDate.getFullYear(),
      )
    ) {
      return (
        acc +
        income.transactions.reduce(
          (acc, transaction) => acc + transaction.amount,
          0,
        )
      );
    }
    return acc;
  }, 0);

  const previousExpense: number = expenses.reduce((acc, expense) => {
    // verificar se o expense é do mês anterior
    if (
      expense.transactions.some(
        (transaction) =>
          transaction.paymentDate &&
          new Date(transaction.paymentDate).getMonth() ===
            currentDate.getMonth() - 1 &&
          new Date(transaction.paymentDate).getFullYear() ===
            currentDate.getFullYear(),
      )
    ) {
      return (
        acc +
        expense.transactions.reduce(
          (acc, transaction) => acc + transaction.amount,
          0,
        )
      );
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

  // function getLastWeekExpenses(): Array<Expense> {
  //   const lastWeekDate = new Date();
  //   lastWeekDate.setDate(currentDate.getDate() - 7);

  //   return expenses.filter((expense) =>
  //     expense.transactions.some(
  //       (transaction) =>
  //         transaction.paymentDate &&
  //         new Date(transaction.paymentDate) >= lastWeekDate &&
  //         new Date(transaction.paymentDate) <= currentDate,
  //     ),
  //   );
  // }

  const getAllRecords = (
    incomesList: Income[],
    expensesList: Expense[],
  ): EnrichedTransaction[] => {
    const enrichedIncomes: EnrichedTransaction[] = incomesList.flatMap(
      (income) =>
        income.transactions.map((transaction) => ({
          ...transaction,
          parentTitle: income.title,
          parentInstitution: income.institution,
          type: "income",
        })),
    );

    const enrichedExpenses: EnrichedTransaction[] = expensesList.flatMap(
      (expense) =>
        expense.transactions.map((transaction) => ({
          ...transaction,
          parentTitle: expense.title,
          parentInstitution: expense.institution,
          type: "expense",
        })),
    );

    return [...enrichedIncomes, ...enrichedExpenses].sort(
      (a, b) => b.dueDate.getTime() - a.dueDate.getTime(),
    );
  };

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
            </Card>
          </div>
          <Tabs defaultValue="all">
            <div className="flex items-center bg-pink-600">
              <TabsList>
                <TabsTrigger value="all">Todos Registros</TabsTrigger>
                <TabsTrigger value="month">Saídas</TabsTrigger>
                <TabsTrigger value="year">Entradas</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                  <CardTitle>Registros Recentes</CardTitle>
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
                          Data do Pagamento
                        </TableHead>
                        <TableHead>Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getAllRecords(incomes, expenses).map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div className="font-medium">
                              {record.parentTitle}
                            </div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              {record.parentInstitution.name}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {record.method}
                          </TableCell>
                          {/*<TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="outline">
                              {record.paymentDate ? "Pago" : "Pendente"}
                            </Badge>
                          </TableCell> */}
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={cn("text-xs font-medium", {
                                "text-blue-700 border-blue-300 dark:text-blue-400 dark:border-blue-500":
                                  record.paymentDate,
                                "text-amber-700 border-amber-400 dark:text-amber-300 dark:border-amber-500":
                                  !record.paymentDate,
                              })}
                            >
                              {record.paymentDate ? "Pago" : "Pendente"}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formattedDate(record.paymentDate)}
                          </TableCell>
                          <TableCell className="text-left">
                            <span
                              className={
                                record.type === "income"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {formattedCurrencyValue(record.amount)}
                            </span>
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
