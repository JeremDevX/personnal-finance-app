import Balance from "@/components/balance/Balance";
import styles from "./page.module.scss";
import { Data } from "@/utils/interfaces";
import { promises as fs } from "fs";
import Pots from "@/components/pots/Pots";

export default async function OverviewPage() {
  const file = await fs.readFile(process.cwd() + "/src/app/data.json", "utf8");
  const data: Data = JSON.parse(file);

  return (
    <main className={`${styles.overview}`}>
      <h1 className={styles.overview__title}>Overview</h1>
      <Balance balance={data.balance} />
      <Pots pots={data.pots} />
    </main>
  );
}
