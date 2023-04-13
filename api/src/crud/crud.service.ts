import { AggregateOptions, Model, PipelineStage } from 'mongoose';

export class CrudService<T = any> {
  constructor(public model: Model<T>) {}

  count(options = {}): any {
    return this.model.count().where(options['where'] ?? {});
  }

  aggregate(pipelines?: PipelineStage[], options: AggregateOptions = {}) {
    return this.model.aggregate(pipelines, options);
  }

  findOne(options = {}) {
    return this.model
      .findOne()
      .where(options['where'] ?? {})
      .setOptions({
        ...options,
      });
  }

  async find(options: any = {}) {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;
    const data = await this.model
      .find()
      .where(options['where'] ?? {})
      .setOptions({
        limit,
        skip,
        ...options,
      });

    const total = await this.model.countDocuments(options['where'] ?? {});

    return {
      page,
      total,
      data,
      limit,
    };
  }

  getOptions(options: any = {}) {
    return this.model
      .find()
      .where(options['where'] ?? {})
      .setOptions({
        limit: options.limit ?? 100,
        ...options,
      });
  }

  findById(id, options = {}) {
    return this.model
      .findById(id)
      .where(options['where'] ?? {})
      .setOptions(options);
  }

  update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  create(data) {
    return this.model.create(data);
  }

  remove(id) {
    return this.model.findByIdAndDelete(id);
  }
}
