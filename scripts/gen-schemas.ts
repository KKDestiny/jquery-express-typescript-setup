/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: 导出项目swagger数据
 */
import { run } from "../src/specs/tools/schemas.tool";

import { schema as accountsSchema } from "../src/models/account.model";

const schemas = [
  {
    filename: "accounts",
    schemaName: "Accounts",
    schema: accountsSchema,
  },
];

async function exec() {
  console.log(`===================== Begin Generate Schemas =====================`);
  await run(schemas);
  console.log(`====================== End Generate Schemas ======================\n\n`);
}
exec();
