const bucketName = process.env.S3_BucketName

if (!bucketName) throw new Error("S3 Bucket Name not set")

export default {
  bucketName: bucketName
}