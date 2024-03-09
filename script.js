let headlines = ['Aufgabe 1', 'Aufgabe 2', 'Aufgabe 3', 'Aufgabe 4'];
let notes = ['Vibranium besorgen in Wakanda', 'Mjölnir polieren', 'Loki eine Falle stellen', 'Jane anrufen'];
loadNote();

function render() {
    let content = document.getElementById('content');
    let contentNotes = document.getElementById('contentNotes');
    content.innerHTML = '';
    content.innerHTML += `<h1>Meine Notizen</h1>`;
    contentNotes.innerHTML = '';

    for (let i = 0; i < headlines.length; i++) {
        const headline = headlines[i];
        const note = notes[i];

        contentNotes.innerHTML += `
            <div class="note">
                <h2>${headline}</h2><br>
                    ${note}
                    <div class="noteButtons">
                        <button onclick="moveToTrash(${i})"><img src="./img/trash.png" alt="delete"></button>
                        <button onclick="editNote(${i})"><img src="./img/pencil.png" alt="edit"></button>
                    </div>
            </div>`;
    }
}

function addNote() {
    let headline = document.getElementById('noteHeadline').value;
    let note = document.getElementById('noteText').value;

    if (headline === '' || note === '') {
        alert('Bitte gib einen Titel und eine Beschreibung ein!');
        return;
    }
    headlines.push(headline);
    notes.push(note);

    document.getElementById('noteHeadline').value = '';
    document.getElementById('noteText').value = '';

    render();
    saveNote();
}

function saveNote() {
    let notesAsText = JSON.stringify(notes);
    let headlinesAsText = JSON.stringify(headlines);

    localStorage.setItem('notes', notesAsText);
    localStorage.setItem('headlines', headlinesAsText);
}

function loadNote() {
    let notesAsText = localStorage.getItem('notes');
    let headlinesAsText = localStorage.getItem('headlines');
    if (notesAsText && headlinesAsText) {
        notes = JSON.parse(notesAsText);
        headlines = JSON.parse(headlinesAsText);
    }
}

function editNote(i) {
    let headlineInput = document.getElementById('noteHeadline');
    let noteInput = document.getElementById('noteText');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    headlineInput.value = headlines[i];
    noteInput.value = notes[i];

    document.getElementById('addNoteButton').onclick = function () {
        updateNote(i);
    };
}

function updateNote(i) {
    let headline = document.getElementById('noteHeadline').value;
    let note = document.getElementById('noteText').value;

    headlines[i] = headline;
    notes[i] = note;
    if (headline === '' || note === '') {
        alert('Bitte gib einen Titel und eine Beschreibung ein!');
        return;
    }
    document.getElementById('addNoteButton').onclick = addNote;
    document.getElementById('noteHeadline').value = '';
    document.getElementById('noteText').value = '';

    render();
    saveNote();
}

function cancelNote() {
    let headlineInput = document.getElementById('noteHeadline');
    let noteInput = document.getElementById('noteText');

    headlineInput.value = '';
    noteInput.value = '';
    document.getElementById('addNoteButton').onclick = addNote;
}

function moveToTrash(i) {
    let answer = confirm("Bist du sicher, dass du diese Notiz in den Papierkorb verschieben willst?");
    let trashedNote = notes.splice(i, 1)[0];
    let trashedHeadline = headlines.splice(i, 1)[0];
    let trashedNotes = JSON.parse(localStorage.getItem('trashedNotes')) || [];
    let trashedHeadlines = JSON.parse(localStorage.getItem('trashedHeadlines')) || [];

    if (!answer) {
        return;
    }

    trashedNotes.push(trashedNote);
    trashedHeadlines.push(trashedHeadline);
    localStorage.setItem('trashedNotes', JSON.stringify(trashedNotes));
    localStorage.setItem('trashedHeadlines', JSON.stringify(trashedHeadlines));
    saveNote();

    let trashContent = document.getElementById('trashContent');
    if (trashContent) {
        renderTrash();
    }
    render();
}