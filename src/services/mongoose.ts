// ESM
import fp from "fastify-plugin";
import mongoDB from "../configs/DB/MongoDB/mongoDB";
import mongoose from "mongoose";

export interface mongooseOptions {}

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default fp<mongooseOptions>(async (fastify, options) => {
	// Deconstructed the env files
	// Registed fastify mongo
	try {
		// Mongoose connection
		await mongoose.connect(mongoDB.url);

		// Successful connection
		fastify.log.info("Connected to MongoDB");
	} catch (err) {
		// Connection error
		fastify.log.error("MongoDB connection error", err);
		fastify.log.error(err);
	}

	// Decorate Fastify with mongoose instance
	fastify.decorate("mongoose", mongoose);

	// Hook to close the Mongoose connection when Fastify is shutting down
	fastify.addHook("onClose", (fastify, done) => {
		mongoose.connection.close().then((res) => {
			fastify.log.info("Mongoose connection closed");
			done();
		});
	});
});

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
