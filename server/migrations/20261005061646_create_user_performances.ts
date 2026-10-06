import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_performances', (table) => {
    table.increments('id');
    table.integer('user_id').references('id').inTable('users').notNullable();
    table
      .integer('performance_id')
      .references('id')
      .inTable('performances')
      .notNullable();
    table.unique(['user_id', 'performance_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_performances');
}
