import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('shows', (table) => {
    table.increments('id');
    table.text('title').notNullable();
    table.text('image_url');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('shows');
}
