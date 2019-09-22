FROM node:12.10.0-alpine

LABEL "version"="0.1.0"
LABEL "repository"="https://github.com/Ybrin/secure-actions-webhook"
LABEL "homepage"="https://github.com/Ybrin/secure-actions-webhook"
LABEL "maintainer"="Koray Koska <koray@koska.at>"
LABEL "com.github.actions.name"="Secure Actions Webhook"
LABEL "com.github.actions.description"="Post data and an hmac signature to an endpoint"
LABEL "com.github.actions.icon"="message-square"
LABEL "com.github.actions.color"="gray-dark"

# Add the entry point
ADD main.js main.js
ADD package.json package.json
ADD entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

RUN npm install

# Load the entry point
ENTRYPOINT ["./entrypoint.sh"]
