import { isEmpty } from 'lodash'
import detailView from './detail.html'
import saveButton from './save-button.html'
import deleteButton from './delete-button.html'
import closeButton from './close-button.html'

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
      content: 'detailContent', 
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
export class DetailController {
  /*@ngInject*/ constructor($rootScope, $scope, $timeout, $mdDialog, $wbDialog) {
    this.$rootScope = $rootScope
    this.$scope = $scope
    this.$timeout = $timeout
    this.$mdDialog = $mdDialog
    this.$wbDialog = $wbDialog    
    this.status = 'empty'
    this.displayName = 'item'
    this.current = null
    this.focusField = 'name'
    $scope.$watch('$ctrl.id', () => { 
      $timeout(() => this.reload())
    })
  }

  /**
   * Child class to override and provide load by ID logic.
   * @param {string} id 
   */
  getObject(id) {
    return Promise.reject('Not implemented')
  }

  /**
   * Child class to override and provide save logic.
   * @param {object} obj 
   */
  saveObject(obj) {    
    return Promise.reject('Not implemented')
  }

  /**
   * Child class to override and provide delete logic.
   * @param {object} obj 
   */
  deleteObject(id) {
    return Promise.reject('Not implemented')
  }

  /**
   * Signal Master to close it's detail view.
   */
  async close() {
    this.$rootScope.$broadcast('wbDetail.close')
  }

  /**
   * Called to reload the object with UI processing.
   */
  async reload() {
    // Make sure no duplication
    if (this.status === 'loading') {
      return
    }

    // Mark as loading
    this.status = 'loading'
    this.current = null
    try {
      this.current = await this.getObject(this.id)
      this.status = 'ok'
    } catch (err) {
      console.log(err)
      this.status = 'error'
    } finally {
      this.$scope.$digest()
    }
  }

  /**
   * Call to save with UI processing.
   */
  async save() {    
    if (this.submitting || // Make sure no duplication posts
        !this.$form || // Make sure there is a form ...
         this.$form.$invalid || // ... with good data
         !this.current // And there is an object to post
      ) {
      return
    }
    const _save = async () => {
      this.submitting = true
      try {
        await this.saveObject(this.current)
        this.$wbDialog.showSuccessToast(`${this.displayName} was saved!`)
        this.$form.$setPristine(true)
      } catch (err) {
        this.$wbDialog.showErrorRetryToast(err, `Could not save ${this.displayName}.`, () => _save() )
      } finally {
        this.submitting = false
        this.$scope.$digest()
      }
    }
    await _save()
  }

  /**
   * Call by UI's delete function.
   */
  async delete() {    
    if (this.submitting || // Make sure no duplication posts
      !this.current || // Make sure there is an object to delete
      isEmpty(this.current.id) // Make sure the object has an id (not a new object)
      ) { 
        return
    }
    const _delete = async () => {
      this.submitting = true
      try {
        await this.deleteObject(this.current.id)
        this.$wbDialog.showSuccessToast(`${this.displayName} was deleted!`)
        this.$form.$setPristine(true)
      } catch (err) {
        this.$wbDialog.showErrorRetryToast(err, `Could not delete ${this.displayName}.`, () => _delete())
      } finally {
        this.submitting = false
        this.$scope.$digest()
      }
    }

    var confirm = this.$mdDialog.confirm()
        .title(`Would you like to delete this ${this.displayName}?`)
        .content(`This action could not be undone.`)
        .ariaLabel(`Delete ${this.displayName} confirmation`)
        .ok('No')
        .cancel('Yes')        
    this.$mdDialog.show(confirm).then(null, () => _delete())
  }
}