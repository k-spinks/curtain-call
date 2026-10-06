import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('performances', (table) => {
    table.increments('id');
    table
      .integer('production_id')
      .references('id')
      .inTable('productions')
      .notNullable();
    table.integer('external_performance_id').notNullable();
    table.text('venue').notNullable();
    table.text('location').notNullable();
    table.timestamp('start_time', { useTz: true }).notNullable();
    table.text('url');
    table.text('image_url');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('performances');
}
