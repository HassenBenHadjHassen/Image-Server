declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DEPLOYMENT_KEY: string;
      DEPLOYMENT_USER: string;
      DEPLOYMENT_HOST: string;
      DEPLOYMENT_REPO: string;
      DEPLOYMENT_PATH: string;
    }
  }
}

export {};
