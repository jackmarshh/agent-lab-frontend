# 第一阶段：构建
FROM node:20-alpine AS builder

WORKDIR /app
# 复制 package.json 和 lock 文件
COPY package*.json ./
# 如果用的是 pnpm
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# 复制源码并构建
COPY . .
RUN pnpm run build

# 第二阶段：运行 (使用轻量级 Nginx)
FROM nginx:alpine

# 将第一阶段的打包产物复制到 nginx 默认静态文件目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制自定义 nginx 配置 (解决前端路由和接口代理问题)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]