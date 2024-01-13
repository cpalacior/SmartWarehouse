const request = require('supertest');
const app = require('../../src/app');

describe('Pruebas para listbatch', () => {
    it('Verificar que la ruta existe y devuelve un Array', async () => {
        const response = await request(app).get('/api/v1/batch/listbatches/');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
})

describe('Pruebas para getBatch', () => {
    it('Verificar que la ruta existe y devuelve un objeto', async () => {
        const id = 1; // Id que existe
        const response = await request(app).get(`/api/v1/batch/getbatch/${id}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        
    });
    it('verificar que cuando el id no esta en la base de datos devuelve un mensaje de error pertinente', async ()=>{
        const id = 999; //Id que no existe
        const response = await request(app).get(`/api/v1/batch/getbatch/${id}`);
        expect(response.status).toBe(404);
    });
})

describe('Pruebas para createbatch', () => {
    const name = `lote#${Math.random()*100}`
    it('Verificar que crea un nuevo batch', async () => {
        const new_batch = {
            "name":name,
            "content":"slkjdslkd",
            "measure":544.1,
            "weight":54545.4,
            "size":789.1,
            "inputDate":"2023-09-07T18:21:40.878Z",
            "outputDate":"2023-10-07T18:21:40.878Z"
        }
        const response = (await request(app).post('/api/v1/batch/createbatch/').send(new_batch));
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('batch.name',name); //verifica que el nombre del batch que se especifico es el mismo que devuelve
    });
})

describe('Pruebas para updatebatch', () => {
    const id = 2; // id that already exists
    const not_id = 999; // id that does not exists
    const weight = `${Math.random()*100}`
    const update_info = {
        'weight':weight,
    }
    it('Verificar que actualiza los datos de un lote', async () => {

        const response = (await request(app).post(`/api/v1/batch/updatebatch/${id}`).send(update_info));
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('batch.weight',weight); //verifica que el email que se especifico es el mismo que devuelve
    });
    it('verificar que al pasar una id no existente devuelve un mensaje de error pertinente', async () =>{

        const response = (await request(app).post(`/api/v1/batch/updatebatch/${not_id}`).send(update_info));
        expect(response.status).toBe(404);
    });
})

describe('Pruebas para deleteBatch', () => {

    it('Verificar que la ruta existe y elimina el lote', async () => {
        //Creamos un nuevo admin
        const new_batch = {
            'name':"test_delete",
            "content":"slkjdslkd",
            "measure":544.1,
            "weight":54545.4,
            "size":789.1,
            "inputDate":"2023-09-07T18:21:40.878Z",
            "outputDate":"2023-10-07T18:21:40.878Z"
        }
        const created_batch_response = (await request(app).post('/api/v1/batch/createbatch/').send(new_batch)); // Hace el post al lote
        const created_id = created_batch_response.body.batch.id; // Id del lote recien creado
        const response = await request(app).post(`/api/v1/batch/deletebatch/${created_id}`); // Elimina el admin
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('deleted',true);
        const search_deleted_batch = await request(app).get(`/api/v1/batch/getbatch/${created_id}`); //Busca el admin creado
        expect(search_deleted_batch.status).toBe(404);
        
    });
    it('verificar que cuando el id no esta en la base de datos devuelve un mensaje de error pertinente', async ()=>{
        const id = 999; //Id que no existe
        const response = await request(app).get(`/api/v1/batch/deletebatch/${id}`);
        expect(response.status).toBe(404);
    });
})