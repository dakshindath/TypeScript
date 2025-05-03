interface NestedKeyObject {
    [key: string]: any;
  }
  
  function search<T extends NestedKeyObject>(items: T[], query: Partial<T>): T[] {
    return items.filter(item => {
      return Object.keys(query).every(key => {
        const queryValue = query[key];
        const itemValue = item[key];
  
        if (typeof queryValue === 'object' && typeof itemValue === 'object') {
          return search([itemValue], queryValue as Partial<T>).length > 0;
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
  ];
  
  // DOM Elements
  const searchInput = document.getElementById('searchInput') as HTMLInputElement;
  const suggestionsList = document.getElementById('suggestionsList') as HTMLUListElement;
  const resultsList = document.getElementById('resultsList') as HTMLUListElement;
  const resultsGrid = document.getElementById('resultsGrid') as HTMLDivElement;
  const resultsTableBody = document.querySelector('#resultsTable tbody') as HTMLTableSectionElement;
  const listViewButton = document.getElementById('listViewButton') as HTMLButtonElement;
  const gridViewButton = document.getElementById('gridViewButton') as HTMLButtonElement;
  const tableViewButton = document.getElementById('tableViewButton') as HTMLButtonElement;
  
  // Templates
  const listItemTemplate = document.getElementById('listItemTemplate') as HTMLTemplateElement;
  const gridItemTemplate = document.getElementById('gridItemTemplate') as HTMLTemplateElement;
  const tableRowTemplate = document.getElementById('tableRowTemplate') as HTMLTemplateElement;
  
  let debounceTimeout: number | undefined;
  
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
    if (!query) return;
  
    const results = search(items, { name: query });
    const activeView = getActiveView();
    displayResults(results, activeView);
  }
  
  // Display Results
  function displayResults(results: NestedKeyObject[], view: string) {
    // Clear all views
    resultsList.innerHTML = '';
    resultsGrid.innerHTML = '';
    resultsTableBody.innerHTML = '';
  
    if (results.length === 0) {
      const noResultsMessage = '<p>No results found.</p>';
      if (view === 'list') resultsList.innerHTML = noResultsMessage;
      if (view === 'grid') resultsGrid.innerHTML = noResultsMessage;
      if (view === 'table') {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="3">No results found.</td>';
        resultsTableBody.appendChild(row);
      }
      return;
    }
  
    results.forEach(result => {
      if (view === 'list' && listItemTemplate) {
        const listClone = listItemTemplate.content.cloneNode(true) as HTMLElement;
        (listClone.querySelector('.name') as HTMLElement).textContent = result.name;
        (listClone.querySelector('.city') as HTMLElement).textContent = result.address.city;
        (listClone.querySelector('.zip') as HTMLElement).textContent = result.address.zip;
        resultsList.appendChild(listClone);
      }
  
      if (view === 'grid' && gridItemTemplate) {
        const gridClone = gridItemTemplate.content.cloneNode(true) as HTMLElement;
        (gridClone.querySelector('.name') as HTMLElement).textContent = result.name;
        (gridClone.querySelector('.city') as HTMLElement).textContent = result.address.city;
        (gridClone.querySelector('.zip') as HTMLElement).textContent = result.address.zip;
        resultsGrid.appendChild(gridClone);
      }
  
      if (view === 'table' && tableRowTemplate) {
        const tableClone = tableRowTemplate.content.cloneNode(true) as HTMLElement;
        (tableClone.querySelector('.name') as HTMLElement).textContent = result.name;
        (tableClone.querySelector('.city') as HTMLElement).textContent = result.address.city;
        (tableClone.querySelector('.zip') as HTMLElement).textContent = result.address.zip;
        resultsTableBody.appendChild(tableClone);
      }
    });
  }
  
  // Toggle Views
  listViewButton.addEventListener('click', () => setActiveView('list'));
  gridViewButton.addEventListener('click', () => setActiveView('grid'));
  tableViewButton.addEventListener('click', () => setActiveView('table'));
  
  function setActiveView(view: string) {
    listViewButton.classList.toggle('active', view === 'list');
    gridViewButton.classList.toggle('active', view === 'grid');
    tableViewButton.classList.toggle('active', view === 'table');
  
    resultsList.classList.toggle('hidden', view !== 'list');
    resultsGrid.classList.toggle('hidden', view !== 'grid');
    document.getElementById('resultsTable')!.classList.toggle('hidden', view !== 'table');
  
    const query = searchInput.value.trim();
    const results = query ? search(items, { name: query }) : items;
    displayResults(results, view);
  }
  
  function getActiveView(): string {
    if (listViewButton.classList.contains('active')) return 'list';
    if (gridViewButton.classList.contains('active')) return 'grid';
    if (tableViewButton.classList.contains('active')) return 'table';
    return 'list';
  }