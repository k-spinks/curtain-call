import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('external_shows', (table) => {
    table.increments('id');
    table
      .integer('production_id')
      .references('id')
      .inTable('productions')
      .notNullable();
    table.text('provider').notNullable();
    table.text('external_id').notNullable();
    table.unique(['provider', 'external_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('external_shows');
}
