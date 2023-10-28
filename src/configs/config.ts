const access_key = process.env.API_ACCESS_KEY
const secret_key = process.env.API_SECRET_KEY

if (!access_key || !secret_key)
	throw new Error("Server Access Key and Secret Key not set");

export default { access_key, secret_key };
