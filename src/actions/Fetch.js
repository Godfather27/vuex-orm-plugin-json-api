import Action from './Action'
import Context from '../common/context'
import { plural, singular } from 'pluralize'

const normalize = data => ({
  id: data.id,
  ...data.attributes
});

export default class Fetch extends Action {
  /**
   * Call $fetch method
   * @param {object} store
   * @param {object} params
   */
  static async call(store, params = {}) {
    const { state } = store;
    const context = Context.getInstance()
    const model = context.getModelFromState(state)
    const axios = context.axios;

    try {
      // fetch datasets from model with included (optional)
      const { data: { data, included = [] } } = await axios.get(model.entity, { params });
      const dataSetsByType = this.groupDataSetsByModel([...data, ...included]);
      const insertedData = this.insertData(store, dataSetsByType)
      return insertedData
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * groups
   * @param {object} store
   * @param {object} dataSetsByType
   */
  static groupDataSetsByModel(dataSets) {
    const splitDataSets = {}
    dataSets.forEach(dataSet => {
      if (splitDataSets[dataSet.type]) {
        splitDataSets[dataSet.type].push(normalize(dataSet))
      } else {
        splitDataSets[dataSet.type] = [normalize(dataSet)]
      }
    });
    return splitDataSets;
  };

  /**
   * Inserts DataSets for each model
   * @param {object} store
   * @param {object} dataSetsByType
   */
  static insertData (store, dataSetsByType) {
    return Object.entries(dataSetsByType)
      .map(([type, data]) => {
        this.insertOrUpdate(store, { type, data })
      })
  }

  /**
   * On Successful Request Method
   * @param {object} dispatch
   * @param {string} type
   * @param {array} data
   */
  static insertOrUpdate({ commit, dispatch }, { type, data }) {
    commit('onSuccess')
    return dispatch('insertOrUpdate', {
      entity: plural(type),
      data
    })
  }

  /**
   * On Failed Request Method
   * @param {object} commit
   * @param {object} error
   */
  static onError(commit, error) {
    commit('onError', error)
  }
}
