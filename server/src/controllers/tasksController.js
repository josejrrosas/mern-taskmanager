import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }); //show newest first
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error in getAllTasks controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, notes } = req.body;
    const task = new Task({ title, notes });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error in createTask controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTaskByID = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);

    res.status(200).json(task);
  } catch (error) {
    console.log("Error in getTaskByID controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, notes } = req.body;
    await Task.findByIdAndUpdate(
      req.params.id,
      { title, notes },
      {
        new: true,
      }
    );
    if (!updateTask) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(updateTask);
  } catch (error) {
    console.error("Error in updateTask conroller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { title, content } = req.body;
    await Task.findByIdAndDelete(
      req.params.id,
      { title, content },
      {
        new: true,
      }
    );

    if (!deleteTask)
      return res.status(404).json({ message: "Task not found." });
    res.status(200).json({ message: "Deleted Successfully!" });
  } catch (error) {
    console.error("Error in deleteTask controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const deleteNote = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     await Note.findByIdAndDelete(
//       req.params.id,
//       { title, content },
//       {
//         new: true,
//       }
//     );

//     if (!deleteNote) return res.status(404).json({ message: "Note not found" });

//     res.status(200).json({ message: "deleted successfully!" });
//   } catch (error) {
//     console.error("Error in deleteNote controller", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
