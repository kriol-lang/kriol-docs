FROM node:24-alpine AS builder

WORKDIR /app

COPY site/package*.json ./

RUN npm ci

COPY site/ ./

RUN npm run build

FROM node:24-alpine AS runtime

RUN addgroup -S kriol && adduser -S kriol -G kriol

WORKDIR /app

RUN npm install -g serve@14

COPY --from=builder /app/dist ./dist

USER kriol

EXPOSE 4321

CMD ["serve", "dist", "--listen", "4321"]
