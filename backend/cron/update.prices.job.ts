import cron from "node-cron";
import axios from "axios";

async function runUpdatePricesJob() {
  try {
    await axios.get("http://localhost:4000/api/update");
    console.log("Prices updated.");
  } catch (err: any) {
    console.error("Error running job:", err.message);
  }
}

function runUpdatePricesJobEveryMinute() {
  cron.schedule("*/1 * * * *", runUpdatePricesJob);
}

export function startCron() {
  runUpdatePricesJobEveryMinute();
}
