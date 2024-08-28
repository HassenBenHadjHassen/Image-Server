import setupExpressServer from "./server-creator";

const startup = async (): Promise<void> => {
  await new Promise<void>((resolve) => {
    setupExpressServer();
    resolve();
  });
};

startup().catch((error: Error | any) => {
  throw error;
});
