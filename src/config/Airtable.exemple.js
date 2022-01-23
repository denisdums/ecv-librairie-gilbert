const airtable = {
    apiUrl: 'https://api.airtable.com/v0/HERE_YOUR_DB_ID/',
    headers: {
        headers: {
            'Authorization': 'Bearer HERE_YOUR_API_KEY',
            "Content-Type": "application/json"
        }
    },
}

export default airtable;