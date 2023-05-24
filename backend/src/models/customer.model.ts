import { Model } from 'sequelize';

export class Customer extends Model {
	declare id: number; // Note that the `null assertion` `!` is required in strict mode.
	declare name: string;
    declare gender: string;
	declare nationality: string;
	declare DOB: string; // for nullable fields
}