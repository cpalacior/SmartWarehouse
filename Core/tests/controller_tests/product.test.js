const request = require('supertest');
const app = require('../../src/app');

describe('Pruebas para listproduct', () => {
    it('Verificar que la ruta existe y devuelve un Array', async () => {
        const response = await request(app).get('/api/v1/product/listproducts/');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
})

describe('Pruebas para getProduct', () => {
    it('Verificar que la ruta existe y devuelve un objeto', async () => {
        const id = 1; // Id que existe
        const response = await request(app).get(`/api/v1/product/getproduct/${id}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        
    });
    it('verificar que cuando el id no esta en la base de datos devuelve un mensaje de error pertinente', async ()=>{
        const id = 999; //Id que no existe
        const response = await request(app).get(`/api/v1/product/getproduct/${id}`);
        expect(response.status).toBe(404);
    });
})

describe('Pruebas para createproduct', () => {
    const unit = `unit#${Math.random()*100}`
    it('Verificar que crea un nuevo product', async () => {
        const new_product = {
            "type":"testasdk",
            "quantity":8332,
            "unit":unit
        }
        const response = (await request(app).post('/api/v1/product/createproduct/').send(new_product));
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('product.unit',unit); //verifica que el nombre del product que se especifico es el mismo que devuelve
    });
})

describe('Pruebas para updateproduct', () => {
    const id = 2; // id that already exists
    const not_id = 999; // id that does not exists
    const quantity = `${Math.random()*100}`
    const update_info = {
        'quantity':quantity,
    }
    it('Verificar que actualiza los datos de un producto', async () => {

        const response = (await request(app).post(`/api/v1/product/updateproduct/${id}`).send(update_info));
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('product.quantity',quantity); //verifica que el email que se especifico es el mismo que devuelve
    });
    it('verificar que al pasar una id no existente devuelve un mensaje de error pertinente', async () =>{

        const response = (await request(app).post(`/api/v1/product/updateproduct/${not_id}`).send(update_info));
        expect(response.status).toBe(404);
    });
})

describe('Pruebas para deleteBatch', () => {

    it('Verificar que la ruta existe y elimina el producto', async () => {
        //Creamos un nuevo admin
        const new_product = {
            "type":"testdelete",
            "quantity":8332,
            "unit":"unit"
        }
        const created_product_response = (await request(app).post('/api/v1/product/createproduct/').send(new_product)); // Hace el post al lote
        const created_id = created_product_response.body.product.id; // Id del lote recien creado
        const response = await request(app).post(`/api/v1/product/deleteproduct/${created_id}`); // Elimina el admin
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('deleted',true);
        const search_deleted_product = await request(app).get(`/api/v1/product/getproduct/${created_id}`); //Busca el admin creado
        expect(search_deleted_product.status).toBe(404);
        
    });
    it('verificar que cuando el id no esta en la base de datos devuelve un mensaje de error pertinente', async ()=>{
        const id = 999; //Id que no existe
        const response = await request(app).get(`/api/v1/product/deleteproduct/${id}`);
        expect(response.status).toBe(404);
    });
})