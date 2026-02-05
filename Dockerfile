# Use Node.js LTS version
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application
COPY . .

# Build the project
RUN npm run build

# Expose port (Hugging Face uses PORT env variable)
ENV PORT=7860
EXPOSE 7860

# Start the application
CMD ["npm", "start"]
