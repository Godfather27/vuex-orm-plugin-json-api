import { ModuleConfig } from '../support/interfaces';
import merge from 'lodash/merge';

export default class Action {
  /**
   * Transform Module to include ModuleConfig
   * @param {object} model
   */
  static transformModule(module) {
    return merge({}, ModuleConfig, module);
  }
}