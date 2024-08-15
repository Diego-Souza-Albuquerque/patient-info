# Etapa de construção
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências
COPY package.json yarn.lock ./

# Instalação de todas as dependências
RUN yarn install

# Copia o restante dos arquivos do projeto
COPY . .

# Constrói a aplicação para produção
RUN yarn build

# Etapa de produção
FROM node:18-alpine

WORKDIR /app

# Copia apenas os arquivos necessários da etapa de construção
COPY --from=builder /app ./

# Limpeza de cache para reduzir o tamanho da imagem final
RUN npm cache clean --force

# Expor a porta
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["yarn", "start"]
