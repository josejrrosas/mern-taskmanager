import Task from "../models/Task.js";

export const getAllTasks = async (req, res, next) => {
  try {
    const { search, completed } = req.query;
    const filter = {};

    if (typeof completed !== 'undefined') {
      if (completed !== 'true' && completed !== 'false') {
        return res.status(400).json({ error: { message: "completed must be 'true' or 'false'" } });
      }
      filter.completed = completed === 'true';
    }

    if (search && search.trim() !== '') {
      filter.title = { $regex: search.trim(), $options: 'i' }; // case-insensitive substring
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 }); // newest first
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, notes } = req.body;

    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: { message: 'Title is required' } });
    }

    const task = await Task.create({
      title: title.trim(),
      notes,
      // completed will default to false if your schema sets it
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
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

// export const updateTask = async (req, res) => {
//   try {
//     const { title, notes } = req.body;
//     await Task.findByIdAndUpdate(
//       req.params.id,
//       { title, notes },
//       {
//         new: true,
//       }
//     );
//     if (!updateTask) return res.status(404).json({ message: "Task not found" });

//     res.status(200).json(updateTask);
//   } catch (error) {
//     console.error("Error in updateTask conroller", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const updateTask = async (req, res, next) => {
  try {
    const { title, notes, completed } = req.body;

    const update = {};
    if (typeof title !== 'undefined') {
      const t = String(title).trim();
      if (t.length === 0) return res.status(400).json({ error: { message: 'Title is required' } });
      update.title = t;
    }
    if (typeof notes !== 'undefined') update.notes = notes;
    if (typeof completed !== 'undefined') update.completed = completed;

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ error: { message: 'No fields to update' } });
    }

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: { message: 'Task not found' } });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
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