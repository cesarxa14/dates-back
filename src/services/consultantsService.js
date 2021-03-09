const{ connectDB } = require('../db/index-bd');

class ConsultantsService {
    constructor() {
        this.table = 'consulta';
    }
    async getConsultants({ tags } = {}) {
        const consultants = global.dbp.any('SELECT * FROM consulta');

        return consultants;
    }
}

module.exports = {
    ConsultantsService
}
