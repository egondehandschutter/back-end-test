const { withServer} = require('../supertest.setup');

const data = {
  person: 
    { name: 'egon dehandschutter', age: 25 },
};

describe('Persons', () => {
  let request, cache;

  withServer(({
    supertest,
    cache: c,
  }) => {
    request = supertest;
    cache = c;
  });

  const url = '/api/persons';

  describe('GET /api/persons/:id', () => {
    
    beforeAll(() => {
      cache.set(data.person.name, data.person.age)
      }
    );

    afterAll(() => {
      cache.flushAll()
      }
    );

    it('should 200 and return the requested person', async () => {
      const response = await request.get(`${url}/Egon Dehandschutter`);
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        name: 'egon dehandschutter',
        age: 25
      });
    });

    it('should 404 when requesting not existing person', async () => {
      const response = await request.get(`${url}/Erik Dehandschutter`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No person with name erik dehandschutter exists',
        details: {
          name: "erik dehandschutter",
        },
      });
      expect(response.body.stack).toBeTruthy();
    });
  });

  describe('POST /api/persons', () => {

    afterAll(() => {
      cache.flushAll()
      }
    );

    it('should 201 and return the created person', async () => {
      const response = await request.post(url)
        .send({
          name: 'New person',
          age: 30
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe('new person');
      expect(response.body.age).toBe(30);
    });

    it('should 400 when missing name', async () => {
      const response = await request.post(url)
        .send({
          age: '30',
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.body).toHaveProperty('name');
    });

    it('should 400 when missing age', async () => {
      const response = await request.post(url)
        .send({
          name: 'New person',
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.body).toHaveProperty('age');
    });

    it('should 400 when age under 18', async () => {
      const response = await request.post(url)
        .send({
          name: 'New person',
          age: '17',
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
    });
  });
});
