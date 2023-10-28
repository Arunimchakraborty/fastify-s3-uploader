import { FastifyPluginAsync } from "fastify";
import config from "../configs/config";
import s3bucket from "../services/s3bucket";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	const { access_key, secret_key } = config;
	const { uploadToS3 } = s3bucket;
	fastify.post("/", async function (request: any, reply) {
		const { req_access_key, req_secret_key } = request.headers;
		if (!req_access_key || !req_secret_key)
			return reply
				.code(400)
				.send({ message: "Access Key and Secret Key not provided" });
		if (req_access_key != access_key)
			return reply.send(400).send({ message: "Access Key does not match" });
		if (req_secret_key != secret_key)
			return reply.send(400).send({ message: "Secret Key does not match" });

		const key = request.body.key;
		const body = request.body.body;
		if (!key || !body)
			return reply
				.code(400)
				.send({ message: "Key and Body not set in request body" });
		try {
			await uploadToS3(key, body).then(() => {
				return reply.code(200).send({ message: "Success" });
			});
		} catch (error) {
			return reply.code(500).send({ message: error });
		}
	});
};

export default root;
