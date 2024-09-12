import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  'postgresql://budgetDB_owner:LvQxyu9hFB2I@ep-gentle-meadow-a5waz16d.us-east-2.aws.neon.tech/budgetDB?sslmode=require'
);
export const db = drizzle(sql, { schema });
