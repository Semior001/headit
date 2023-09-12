document.addEventListener("DOMContentLoaded", function() {
    let headers = [];

    const headersList = document.getElementById('headersList');

    function renderHeaders() {
        headersList.innerHTML = '';
        headers.forEach((header, index) => {
            const row = document.createElement('tr');

            // Checkbox cell
            const checkboxCell = document.createElement('td');
            const headerCheckbox = document.createElement('input');
            headerCheckbox.type = 'checkbox';
            headerCheckbox.checked = header.enabled;
            headerCheckbox.addEventListener('change', (e) => {
                header.enabled = e.target.checked;
                // Store the updated headers list
                browser.storage.local.set({ headers: headers });
            });
            checkboxCell.appendChild(headerCheckbox);

            // Header key cell
            const keyCell = document.createElement('td');
            const keyInput = document.createElement('input');
            keyInput.value = header.key;
            keyInput.addEventListener('change', (e) => {
                header.key = e.target.value;
                // Store the updated headers list
                browser.storage.local.set({ headers: headers });
            });
            keyCell.appendChild(keyInput);

            // Header value cell
            const valueCell = document.createElement('td');
            const valueInput = document.createElement('input');
            valueInput.value = header.value;
            valueInput.addEventListener('change', (e) => {
                header.value = e.target.value;
                // Store the updated headers list
                browser.storage.local.set({ headers: headers });
            });
            valueCell.appendChild(valueInput);

            // Delete action cell
            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Remove";
            deleteButton.addEventListener('click', () => {
                headers.splice(index, 1);
                renderHeaders();
                // Store the updated headers list
                browser.storage.local.set({ headers: headers });
            });
            deleteCell.appendChild(deleteButton);

            row.appendChild(checkboxCell);
            row.appendChild(keyCell);
            row.appendChild(valueCell);
            row.appendChild(deleteCell);

            headersList.appendChild(row);
        });
    }

    document.getElementById('addRow').addEventListener('click', () => {
        headers.push({ enabled: false, key: '', value: '' });
        renderHeaders();
        // Store the updated headers list
        browser.storage.local.set({ headers: headers });
    });

    // Fetch the headers from storage and render them when the popup is opened
    browser.storage.local.get("headers", (result) => {
        if (result.headers) {
            headers = result.headers;
            renderHeaders();
        }
    });
});
