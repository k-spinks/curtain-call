import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('productions', (table) => {
    table.increments('id');
    table.text('name').notNullable();
    table.integer('show_id').references('id').inTable('shows').notNullable();
    table
      .integer('production_type_id')
      .references('id')
      .inTable('production_types')
      .notNullable();
    table.text('image_url');
    table.unique(['show_id', 'production_type_id', 'name']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('productions');
}
