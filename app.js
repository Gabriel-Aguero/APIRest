import express from "express";

export const app = express();

// middleware
app.use(express.json());

const items = [{ id: 1, name: "Item 1" }];

app.get("/items", (req, res) => {
  res.json(items);
});

app.get("/items/:id", (req, res) => {
  const { id } = req.params;
  const itemsFound = items.find((item) => item.id === Number(id));

  if (itemsFound) {
    res.json(itemsFound);
  } else {
    res.status(404).json({ message: "No se encontró el item" });
  }
});

app.post("items", (req, res) => {
  const { content } = req.body;
  const newItem = { id: items.length + 1, name: content };
  items.push(newItem);
  return res.json(newItem);
});

app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const itemIndex = items.findIndex((item) => item.id === Number(id));

  if (itemIndex !== -1) {
    items[itemIndex].name = content;
    return res.json(items[itemIndex]);
  } else {
    res.status(404).json({ message: "No se encontró el item" });
  }
});

app.delete("items/:id", (req, res) => {
  const { id } = req.params;
  const itemIndex = items.findIndex((item) => item.id === Number(id));

  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    return res.json({ message: "Item eliminado" });
  } else {
    res.status(404).json({ message: "No se encontró el item" });
  }
});
