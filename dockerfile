# Étape 1 : Build (inchangée, mais vérifie bien la version de Node)
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Étape 2 : Serveur de production
FROM nginx:stable-alpine
# C'EST ICI QUE ÇA CHANGE : Ajout de /browser à la fin du chemin source
COPY --from=build /app/dist/epouvante/browser /usr/share/nginx/html
# Ajoute aussi la config Nginx pour le routage Angular (voir plus bas)
COPY nginx.conf /etc/nginx/conf.d/default.conf 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]