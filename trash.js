function renderTrash() {
    let trashContent = document.getElementById('trashContent');
    let trashHeadline = document.getElementById('trashHeadline');
    trashHeadline.innerHTML = '';
    trashHeadline.innerHTML += `<h1>Papierkorb</h1>`;
    trashContent.innerHTML = '';

    let trashedNotes = JSON.parse(localStorage.getItem('trashedNotes')) || [];
    let trashedHeadlines = JSON.parse(localStorage.getItem('trashedHeadlines')) || [];

    for (let i = 0; i < trashedHeadlines.length; i++) {
        const trashedHeadline = trashedHeadlines[i];
        const trashedNote = trashedNotes[i];

        trashContent.innerHTML += `
            <div class="note">
                <h2>${trashedHeadline}</h2><br>
                ${trashedNote}
                <div class="noteButtons">
                    <button onclick="restoreNote(${i})"><img src="./img/load.png" alt="restore"></button>
                    <button onclick="deleteNote(${i})"><img src="./img/trash.png" alt="delete"></button>
                </div>
            </div>`;
    }
}

function restoreNote(i) {
    let trashedNotes = JSON.parse(localStorage.getItem('trashedNotes')) || [];
    let trashedHeadlines = JSON.parse(localStorage.getItem('trashedHeadlines')) || [];
    let answer = confirm("Wiederherstellen der Notiz?")

    if(answer){
        notes.push(trashedNotes[i]);
        headlines.push(trashedHeadlines[i]);
    
        localStorage.setItem('notes', JSON.stringify(notes));
        localStorage.setItem('headlines', JSON.stringify(headlines));
    
        trashedNotes.splice(i, 1);
        trashedHeadlines.splice(i, 1);
    
        localStorage.setItem('trashedNotes', JSON.stringify(trashedNotes));
        localStorage.setItem('trashedHeadlines', JSON.stringify(trashedHeadlines));
    
        let content = document.getElementById('content');
        if (content) {
            render();
        }
        renderTrash();
    }else{
        return;
    }
}

function deleteNote(i) {
    let answer = confirm("Bist du sicher, dass du diese Notiz endgültig löschen willst?");
    
    if(!answer) {
        return;
    }

    let trashedNotes = JSON.parse(localStorage.getItem('trashedNotes')) || [];
    let trashedHeadlines = JSON.parse(localStorage.getItem('trashedHeadlines')) || [];

    trashedNotes.splice(i, 1);
    trashedHeadlines.splice(i, 1);
    localStorage.setItem('trashedNotes', JSON.stringify(trashedNotes));
    localStorage.setItem('trashedHeadlines', JSON.stringify(trashedHeadlines));
    renderTrash();
    }