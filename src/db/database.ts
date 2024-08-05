import { Kysely } from 'kysely';
import { DB } from './types/kysesly';

export class Database extends Kysely<DB> {}
