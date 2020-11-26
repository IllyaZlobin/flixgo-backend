import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { assert } from 'chai';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { setupFilters, setupInterceptors, setupPipes } from './../src/startup';

describe('Auth Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupFilters(app);
    setupInterceptors(app);
    setupPipes(app);

    await app.init();
  });

  describe('Login Tests', () => {
    it('Should return 400 if passed email is not valid', async () => {
      const invalidRequest = { email: 'abcd', password: '1234' };

      return await request(app.getHttpServer())
        .post('/auth/login')
        .send(invalidRequest)
        .expect(400)
        .expect(({ body }) => {
          const [response] = body.errors;

          expect(response.message).toEqual('"email" must be a valid email');
          expect(response.property[0]).toEqual('email');
        });
    });
    it('Should return 400 if passed password is less then 6 characters', async () => {
      const invalidRequest = { email: 'test@gmail.com', password: '1' };

      return await request(app.getHttpServer())
        .post('/auth/login')
        .send(invalidRequest)
        .expect(400)
        .expect(({ body }) => {
          const [response] = body.errors;

          expect(response.message).toEqual(
            '"password" length must be at least 6 characters long',
          );
          expect(response.property[0]).toEqual('password');
        });
    });

    it('Should return 400 if passed data is valid but user is not exist', async () => {
      const validRequest = { email: 'test@gmail.com', password: '123456' };

      return await request(app.getHttpServer())
        .post('/auth/login')
        .send(validRequest)
        .expect(404)
        .expect(({ body }) => {
          const [response] = body.errors;

          expect(response.message).toEqual('User is not found');
          expect(response.property[0]).toEqual('email');
        });
    });

    it('Should return 200 with user object, access and refresh tokens  if passed data is valid ', async () => {
      const validRequest = {
        email: 'illiazlobin@gmail.com',
        password: '123456',
      };

      return await request(app.getHttpServer())
        .post('/auth/login')
        .send(validRequest)
        .expect(200)
        .expect(({ body }) => {
          const { user, accessToken, refreshToken } = body.data;

          assert.hasAllKeys(user, [
            'id',
            'email',
            'password',
            'userName',
            'lastName',
            'status',
            'firstName',
            'role',
            'createdAt',
            'updatedAt',
          ]);

          assert.isNotEmpty(accessToken);
          assert.isNotEmpty(refreshToken);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
