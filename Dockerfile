# Sử dụng ảnh base node v14.16.1
FROM node:19-alpine AS builder

# Tạo thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY . .

# Cài đặt các dependencies
RUN npm install 

# Sao chép toàn bộ mã nguồn của ứng dụng vào thư mục làm việc


# Build production build

FROM node:19-alpine AS runner

# Tạo thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY . .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json



# Expose port 3000 để có thể truy cập ứng dụng từ bên ngoài container
EXPOSE 3000

# Chạy ứng dụng bằng lệnh 'npm start'
CMD ["npm", "start"]