import { Injectable } from '@nestjs/common';
import { MenuModel } from 'db/models/menu';

@Injectable()
export class MenuService {
  constructor(public model: MenuModel) {}

  create(body) {
    return this.model.create(body);
  }

  find(query = {}) {
    return this.model.find({
      ...query,
    });
  }

  update(id, body) {
    return this.model.findByIdAndUpdate(id, {
      $set: {
        ...body,
      },
    });
  }

  delete(id) {
    return this.model.findByIdAndRemove(id);
  }
}
