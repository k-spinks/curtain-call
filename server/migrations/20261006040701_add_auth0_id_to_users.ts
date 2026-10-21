import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', (table) => {
    table.text('auth0_id').unique().notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('users', function (table) {
    table.dropColumn('auth0_id');
  });
}
