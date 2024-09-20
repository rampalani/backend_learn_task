import express from "express";
import itemRoutes from "./routes/index";
const app = express();
app.use(express.json());

const port = 5000;

app.use("/item", itemRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
