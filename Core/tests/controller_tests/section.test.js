const request = require('supertest');
const app = require('../../src/app');

describe('Pruebas para listsections', () => {
    it('Verificar que la ruta existe y devuelve un Array', async () => {
        const response = await request(app).get('/api/v1/section/listsections/');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
})

describe('Pruebas para getSection', () => {
    it('Verificar que la ruta existe y devuelve un objeto', async () => {
        const id = 1; // Id que existe
        const response = await request(app).get(`/api/v1/section/getsection/${id}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        
    });
    it('verificar que cuando el id no esta en la base de datos devuelve un mensaje de error pertinente', async ()=>{
        const id = 999; //Id que no existe
        const response = await request(app).get(`/api/v1/section/getsection/${id}`);
        expect(response.status).toBe(404);
    });
})

describe('Pruebas para createsection', () => {
    const name = `section#${Math.random()*100}`
    it('Verificar que crea un nuevo section', async () => {
        const new_section = {
            "name":name,
            "size":321,

        }
        const response = (await request(app).post('/api/v1/section/createsection/').send(new_section));
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('section.name',name); //verifica que el nombre del section que se especifico es el mismo que devuelve
    });
})

describe('Pruebas para updatesection', () => {
    const id = 2; // id that already exists
    const not_id = 999; // id that does not exists
    const size = `${Math.random()*100}`
    const update_info = {
        'size':size,
    }
    it('Verificar que actualiza los datos de un lote', async () => {

        const response = (await request(app).post(`/api/v1/section/updatesection/${id}`).send(update_info));
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('section.size',size); //verifica que el peso que se especifico es el mismo que devuelve
    });
    it('verificar que al pasar una id no existente devuelve un mensaje de error pertinente', async () =>{

        const response = (await request(app).post(`/api/v1/section/updatesection/${not_id}`).send(update_info));
        expect(response.status).toBe(404);
    });
})

describe('Pruebas para deleteSection', () => {

    it('Verificar que la ruta existe y elimina el lote', async () => {
        //Creamos un nuevo admin
        const new_section = {
            'name':"test_delete",
            "size":123
        }
        const created_section_response = (await request(app).post('/api/v1/section/createsection/').send(new_section)); // Hace el post al sectiono
        const created_id = created_section_response.body.section.id; // Id del lote recien creado
        const response = await request(app).post(`/api/v1/section/deletesection/${created_id}`); // Elimina el sectiono
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('deleted',true);
        const search_deleted_section = await request(app).get(`/api/v1/section/getsection/${created_id}`); //Busca el sectiono creado
        expect(search_deleted_section.status).toBe(404);
        
    });
    it('verificar que cuando el id no esta en la base de datos devuelve un mensaje de error pertinente', async ()=>{
        const id = 999; //Id que no existe
        const response = await request(app).get(`/api/v1/section/deletesection/${id}`);
        expect(response.status).toBe(404);
    });
})