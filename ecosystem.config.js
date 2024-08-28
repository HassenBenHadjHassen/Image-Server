const dotenv = require("dotenv");

dotenv.config();

const config = {
  apps: [
    {
      name: "image-server",
      script: "./dist/src/index.js",
      max_memory_restart: "300M",
      autorestart: true,
    },
  ],
};

module.exports = config;
