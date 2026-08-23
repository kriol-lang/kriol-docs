FROM node:24-alpine AS builder

WORKDIR /app

COPY site/package*.json ./

RUN npm ci

COPY site/ ./

RUN npm run build

# Distroless: no shell, no package manager, only the node runtime and the
# static site. `serve` is dropped in favor of a small built-in-only static
# file server (site/serve.mjs), since there's no npm here to install it.
FROM gcr.io/distroless/nodejs24-debian12 AS runtime

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/serve.mjs ./serve.mjs

USER nonroot

EXPOSE 4321

CMD ["serve.mjs"]
