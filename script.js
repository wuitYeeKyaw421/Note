let inputtag = document.querySelector(".input");
let notesDivHoldertag = document.querySelector(".notesDivHolder");
let addButtontag = document.querySelector(".addButton");
let noteArray = localStorage.getItem("notes")
  ? JSON.parse(localStorage.getItem("notes"))
  : [];

addButtontag.addEventListener("click", () => {
  setNotes();
});

let setNotes = () => {
  if (!inputtag.value) {
    alert("Write something !");
    return;
  } else {
    noteArray.push(inputtag.value);
    localStorage.setItem("notes", JSON.stringify(noteArray));
    location.reload();
  }
};

/* <textarea rows="2" name="notetext" id="notetext" disabled>${noteArray[i]}
           </textarea> */
let displayNotes = () => {
  let notes = "";
  for (let i = 0; i < noteArray.length; i++) {
    notes += `
        <div class="noteDiv">
          <div class = "textNoteDiv">
            <textarea name="textNote" class="textNote" cols="2" rows="2" disabled>${noteArray[i]}</textarea>
          </div>
          <div class="icons">
            <i title="Edit note" class="fa-regular fa-pen-to-square editIcon icon"></i>
            <i title="Delete this note" class="fa-regular fa-trash-can trashIcon icon"></i>
          </div>
          <div class="editSection">
            <div class="save">
                <i class="saveIcon fa-regular fa-floppy-disk"></i>
                <span>Save</span>
            </div>
            <div class="cancel">
                <i class="cancelIcon fa-solid fa-xmark"></i>
                <span>Cancel</span>
            </div>
          </div>
        </div>`;
  }

  notesDivHoldertag.innerHTML = notes;
  deleteListener();
  editListener();
  saveListener();
  cancelListener();
};

let deleteListener = () => {
  let trashIcon = document.querySelectorAll(".trashIcon");
  trashIcon.forEach((trash, i) => {
    trash.addEventListener("click", () => {
      deleteNote(i);
    });
  });
};

let deleteNote = (i) => {
  noteArray.splice(i, 1);
  localStorage.setItem("notes", JSON.stringify(noteArray));
  location.reload();
};

let editListener = () => {
  let editIcon = document.querySelectorAll(".editIcon");
  let textNote = document.querySelectorAll(".noteDiv .textNote");
  let editSection = document.querySelectorAll(".noteDiv .editSection");
  let icons = document.querySelectorAll(".noteDiv .icons");
  editIcon.forEach((edit, i) => {
    edit.addEventListener("click", () => {
      editSection[i].style.display = "flex";
      icons[i].style.display = "none";
      textNote[i].disabled = false;
    });
  });
};

let saveListener = () => {
  let saveIcon = document.querySelectorAll(".noteDiv .editSection .save");
  let textNote = document.querySelectorAll(".noteDiv .textNote");
  let editSection = document.querySelectorAll(".noteDiv .editSection");
  let icons = document.querySelectorAll(".noteDiv .icons");
  saveIcon.forEach((save, i) => {
    save.addEventListener("click", () => {
      editSection[i].style.display = "none";
      icons[i].style.display = "flex";
      textNote[i].disabled = true;
      updateNote(textNote[i].value, i);
    });
  });
};

let updateNote = (text, i) => {
  noteArray[i] = text;
  localStorage.setItem("notes", JSON.stringify(noteArray));
  location.reload();
};

let cancelListener = () => {
  let cancelIcon = document.querySelectorAll(".noteDiv .editSection .cancel");
  let textNote = document.querySelectorAll(".noteDiv .textNote");
  let editSection = document.querySelectorAll(".noteDiv .editSection");
  let icons = document.querySelectorAll(".noteDiv .icons");
  cancelIcon.forEach((cancel, i) => {
    cancel.addEventListener("click", () => {
      editSection[i].style.display = "none";
      icons[i].style.display = "flex";
      textNote[i].disabled = true;
      cancelNote();
    });
  });
};

let cancelNote = () => {
  localStorage.setItem("notes", JSON.stringify(noteArray));
  location.reload();
};

window.onload = () => {
  displayNotes();
  inputtag.focus();
};
