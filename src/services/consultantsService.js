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

    // async createConsultant({ consultant }) {
    //     const query = `INSERT INTO public.consulta(_id_persona, titulo, descripcion, _id_especialidad, foto_consulta, monto) VALUES (${consultant.idPerson}, '${consultant.title}', '${consultant.description}', ${consultant.specialityId}, '${consultant.photo}', ${consultant.price});`;
    //     const createdConsultant = global.dbp.any(query);

    //     return createdConsultant;
    // }

    createConsultant(obj) {
        return new Promise(async (resolve, reject)=>{
            let sql = 'SELECT public.__dates_3_crear_consulta($1, $2, $3, $4, $5, $6) res';
            sql = await global.pgp.as.format(sql,[obj.id_usuario, obj.tituloConsulta, obj.descripcionConsulta, obj.especialidad, obj.precio, obj.fotoConsulta]);
            console.log('sql->>>', sql);
            global.dbp.one(sql).then(data=>{
                // console.log(data.res)
                return resolve(data.res);
            }).catch(err => {
                err.detalle = new Error().stack;
                console.log(err)
                return reject(err);
            });
        })
    }

    getConsultasByAsesor(){
        return new Promise(async (resolve, reject)=>{
            let sql = 'SELECT * FROM consulta';
            sql = await global.pgp.as.format(sql);
            console.log('sql->>>', sql);
            global.dbp.any(sql).then(data=>{
                // console.log(dat)
                return resolve(data);
            }).catch(err => {
                err.detalle = new Error().stack;
                console.log(err)
                return reject(err);
            });
        })
    }

    async updateConsultant(consultantId, { consultant }) {
        const query = `UPDATE public.consulta SET ${consultant.idPerson != undefined ?  `_id_persona=${consultant.idPerson},`: ''  } ${consultant.title != undefined ?  `titulo='${consultant.title}',`: ''  } ${consultant.description != undefined ?  `descripcion='${consultant.description}',`: ''  } ${consultant.specialityId != undefined ?  `_id_especialidad=${consultant.specialityId},`: ''  } ${consultant.photo != undefined ?  `foto_consulta='${consultant.photo}',`: ''  } ${consultant.price != undefined ?  `monto=${consultant.price}`: ''  } WHERE id_consulta=${consultantId};`;
        const updatedConsultant = global.dbp.any(query);

        return updatedConsultant;
    }

    async deleteConsultant(consultantId) {
        const query = `DELETE FROM public.consulta WHERE id_consulta=${consultantId};`;
        const deletedConsultant = this.getConsultantById(consultantId)
            .then( row => new Promise(
                    (resolve, reject) => row.length > 0 ?
                        resolve(global.dbp.any(query)) :
                        reject(`Id:  ${consultantId} does not exist`)))


        return deletedConsultant;
    }
}

module.exports = {
    ConsultantsService
}
