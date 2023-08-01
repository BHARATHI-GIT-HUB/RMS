import { FindOptions, Model } from "sequelize";

type Constructor<T> = new (...args: any[]) => T;

type ModelType<T extends Model<T>> = Constructor<T> & typeof Model;

interface CustomRequest extends Request {
  user?: any; // Modify the type of 'user' according to your decoded token data
}

export abstract class IRepository<T extends Model> {
  constructor(protected model: ModelType<T>) {}

  get(id: string, options?: any): Promise<T | null> {
    return this.model.findByPk<T>(id, options);
  }

  getAll(options?: any): Promise<T[] | null> {
    return this.model.findAll<T>(options);
  }

  find(where: FindOptions): Promise<any> {
    return this.model.findOne(where);
  }

  create(data: T): Promise<T> {
    return this.model.create(data.dataValues);
  }

  update(id: any, data: T | any): Promise<any> {
    return this.model.update(data.dataValues, {
      where: { id },
    });
  }

  delete(id: any): Promise<number> {
    return this.model.destroy({
      where: { id },
    });
  }
}
