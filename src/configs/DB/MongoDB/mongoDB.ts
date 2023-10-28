const mongoDB = {
	host: process.env.MONGODB_HOST,
	port: process.env.MONGODB_PORT,
	schema: process.env.MONGODB_SCHEMA,
	user: process.env.MONGODB_USER,
	password: process.env.MONGODB_PASSWORD,
}

const {user, password, host, port, schema} = mongoDB

if(!host || !port || !schema || !user || !password) {
	throw new Error("MongoDB Enviornment Variables not set correctly")
}

export default {
	url: `mongodb://${user}:${password}@${host}:${port}/${schema}`
}
