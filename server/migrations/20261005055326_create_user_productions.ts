import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_productions', (table) => {
    table.increments('id');
    table.integer('user_id').references('id').inTable('users').notNullable();
    table
      .integer('production_id')
      .references('id')
      .inTable('productions')
      .notNullable();
    table
      .enu('status', ['want_to_see', 'going', 'seen'])
      .defaultTo('want_to_see')
      .notNullable();
    table.integer('rating');
    table.check(
      '?? >= 1 AND ?? <= 5',
      ['rating', 'rating'],
      'chk_rating_range',
    );
    table.text('notes');
    table.integer('times_viewed').defaultTo(0).notNullable();
    table.check('?? >= 0', ['times_viewed'], 'chk_times_viewed');
    table.unique(['user_id', 'production_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_productions');
}
