export default ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3", // works because Cloudflare R2 is S3-compatible
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env("R2_ACCESS_KEY_ID"),
            secretAccessKey: env("R2_SECRET_ACCESS_KEY"),
          },
          endpoint: env("R2_ENDPOINT"),
          region: "auto",
        },
        params: {
          Bucket: env("R2_BUCKET"),
          ACL: "public-read",
        },
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
