/*
 * @Author: linxiaozhou.com
 */
import fs from "fs-extra";

import { SchemaParser } from "../core/schema-parser.class";

const exportRootPath = `./docs/exports/schemas`;

function parseSchema(schema, schemaName = "Schema") {
  const parser = new SchemaParser(schema);
  parser.run();
  const data = parser.getSwaggerJsonObject();
  const swaggerJson = {
    definitions: {
      [schemaName]: {
        properties: data || {},
      },
    },
  };
  return `// Auto generated by tools.\nexport default ${JSON.stringify(swaggerJson, null, 2)};`;
}

export const run = async schemas => {
  const exists = await fs.pathExists(exportRootPath);
  if (!exists) {
    await fs.mkdirs(exportRootPath);
  }

  for (let index = 0; index < schemas.length; index++) {
    const element = schemas[index];
    const { filename, schemaName, schema } = element;
    const filenameFull = `${filename}.schema.js`;
    const data = parseSchema(schema, schemaName);
    const exportPath = `${exportRootPath}/${filenameFull}`;
    fs.writeFileSync(`${exportPath}`, data, "utf8");
  }

  console.log(`✨ Export Schema files to: ${exportRootPath}`);
};