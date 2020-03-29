const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
    //setTimeout( () => process.exit(), 1000)
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      //.set('Authorization', '<id_valido>') Para passar o Header
      .send({
        name: "APAD2",
        email: "a@teste.com",
        city: "São Paulo",
        whatsapp: "11912345678",
        uf: "SP"
      });

      //console.log(response.body);
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  });
});