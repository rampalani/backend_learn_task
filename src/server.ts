import express from "express";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
const port = 3001;

const usersFilePath = path.join(__dirname, "items.json");
let items: any[] = [];

fs.readFile(usersFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the JSON file:", err);
    return;
  }
  items = JSON.parse(data);
});

app.get("/item", (req, res) => {
  try {
    res.json({
      data: items,
      message: "Fetched successfully",
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      statusCode: 500,
    });
  }
});

app.get("/item/:id", (req, res) => {
  const { id } = req.params;
  try {
    const item = items?.find((item) => item?.id === id);
    if (!item) {
      return res.status(404).send({
        message: "Item not found",
        statusCode: 404,
      });
    } else {
      res.json({
        data: item,
        message: "Fetched successfully",
        statusCode: 200,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      statusCode: 500,
    });
  }
});

app.post("/item", (req, res) => {
  try {
    const { id, name, description, price, category, inStock, imageUrl, tags } =
      req.body;
    const item = {
      id,
      name,
      description,
      price,
      category,
      inStock,
      imageUrl,
      tags,
    };
    items?.push(item);
    items.sort((a, b) => a.id - b.id);
    fs.writeFile(usersFilePath, JSON.stringify(items), (err) => {
      if (err) {
        console.error("Error writing to the JSON file:", err);
        return;
      }
      res.send({
        message: "Item added successfully",
        statusCode: 200,
      });
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      statusCode: 500,
    });
  }
});

app.delete("/item/:id", (req, res) => {
  const { id } = req.params;
  try {
    const item = items?.find((item) => item?.id === id);
    if (!item) {
      return res.status(404).send({
        message: "Item not found",
        statusCode: 404,
      });
    }
    items = items?.filter((item) => item?.id !== id);
    fs.writeFile(usersFilePath, JSON.stringify(items), (err) => {
      if (err) {
        console.error("Error writing to the JSON file:", err);
        return;
      }
      res.send({
        message: "Item deleted successfully",
        statusCode: 200,
      });
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      statusCode: 500,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
