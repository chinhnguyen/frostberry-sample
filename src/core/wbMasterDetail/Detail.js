import { isEmpty } from 'lodash'
import detailView from './detail.html'
import saveButton from './save-button.html'
import deleteButton from './delete-button.html'
import closeButton from './close-button.html'
import { StandaloneDetailController } from './StandaloneDetail'

/**
 * An object detail base directive, child class must provide
 * 1. template
 * 2. controller
 */
export class DetailDirective {
  constructor() {
    this.restrict = 'E'
    this.replace = true
    this.transclude = {
      toolbar: '?detailToolbar',
      content: 'detailContent' 
    }
    this.template = detailView
  }
}

/**
 * The save button to be used in detail view's toolbar.
 */
export class DetailSaveButton {
  constructor() {
    this.restrict = 'E'
    this.replace = true
    this.template = saveButton
  }
}

/**
 * The save button to be used in detail view's toolbar.
 */
export class DetailDeleteButton {
  constructor() {
    this.restrict = 'E'
    this.replace = true
    this.template = deleteButton
  }
}

/**
 * The save button to be used in detail view's toolbar.
 */
export class DetailCloseButton {
  constructor() {
    this.restrict = 'E'
    this.replace = true
    this.template = closeButton
  }
}

/**
 * Detail controller which meant to be used together with a master and is supposed to be 
 * controller for a directive which is:
 * 1. bindToController = true
 * 2. scope = {
 *  id: '<'
 * }
 */
export class DetailController extends StandaloneDetailController {
  constructor($scope, $timeout, $api) {
    super($scope)

    this._loadFn = () => $api.get(this.id)
    this._saveFn = it => $api.upsert(it)

    $scope.$watch('$ctrl.id', () => { 
      $timeout(() => this.reload())
    })
  }

  $onInit() {
    // Override to prevent auto data loading
  }


}