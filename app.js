const express = require("express");
const app = express();
const cors = require("cors");
const { Task } = require("./models");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/v1/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.post("/api/v1/tasks", async (req, res) => {
  const { name } = req.body;

  try {
    const task = await Task.create({ name });
    res.status(201).json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.delete("/api/v1/tasks/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: "Задача не знайдена" });
    }

    await task.destroy();
    res.json({ message: "Задачу видалено" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
