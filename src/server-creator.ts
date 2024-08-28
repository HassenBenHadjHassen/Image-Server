import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export const setupExpressServer = (): void => {
  const app = express();
  const PORT = process.env.PORT;

  // Middleware to serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/", (_req: Request, res: Response) => {
    res.send("Hi");
  });

  // Route to handle image requests
  app.get("/images/:imageName", (req: Request, res: Response) => {
    const { imageName } = req.params;
    // Assuming images are stored in a directory named 'images'
    const imagesDirectory = path.join(__dirname, "images");

    // Read the files in the directory
    fs.readdir(imagesDirectory, (err, files) => {
      if (err) {
        console.error("Error reading images directory:", err);
        return res.status(500).send("Internal Server Error");
      }

      // Find the file with matching name prefix
      const matchingFile = files.find((file) => file.startsWith(imageName));

      if (!matchingFile) {
        return res.status(404).send("Image not found");
      }

      const imagePath = path.join(imagesDirectory, matchingFile);

      console.log("imagePath", imagePath);

      // Serve the image file
      return res.sendFile(imagePath);
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupExpressServer;
