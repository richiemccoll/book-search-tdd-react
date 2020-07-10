const API_URL = 'https://www.googleapis.com/books/v1/volumes';

const services = {
    generateSearchResource(query) {
        const qs = query.replace(' ', '+');
        return `${API_URL}?q=${qs.toLowerCase()}`;
    },
    async callBooksService(query){
        const url = this.generateSearchResource(query);
        try {
            const result = await fetch(url).then(res => res.json());
            return result;
        } catch (error) {
            return {
                error: true,
                message: error,
            }
        }
    }
}

export default services;