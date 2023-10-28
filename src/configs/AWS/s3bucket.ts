const bucketName = process.env.S3_BUCKET_NAME

if (!bucketName) throw new Error("S3 Bucket Name not set")

export default {
  bucketName: bucketName
}