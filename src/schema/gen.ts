import {primaryKey, sqliteTable, text} from "drizzle-orm/sqlite-core";
import {apples} from "./apples.ts";

export const gen = sqliteTable("gen", {
  parent_name: text('parent_name').notNull().references(() => apples.name),
  child_name: text('child_name').notNull().references(() => apples.name),
  relation: text('relation').notNull()
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.parent_name, table.child_name, table.relation] })
  }
})