import airtable from "../config/Airtable";

const base = {
    apiUrl: airtable.apiUrl,
    headers: airtable.headers,
    booksView: 'Galerie%20%E2%80%93%20Tous%20les%20livres',
    authorsView: 'Table%20des%20auteurs',
    maxRecords: '100',
    pageSize: '12',
}


export default base;