import express, { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export const setupExpressServer = (): void => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware to serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/", (_req: Request, res: Response) => {
    res.send("Hi");
  });

  // Route to handle image requests
  app.get("/images/:imageName", async (req: Request, res: Response) => {
    const { imageName } = req.params;
    const imagesDirectory = path.join(__dirname, "images");

    try {
      // Read files in the directory once
      const files = await fs.readdir(imagesDirectory);
      // Find the file with matching name prefix
      const matchingFile = files.find((file) => file.startsWith(imageName));

      if (!matchingFile) {
        return res.status(404).send("Image not found");
      }

      const imagePath = path.join(imagesDirectory, matchingFile);
      console.log("Serving image:", imagePath);
      return res.sendFile(imagePath);
    } catch (err) {
      console.error("Error handling image request:", err);
      return res.status(500).send("Internal Server Error");
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupExpressServer;
