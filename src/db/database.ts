import { Kysely } from 'kysely';
import { DB } from './types/types';

export class Database extends Kysely<DB> {}
