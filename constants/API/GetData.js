export const exerciseOptions = {
    method: 'GET',
    params: {limit: '10'},
    headers: {
        'X-RapidAPI-Key': '4d93af0c42msh89b531ee480f761p1b0f0ajsn133f7bc73851',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    }
};

export const fetchData = async (url, options) => {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Greška prilikom dohvaćanja podataka:', error);
        throw error; // Ovo će propustiti grešku dalje kako biste je mogli obraditi na odgovarajući način
    }
};