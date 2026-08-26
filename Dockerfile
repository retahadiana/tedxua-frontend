# Stage 1: Build aplikasi
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Masukkan URL Backend ke dalam environment saat proses build
ENV VITE_API_URL=https://api.tedxuniversitasairlangga.com/api/v1
ENV NEXT_PUBLIC_API_URL=https://api.tedxuniversitasairlangga.com/api/v1
RUN npm run build

# Stage 2: Serve aplikasi dengan Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html 
# Catatan: ganti /app/dist menjadi /app/out atau /app/build jika kamu memakai Next.js/CRA
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]