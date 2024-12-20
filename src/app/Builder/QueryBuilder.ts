import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }
  search(searchFields: string[]) {
    const search = this?.query?.search;
    const searchValue = searchFields.map((value) => ({
      [value]: { $regex: search, $options: 'i' },
    }));
    if (search) {
      this.queryModel = this.queryModel.find({ $or: searchValue });
    }
    return this;
  }

  sort() {
    const sortBy = this.query?.sortBy as string;
    const sortOrder = this.query?.sortOrder === 'desc' ? -1 : 1;
    if (sortBy) {
      this.queryModel = this.queryModel.sort({ [sortBy]: sortOrder });
    }
    return this;
  }
  filter() {
    const queryObj = { ...this.query };
    const excludedFields = ['search', 'sortBy', 'sortOrder'];
    excludedFields.forEach((field) => delete queryObj[field]);
    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>);
    return this;
  }
}
export default QueryBuilder;
