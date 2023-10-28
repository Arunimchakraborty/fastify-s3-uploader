const access_key = process.env.AWS_ACCESS_KEY
const secret_key = process.env.AWS_SECRET_ACCESS_KEY

if (!access_key || !secret_key) throw new Error("AWS Access Key or Secret Key not set")

export default {
  access_key: process.env.AWS_ACCESS_KEY,
  secret_key: process.env.AWS_SECRET_ACCESS_KEY
}