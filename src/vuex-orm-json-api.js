import Context from './common/context';
import Fetch from './actions/Fetch';
import Action from './actions/Action';

export default class VuexORMJsonAPI {
  constructor(components, options) {
    Context.setup(components, options);
    this.setupActions();
    this.setupModels();
  }

  /**
   * This method will setup following model methods: Model.$fetch, Model.$get, Model.$create,
   * Model.$update, Model.$delete
   */
  setupModels () {
    const context = Context.getInstance();

    /**
     * Transform Model and Modules
     */
    context.database.entities.map(entity => {
      entity.module = Action.transformModule(entity.module);
      return entity;
    });

    context.components.Model.$fetch = function (config = {}) {
      return this.dispatch('$fetch', config);
    };
  }

  /**
   * This method will setup following Vuex actions: $fetch, $get, $create, $update, $delete
   */
  setupActions () {
    const context = Context.getInstance();

    context.components.Actions.$fetch = Fetch.call.bind(Fetch);
  }
}
