// Using uuid to generate unique ids
const { v4: uuidv4 } = require('uuid');

// Read and write file
const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
class Store {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
      let allNotes;

      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        allNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        allNotes = [];
      }

      return allNotes;
    });
  }

  addNote(note) {
    const { title, text } = note;

    // Generate unique id with uuid
    const newNote = { title, text, id: uuidv4() };

    // Retrieve notes and add new note
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  removeNote(id) {
    // Remove note with given id
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new Store();
