import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }); //show newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
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

// export const getAllNotes = async (req, res) => {
//   try {
//     const notes = await Note.find().sort({ createdAt: -1 }); //show newest first
//     res.status(200).json(notes);
//   } catch (error) {
//     console.error("Error in getAllNotes controller", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const getNoteByID = async (req, res) => {
//   try {
//     const note = await Note.findById(req.params.id);
//     if (!note) return res.status(404).json({ message: "Note not found" });
//     res.json(note);

//     res.status(200).json(note);
//   } catch (error) {
//     console.error("Error in getNoteByID controller", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const createNote = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const note = new Note({ title, content });

//     const savedNote = await note.save();
//     res.status(201).json(savedNote);
//   } catch (error) {
//     console.error("Error in createNote controller", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const updateNote = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     await Note.findByIdAndUpdate(
//       req.params.id,
//       { title, content },
//       {
//         new: true,
//       }
//     );

//     if (!updateNote) return res.status(404).json({ message: "Note not found" });

//     res.status(200).json(updateNote);
//   } catch (error) {
//     console.error("Error in updateNote controller", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

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
