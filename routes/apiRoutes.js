const store = require("../db/store");
const router = require("express").Router();

// Retrieve all saved notes with GET
router.get("/notes", (req, res) => {
  store
    .getNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});
//console.log("api route GET");

// Save note
router.post("/notes", (req, res) => {
  store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});
//console.log("api route POST");

// Remove notes with a given id
router.delete("/notes/:id", (req, res) => {
  store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});
//console.log("api route DELETE");

module.exports = router;
