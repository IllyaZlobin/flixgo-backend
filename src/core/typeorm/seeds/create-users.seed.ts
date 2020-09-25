import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../entities';
import { Connection } from 'typeorm';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().create();
  }
}
