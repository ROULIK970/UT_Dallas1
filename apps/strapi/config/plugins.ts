export default ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3", // works because Cloudflare R2 is S3-compatible
      providerOptions: {
        credentials: {
          accessKeyId: env("R2_ACCESS_KEY_ID"),
          secretAccessKey: env("R2_SECRET_ACCESS_KEY"),
        },
        endpoint: env("R2_ENDPOINT"),
        region: "us-east-1",
        s3ForcePathStyle: true,

        params: {
          Bucket: env("R2_BUCKET"),
          ACL: "public-read",
        },
        baseUrl: env("R2_PUBLIC_URL"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },

  seo: { enabled: true },
  "config-sync": { enabled: true },
  "strapi-v5-plugin-populate-deep": { config: { defaultDepth: 5 } },
  "users-permissions": { config: { jwt: { expiresIn: "30d" } } },
  sentry: {
    enabled: true,
    config: {
      dsn: env("NODE_ENV") === "production" ? env("SENTRY_DSN") : null,
      sendMetadata: true,
    },
  },
})
