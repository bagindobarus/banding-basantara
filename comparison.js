document.addEventListener('DOMContentLoaded', function () {
    const language1 = localStorage.getItem('language1');
    const language2 = localStorage.getItem('language2');
    const language3 = localStorage.getItem('language3');

    const tableHeader = document.getElementById('tableHeader');
    const tableBody = document.querySelector('#comparisonTable tbody');

    // Array of selected languages (filter out empty selections)
    const selectedLanguages = [language1, language2, language3].filter(lang => lang);

    // Fetch language data for all selected languages
    Promise.all(selectedLanguages.map(lang => 
        fetch(`languages/${lang}.json`).then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${lang}.json`);
            }
            return response.json();
        })
    ))
    .then(languageData => {
        // Populate the table header with language names and notes
        tableHeader.innerHTML = `
            <tr>
                <th>Word</th>
                ${languageData.map(lang => `<th>${lang.language}<br><i>${lang.note || ''}</i></th>`).join('')}
            </tr>
        `;

        // Get all unique words from all languages
        const allWords = new Set();
        languageData.forEach(lang => {
            Object.keys(lang.words).forEach(word => allWords.add(word));
        });

        // Populate the table rows
        allWords.forEach(word => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${word}</td>` + languageData.map(lang => `<td>${lang.words[word] || '-'}</td>`).join('');
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error loading language data:', error);
        tableBody.innerHTML = `<tr><td colspan="${selectedLanguages.length + 1}">Failed to load language data. Please try again.</td></tr>`;
    });
});