const{ connectDB } = require('../db/index-bd');

class ConsultantsService {
    constructor() {
        this.table = 'consulta';
    }
    async getConsultants({ tags } = {}) {
        const query = 'SELECT * FROM consulta'
        const consultants = global.dbp.any(query);

        return consultants;
    }

    async createConsultant({ consultant }) {
        const query = `INSERT INTO public.consulta(_id_persona, titulo, descripcion, _id_especialidad, foto_consulta, monto) VALUES (${consultant.idPerson}, '${consultant.title}', '${consultant.description}', ${consultant.specialityId}, '${consultant.photo}', ${consultant.price});`
        const createdConsultant = global.dbp.any(query);

        return createdConsultant;
    }
}

module.exports = {
    ConsultantsService
}
