let folders = JSON.parse(localStorage.getItem('folders')) || [];

// Προσθήκη νέου φακέλου
document.getElementById('addFolderButton').addEventListener('click', function() {
    const folderName = document.getElementById('folderName').value.trim();
    if (folderName) {
        const folder = {
            name: folderName,
            items: []
        };
        folders.push(folder);
        localStorage.setItem('folders', JSON.stringify(folders));
        renderFolders();
        document.getElementById('folderName').value = '';
    }
});

// Εμφάνιση φακέλων
function renderFolders() {
    const folderList = document.getElementById('folders');
    folderList.innerHTML = '';
    folders.forEach((folder, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = folder.name;

        // Δημιουργία κουμπιού διαγραφής φακέλου
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Διαγραφή';
        deleteButton.addEventListener('click', function() {
            folders.splice(index, 1); // Διαγραφή φακέλου
            localStorage.setItem('folders', JSON.stringify(folders));
            renderFolders();
        });
        
        listItem.appendChild(deleteButton);
        listItem.addEventListener('click', function() {
            openFolder(index);
        });
        folderList.appendChild(listItem);
    });
}

// Άνοιγμα φακέλου
function openFolder(index) {
    document.getElementById('shoppingList').style.display = 'block';
    document.getElementById('folderList').style.display = 'none';
    document.getElementById('folderTitle').textContent = folders[index].name;

    renderItems(index);

    document.getElementById('addItemButton').onclick = function() {
        const item = document.getElementById('itemInput').value.trim();
        if (item) {
            folders[index].items.push({ name: item, checked: false });
            localStorage.setItem('folders', JSON.stringify(folders));
            renderItems(index);
            document.getElementById('itemInput').value = '';
        }
    };

    document.getElementById('backToFolders').onclick = function() {
        document.getElementById('shoppingList').style.display = 'none';
        document.getElementById('folderList').style.display = 'block';
    };
}

// Εμφάνιση προϊόντων
function renderItems(folderIndex) {
    const itemsList = document.getElementById('items');
    itemsList.innerHTML = '';
    folders[folderIndex].items.forEach((item, itemIndex) => {
        const listItem = document.createElement('li');
        
        // Δημιουργία checkbox για το τικ
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.checked;
        checkbox.addEventListener('change', function() {
            item.checked = checkbox.checked; 
            localStorage.setItem('folders', JSON.stringify(folders));
            renderItems(folderIndex); // Επαναφόρτωση στοιχείων
        });
        
        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(item.name));
        
        // Δημιουργία κουμπιού διαγραφής προϊόντος
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Αποτροπή από την εκτέλεση του click event
            folders[folderIndex].items.splice(itemIndex, 1);
            localStorage.setItem('folders', JSON.stringify(folders));
            renderItems(folderIndex);
        });

        listItem.appendChild(deleteButton);
        itemsList.appendChild(listItem);
    });
}

// Εκκίνηση
renderFolders();