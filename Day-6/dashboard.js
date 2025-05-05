function search(items, query) {
    return items.filter(item => {
        return Object.keys(query).every(key => {
            const queryValue = query[key];
            const itemValue = item[key];
            if (typeof queryValue === 'object' && typeof itemValue === 'object') {
                return search([itemValue], queryValue).length > 0;
            }
            if (typeof queryValue === 'string' && typeof itemValue === 'string') {
                return itemValue.toLowerCase().includes(queryValue.toLowerCase());
            }
            return queryValue === itemValue;
        });
    });
}
// Example Data
const items = [
    { id: 1, name: 'John Doe', address: { city: 'New York', zip: '10001' } },
    { id: 2, name: 'Jane Smith', address: { city: 'Los Angeles', zip: '90001' } },
    { id: 3, name: 'Alice Johnson', address: { city: 'Chicago', zip: '60601' } },
    { id: 4, name: 'Bob Brown', address: { city: 'Houston', zip: '77001' } },
    { id: 5, name: 'Charlie White', address: { city: 'Phoenix', zip: '85001' } },
    { id: 6, name: 'Kane', address: { city: 'New York', zip: '10008' } },
    { id: 7, name: 'Tiffany', address: { city: 'Los Angeles', zip: '90004' } },
    { id: 8, name: 'Bridgette Smith', address: { city: 'Chicago', zip: '60702' } },
    { id: 9, name: 'Catherine', address: { city: 'Houston', zip: '77801' } },
    { id: 10, name: 'Rebecca', address: { city: 'Phoenix', zip: '85401' } },
];
// DOM Elements
const searchInput = document.getElementById('searchInput');
const suggestionsList = document.getElementById('suggestionsList');
const resultsList = document.getElementById('resultsList');
const resultsGrid = document.getElementById('resultsGrid');
const resultsTableBody = document.querySelector('#resultsTable tbody');
const listViewButton = document.getElementById('listViewButton');
const gridViewButton = document.getElementById('gridViewButton');
const tableViewButton = document.getElementById('tableViewButton');
// Templates
const listItemTemplate = document.getElementById('listItemTemplate');
const gridItemTemplate = document.getElementById('gridItemTemplate');
const tableRowTemplate = document.getElementById('tableRowTemplate');
let debounceTimeout;
// Autocomplete Suggestions
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        suggestionsList.classList.add('hidden');
        return;
    }
    const suggestions = items
        .map(item => item.name)
        .filter(name => name.toLowerCase().includes(query));
    suggestionsList.innerHTML = '';
    if (suggestions.length === 0) {
        suggestionsList.classList.add('hidden');
        return;
    }
    suggestions.forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.textContent = suggestion;
        listItem.addEventListener('click', () => {
            searchInput.value = suggestion;
            suggestionsList.classList.add('hidden');
            debouncedSearch();
        });
        suggestionsList.appendChild(listItem);
    });
    suggestionsList.classList.remove('hidden');
});
// Debounced Search
searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        debouncedSearch();
    }, 300);
});
function debouncedSearch() {
    const query = searchInput.value.trim();
    if (!query)
        return;
    const results = search(items, { name: query });
    const activeView = getActiveView();
    displayResults(results, activeView);
}
// Display Results
function displayResults(results, view) {
    // Clear all views
    resultsList.innerHTML = '';
    resultsGrid.innerHTML = '';
    resultsTableBody.innerHTML = '';
    if (results.length === 0) {
        const noResultsMessage = '<p>No results found.</p>';
        if (view === 'list')
            resultsList.innerHTML = noResultsMessage;
        if (view === 'grid')
            resultsGrid.innerHTML = noResultsMessage;
        if (view === 'table') {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="3">No results found.</td>';
            resultsTableBody.appendChild(row);
        }
        return;
    }
    results.forEach(result => {
        if (view === 'list' && listItemTemplate) {
            const listClone = listItemTemplate.content.cloneNode(true);
            listClone.querySelector('.name').textContent = result.name;
            listClone.querySelector('.city').textContent = result.address.city;
            listClone.querySelector('.zip').textContent = result.address.zip;
            resultsList.appendChild(listClone);
        }
        if (view === 'grid' && gridItemTemplate) {
            const gridClone = gridItemTemplate.content.cloneNode(true);
            gridClone.querySelector('.name').textContent = result.name;
            gridClone.querySelector('.city').textContent = result.address.city;
            gridClone.querySelector('.zip').textContent = result.address.zip;
            resultsGrid.appendChild(gridClone);
        }
        if (view === 'table' && tableRowTemplate) {
            const tableClone = tableRowTemplate.content.cloneNode(true);
            tableClone.querySelector('.name').textContent = result.name;
            tableClone.querySelector('.city').textContent = result.address.city;
            tableClone.querySelector('.zip').textContent = result.address.zip;
            resultsTableBody.appendChild(tableClone);
        }
    });
}
// Toggle Views
listViewButton.addEventListener('click', () => setActiveView('list'));
gridViewButton.addEventListener('click', () => setActiveView('grid'));
tableViewButton.addEventListener('click', () => setActiveView('table'));
function setActiveView(view) {
    listViewButton.classList.toggle('active', view === 'list');
    gridViewButton.classList.toggle('active', view === 'grid');
    tableViewButton.classList.toggle('active', view === 'table');
    resultsList.classList.toggle('hidden', view !== 'list');
    resultsGrid.classList.toggle('hidden', view !== 'grid');
    document.getElementById('resultsTable').classList.toggle('hidden', view !== 'table');
    const query = searchInput.value.trim();
    const results = query ? search(items, { name: query }) : items;
    displayResults(results, view);
}
function getActiveView() {
    if (listViewButton.classList.contains('active'))
        return 'list';
    if (gridViewButton.classList.contains('active'))
        return 'grid';
    if (tableViewButton.classList.contains('active'))
        return 'table';
    return 'list';
}
