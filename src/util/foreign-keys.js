export default class ForeignKeys {
  constructor(data) {
    this.cache = {};
    Object.entries(data.relationships)
      .filter(([_, { data }]) => data)
      .map(([type, { data }]) => ({ [singular(type) + "_ids"]: data.map(related => related.id) }))
  }


}