const validateTask = (req, res, next) => {
    const { title, status } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ message: "Title is required" });
    }

    const validStatus = ["todo", "in-progress", "done"];

    if (status && !validStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    next();
};

module.exports = validateTask;