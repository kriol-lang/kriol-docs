FROM node:24-alpine AS builder

WORKDIR /app

COPY site/package*.json ./

RUN npm ci

COPY site/ ./

RUN npm run build

# Distroless: no shell, no package manager, only the node runtime and the
# static site. `serve` is dropped in favor of a small built-in-only static
# file server (site/serve.mjs), since there's no npm here to install it.
FROM gcr.io/distroless/nodejs24-debian13 AS runtime

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/serve.mjs ./serve.mjs

USER nonroot

EXPOSE 4321

# Docker marks the container unhealthy when / stops answering; the host's
# watchdog reports that. Distroless: node is the only binary to probe with.
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD ["/nodejs/bin/node", "-e", "fetch(`http://127.0.0.1:${process.env.PORT || 4321}/`).then(r => process.exit(r.ok ? 0 : 1), () => process.exit(1))"]

CMD ["serve.mjs"]
