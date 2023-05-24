import os from 'os';
import path from 'path';
import { INTEGER, Sequelize, STRING } from 'sequelize';

import { User, Customer } from './models';

console.log(path.join(os.tmpdir(), 'db.sqlite'));

const sequelize = new Sequelize('DID-database', '', undefined, {
	dialect: 'sqlite',
	storage: path.join(os.tmpdir(), 'db.sqlite'),
	logging: false,
});

// Init all models
User.init(
	{
		nonce: {
			allowNull: false,
			type: INTEGER.UNSIGNED, // SQLITE will use INTEGER
			defaultValue: (): number => Math.floor(Math.random() * 10000), // Initialize with a random nonce
		},
		publicAddress: {
			allowNull: false,
			type: STRING,
			unique: true,
			validate: { isLowercase: true },
		},
		username: {
			type: STRING,
			unique: true,
		},
	},
	{
		modelName: 'user',
		sequelize, // This bit is important
		timestamps: false,
	}
);

Customer.init(
	{
		id: {
			type: INTEGER,
			primaryKey: true
		},
		name: {
			type: STRING,
			defaultValue: "Unknown"
		},
		gender: {
			type: STRING,
			defaultValue: "Unknown"
		}, 
		nationality: {
			type: STRING,
			defaultValue: "Unknown"
		},
		DOB: {
			type: STRING,
			defaultValue: "Unknown"
		},
	},
	{
		modelName: 'customer',
		sequelize,

	}
);

// Create new tables
sequelize.sync();

export { sequelize };
