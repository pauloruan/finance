"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A multiple bar chart"

const chartData = [
  { month: "Janeiro", ganhos: 186, gastos: 80 },
  { month: "Fevereiro", ganhos: 305, gastos: 200 },
  { month: "Março", ganhos: 237, gastos: 120 },
  { month: "Abril", ganhos: 73, gastos: 190 },
  { month: "Maio", ganhos: 209, gastos: 130 },
  { month: "Junho", ganhos: 214, gastos: 140 },
  { month: "Julho", ganhos: 188, gastos: 160 },
  { month: "Agosto", ganhos: 187, gastos: 170 },
  { month: "Setembro", ganhos: 181, gastos: 180 },
  { month: "Outubro", ganhos: 180, gastos: 190 },
  { month: "Novembro", ganhos: 178, gastos: 200 },
  { month: "Dezembro", ganhos: 175, gastos: 210 },
]

const chartConfig = {
  ganhos: {
    label: "Ganhos",
    color: "hsl(var(--chart-1))",
  },
  gastos: {
    label: "Gastos",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Chart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico em Barra - Múltiplo</CardTitle>
        <CardDescription>Janeiro - Dezembro 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="ganhos" fill="var(--color-ganhos)" radius={4} />
            <Bar dataKey="gastos" fill="var(--color-gastos)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          alguma coisa aqui
        </div>
        <div className="leading-none text-muted-foreground">
          Exibindo o comparativo entre ganhos e custos anual
        </div>
      </CardFooter>
    </Card>
  )
}
