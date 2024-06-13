import express from "express";

export const setupServer = express();

setupServer.listen(3000, () => console.log("Server is running on port 3000"));
