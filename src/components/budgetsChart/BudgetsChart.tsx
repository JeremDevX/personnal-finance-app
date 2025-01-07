import { Data } from "@/utils/interfaces";
import styles from "./BudgetsChart.module.scss";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { lightenColor } from "@/utils/functions";

ChartJs.register(ArcElement, Tooltip, Legend);

export default function BudgetsChart({
  budgets,
}: {
  budgets: Data["budgets"];
}) {
  const data: ChartData<"doughnut"> = {
    labels: budgets.map((budget) => budget.category),
    datasets: [
      {
        data: budgets.map((budget) => budget.maximum),
        backgroundColor: budgets.map((budget) => budget.theme),
        hoverBackgroundColor: budgets.map((budget) => budget.theme),
        weight: 2,
        borderWidth: 0,
      },
      {
        data: budgets.map((budget) => budget.maximum),
        backgroundColor: budgets.map((budget) =>
          lightenColor(budget.theme, 0.08)
        ),
        hoverBackgroundColor: budgets.map((budget) =>
          lightenColor(budget.theme, 0.08)
        ),
        weight: 1,
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "60%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };
  return (
    <>
      <Doughnut data={data} options={options} />
    </>
  );
}
