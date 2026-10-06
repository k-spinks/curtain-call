import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  console.log('about to insert');
  // Deletes ALL existing entries
  await knex('production_types').del();

  // Inserts seed entries
  await knex('production_types').insert([
    { name: 'Broadway' },
    { name: 'West End' },
    { name: 'Touring' },
  ]);
}
