const{ connectDB } = require('../db/index-bd');

class ConsultantsService {
    constructor() {
        this.table = 'consulta';
    }
    async getConsultants({ tags } = {}) {
        const query = 'SELECT * FROM consulta';
        const consultants = global.dbp.any(query);

        return consultants;
    }

    async getConsultantById(id) {
        const query = `SELECT * FROM consulta where id_consulta=${id}`;
        const consultant = global.dbp.any(query);

        return consultant;
    }

    async createConsultant({ consultant }) {
        const query = `INSERT INTO public.consulta(_id_persona, titulo, descripcion, _id_especialidad, foto_consulta, monto) VALUES (${consultant.idPerson}, '${consultant.title}', '${consultant.description}', ${consultant.specialityId}, '${consultant.photo}', ${consultant.price});`;
        const createdConsultant = global.dbp.any(query);

        return createdConsultant;
    }

    async updateConsultant(id, { consultant }) {
        const query = `UPDATE public.consulta SET ${consultant.idPerson != undefined ?  `_id_persona=${consultant.idPerson},`: ''  } ${consultant.title != undefined ?  `titulo='${consultant.title}',`: ''  } ${consultant.description != undefined ?  `descripcion='${consultant.description},'`: ''  } ${consultant.specialityId != undefined ?  `_id_especialidad=${consultant.specialityId},`: ''  } ${consultant.photo != undefined ?  `foto_consulta='${consultant.photo}',`: ''  } ${consultant.price != undefined ?  `monto=${consultant.price}`: ''  } WHERE id_consulta=${id};`;
        const updatedConsultant = global.dbp.any(query);

        return updatedConsultant;
    }
}

module.exports = {
    ConsultantsService
}
