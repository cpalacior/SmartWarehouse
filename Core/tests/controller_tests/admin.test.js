const request = require('supertest');
const app = require('../../src/app');

describe('Pruebas para listadmin', () => {
    it('Verificar que la ruta existe y devuelve un Array', async () => {
        const response = await request(app).get('/api/v1/admin/listadmins/');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
})

describe('Pruebas para getAdmin', () => {
    it('Verificar que la ruta existe y devuelve un objeto', async () => {
        const id = 1; // Id que existe
        const response = await request(app).get(`/api/v1/admin/getadmin/${id}`);
        expect(response.status).toBe(200);
        
    });
    it('verificar que cuando el id no esta en la base de datos devuelve un mensaje de error pertinente', async ()=>{
        const id = 999; //Id que no existe
        const response = await request(app).get(`/api/v1/admin/getadmin/${id}`);
        expect(response.status).toBe(404);
    });
})


describe('Pruebas para createadmin', () => {
    const email = `simon${Math.random()*100}@mail.com`
    it('Verificar que crea un nuevo admin', async () => {
        const new_admin = {
            'name':"simon",
            'email': email,
            'password':'medellin123',
            'address':'av 123',
            'phone':1234567
        }
        const response = (await request(app).post('/api/v1/admin/createadmin/').send(new_admin));
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('admin.email',email); //verifica que el email que se especifico es el mismo que devuelve
    });
    it('Verificar que crea no puede crear un admin con el mismo correo', async () => {
        const new_admin = {
            'name':"simon",
            'email': email,
            'password':'medellin123',
            'address':'av 123',
            'phone':1234567
        }
        const response = (await request(app).post('/api/v1/admin/createadmin/').send(new_admin));
        expect(response.status).toBe(409);

    });
})

describe('Pruebas para updateadmin', () => {
    const id = 2; // id that already exists
    const not_id = 999; // id that does not exists
    const password = `${Math.random()*100}`
    const email = 'simon@protonmail.com' //Email that already exusts
    it('Verificar que actualiza los datos de un admin', async () => {
        const update_info = {
            'password':password,
        }
        const response = (await request(app).post(`/api/v1/admin/updateadmin/${id}`).send(update_info));
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('admin.password',password); //verifica que el email que se especifico es el mismo que devuelve
    });
    it('Verificar que no puede actualizar el correo a uno ya usado en otro ususario', async () =>{
        const update_info = {
            'email': email
        }
        const response = (await request(app).post(`/api/v1/admin/updateadmin/${id}`).send(update_info));
        expect(response.status).toBe(409);
    });
    it('verificar que al pasar una id no existente devuelve un mensaje de error pertinente', async () =>{
        
        const update_info = {
            'password':password,
        }
        const response = (await request(app).post(`/api/v1/admin/updateadmin/${not_id}`).send(update_info));
        expect(response.status).toBe(404);
    });
})

describe('Pruebas para deleteAdmin', () => {

    it('Verificar que la ruta existe y elimina el admin', async () => {
        //Creamos un nuevo admin
        const email = `delete_test ${Math.random()*100} @mail.com`
        const new_admin = {
            'name':"simon",
            'email': email,
            'password':'medellin123',
            'address':'av 123',
            'phone':1234567
        }
        const created_admin_response = (await request(app).post('/api/v1/admin/createadmin/').send(new_admin)); // Hace el post al admin
        const created_id = created_admin_response.body.admin.id; // Id del admin recien creado
        const response = await request(app).post(`/api/v1/admin/deleteadmin/${created_id}`); // Elimina el admin
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('deleted',true);
        const search_deleted_admin = await request(app).get(`/api/v1/admin/getadmin/${created_id}`); //Busca el admin creado
        expect(search_deleted_admin.status).toBe(404);
        
    });
    it('verificar que cuando el id no esta en la base de datos devuelve un mensaje de error pertinente', async ()=>{
        const id = 999; //Id que no existe
        const response = await request(app).get(`/api/v1/admin/deleteadmin/${id}`);
        expect(response.status).toBe(404);
    });
})

describe('Pruebas para authenticate', () => {


    it('Verificar que al pasarle una password correcta devuelve verdadero', async () => {
        const login = {
            'password':'medellin123',
            'email':'test@test.com'     
        }
        const response = (await request(app).post('/api/v1/admin/authenticate').send(login));
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('authentication',true); //verifica que el email que se especifico es el mismo que devuelve
    });
    it('Verificar que al pasarle una password incorrecta devuelve falso', async () => {
        const login = {
            'password':'medellin1234',
            'email':'test@test.com'     
        }
        const response = (await request(app).post('/api/v1/admin/authenticate').send(login));
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('authentication',false); //verifica que el email que se especifico es el mismo que devuelve
    });
})