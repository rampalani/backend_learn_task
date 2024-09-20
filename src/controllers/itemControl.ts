import { Request, Response } from "express";
import { readItemsFromFile, writeItemsToFile } from "../utils/fileHelper";

let items: any[] = [];

readItemsFromFile()
  .then((data) => {
    items = data;
  })
  .catch((err) => {
    console.error("Error reading items at startup:", err);
  });

  // fetch a all item
export const getAllItems = async (req: Request, res: Response) => {
    debugger;
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
};

// fetch a single item by id
export const getItemById = async (req: Request, res: Response) => {
    debugger;
  const { id } = req.params;
  try {
    const item = items.find((item) => item?.id === id);
    if (!item) {
      return res.status(404).send({
        message: "Item not found",
        statusCode: 404,
      });
    }
    res.json({
      data: item,
      message: "Fetched successfully",
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      statusCode: 500,
    });
  }
};

// add a new item
export const addItem = async (req: Request, res: Response) => {
  try {
    const { id, name, description, price, category, inStock, imageUrl, tags } = req.body;
    const newItem = { id, name, description, price, category, inStock, imageUrl, tags };
    items.push(newItem);
    items.sort((a, b) => a.id - b.id);

    await writeItemsToFile(items);

    res.send({
      message: "Item added successfully",
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      statusCode: 500,
    });
  }
};

// delete an item
export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const item = items.find((item) => item?.id === id);
    if (!item) {
      return res.status(404).send({
        message: "Item not found",
        statusCode: 404,
      });
    }

    items = items.filter((item) => item?.id !== id);

    await writeItemsToFile(items);

    res.send({
      message: "Item deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      statusCode: 500,
    });
  }
};
