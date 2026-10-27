import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('performances', (table) => {
    table.text('external_performance_id').notNullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('performances', function (table) {
    table.integer('external_performance_id').notNullable().alter();
  });
}
