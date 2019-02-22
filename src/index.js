import VuexORMJsonAPI from './vuex-orm-json-api';

export default class VuexORMJsonAPIPlugin {
  /**
   * This is called, when VuexORM.install(VuexORMJsonAPI, options) is called.
   *
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   * @returns {VuexORMJsonAPI}
   */
  static install(components, options) {
    return new VuexORMJsonAPI(components, options);
  }
}
