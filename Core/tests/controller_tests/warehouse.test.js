const request = require('supertest');
const app = require('../../src/app');

describe('Pruebas para listwarehouses', () => {
    it('Verificar que la ruta existe y devuelve un Array', async () => {
        const response = await request(app).get('/api/v1/warehouse/listwarehouses/');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
})

describe('Pruebas para getWarehouse', () => {
    it('Verificar que la ruta existe y devuelve un objeto', async () => {
        const id = 1; // Id que existe
        const response = await request(app).get(`/api/v1/warehouse/getwarehouse/${id}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        
    });
    it('verificar que cuando el id no esta en la base de datos devuelve un mensaje de error pertinente', async ()=>{
        const id = 999; //Id que no existe
        const response = await request(app).get(`/api/v1/warehouse/getwarehouse/${id}`);
        expect(response.status).toBe(404);
    });
})

describe('Pruebas para createwarehouse', () => {
    const name = `warehouse#${Math.random()*100}`
    it('Verificar que crea un nuevo warehouse', async () => {
        const new_warehouse = {
            "name":name,
            "location":"Medellin",
            "size":123
        }
        const response = (await request(app).post('/api/v1/warehouse/createwarehouse/').send(new_warehouse));
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('warehouse.name',name); //verifica que el nombre del warehouse que se especifico es el mismo que devuelve
    });
})

describe('Pruebas para updatewarehouse', () => {
    const id = 2; // id that already exists
    const not_id = 999; // id that does not exists
    const size = `${Math.random()*100}`
    const update_info = {
        'size':size,
    }
    it('Verificar que actualiza los datos de un bodega', async () => {

        const response = (await request(app).post(`/api/v1/warehouse/updatewarehouse/${id}`).send(update_info));
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('warehouse.size',size); //verifica que el email que se especifico es el mismo que devuelve
    });
    it('verificar que al pasar una id no existente devuelve un mensaje de error pertinente', async () =>{

        const response = (await request(app).post(`/api/v1/warehouse/updatewarehouse/${not_id}`).send(update_info));
        expect(response.status).toBe(404);
    });
})

describe('Pruebas para deleteWarehouse', () => {

    it('Verificar que la ruta existe y elimina el bodega', async () => {
        //Creamos un nuevo admin
        const new_warehouse = {
            'name':"test_delete",
            "location":"Medellin",
            "size":123
        }
        const created_warehouse_response = (await request(app).post('/api/v1/warehouse/createwarehouse/').send(new_warehouse)); // Hace el post al bodega
        const created_id = created_warehouse_response.body.warehouse.id; // Id del bodega recien creado
        const response = await request(app).post(`/api/v1/warehouse/deletewarehouse/${created_id}`); // Elimina el admin
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('deleted',true);
        const search_deleted_warehouse = await request(app).get(`/api/v1/warehouse/getwarehouse/${created_id}`); //Busca el admin creado
        expect(search_deleted_warehouse.status).toBe(404);
        
    });
    it('verificar que cuando el id no esta en la base de datos devuelve un mensaje de error pertinente', async ()=>{
        const id = 999; //Id que no existe
        const response = await request(app).get(`/api/v1/warehouse/deletewarehouse/${id}`);
        expect(response.status).toBe(404);
    });
})