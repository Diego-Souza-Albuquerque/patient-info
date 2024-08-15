# Etapa de construção
FROM node:18-alpine AS builder

WORKDIR /usr/app

# Copia os arquivos de dependências
COPY package*.json ./

# Instalação das dependências (usando cache)
RUN npm install --production

# Copia o restante dos arquivos do projeto
COPY . .

# Etapa de produção
FROM node:18-alpine

WORKDIR /usr/app

# Copia apenas os arquivos necessários da etapa de construção
COPY --from=builder /usr/app ./

# Limpeza de cache para reduzir o tamanho da imagem final
RUN npm cache clean --force

# Expor a porta
EXPOSE 4000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
