/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import chalk from "chalk";
import config from "./config";
import app from "./app";

app.listen(config.APP_PORT, () => {
  console.log(chalk.green(`[Visit] http://localhost:${config.APP_PORT}${config.APP_ROUTE}`));
  console.log(chalk.green(`[Documentation] http://localhost:${config.APP_PORT}${config.APP_ROUTE}/doc`));
});

export default app;
