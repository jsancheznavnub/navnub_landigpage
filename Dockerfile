# ----------------------------
# Etapa 1: Construcción (Builder)
# ----------------------------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Instalar pnpm
    RUN npm install -g pnpm
    
    # Copiar archivos de dependencias
    COPY package*.json ./
    COPY pnpm-lock.yaml ./
    
    # Instalar dependencias
    RUN pnpm install
    
    # Copiar todo el código fuente
    COPY . .
    
    # Construir la aplicación
    RUN pnpm build
    
    # ----------------------------
    # Etapa 2: Producción
    # ----------------------------
    FROM node:20-alpine AS production
    
    WORKDIR /app
    
    # Instalar pnpm
    RUN npm install -g pnpm
    
    # Copiar artefactos de compilación y configuración necesarios
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/pnpm-lock.yaml ./
    COPY --from=builder /app/next.config.* ./
    COPY --from=builder /app/genkit.config.* ./
    COPY --from=builder /app/tsconfig.json ./
    # Si tienes carpeta public, descomenta la siguiente línea
    #COPY --from=builder /app/public ./public
    
    # Instalar solo dependencias de producción
    RUN pnpm install --prod
    
    # Exponer el puerto (ajusta si usas otro)
    EXPOSE 3000
    
    # Comando por defecto para iniciar la aplicación
    CMD ["pnpm", "start"]