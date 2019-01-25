import { isEmpty } from 'lodash'
import detailView from './standalone-detail.html'

/**
 * An object detail base directive, child class must provide
 * 1. template
 * 2. controller
 */
export class StandaloneDetailDirective {
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
 * Detail controller which meant to be used as standalone page.
 */
export class StandaloneDetailController {

  constructor($scope) {
    this.$scope = $scope
    this.status = 'empty'
    this.current = null
    this.focusField = 'name'
    // Child class to override this method and provide the data loading logic
    this._loadFn = () => Promise.reject('Not implemented')
    // Child class to override this method and provide the data loading logic
    this._saveFn = () => Promise.reject('Not implemented')
  }

  /**
   * Reload upon init.
   */
  $onInit() {
    this.reload()
  }

  /**
   * Child class to provide extra processing after the object is loaded.
   * @param {object} obj the loaded object
   */
  onloaded(obj) {
    // Empty by default
  }

  /**
   * Child class to provide custom modifying before saving.
   * @param {object} obj the object to be saved.
   */
  onBeforeSaving(obj) {
    return true
  }

  /**
   * Child class to provide extra processing after saving.
   * @param {object} obj the saved object. 
   */
  onSaved(obj) {
    // Empty be default
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
      let obj = await this._loadFn()
      // console.log(obj)
      // In case server return cas and value, for now we care about the value
      // which is the actual object, for future cas should be use cas also
      if (obj && obj.value) {
        this.current = obj.value
      } else {
        this.current = obj
      }
      this.status = 'ok'
      // Give child class a chance to do more processing
      // this.onloaded(obj)
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
    // Make sure no duplication posts
    if (this.submitting) {
      console.log('Skip duplicate saving')
      return
    }
    // There are still error on form, do nothing
    if (!this.$form || this.$form.$invalid) {
      console.log(`Form's either not exist or invalid`)
      return
    }
    // Make sure data is good for saving
    if (!this.current || isEmpty(this.current.id)) {
      console.log('No object to save or object does not have valid id')
      return
    }
    // Give child a change to do extra work before saving 
    if (!this.onBeforeSaving(this.current)) return

    this.submitting = true

    try {
      await this._saveFn(this.current)
      // Show success message
      // $wbUtils.showSuccessToast(`${displayName} was saved!`)
      // Reset form
      // $scope[formName].$setPristine(true)
      // Call the event of saving 
      // if (_.isFunction($child.onSaved))
      //   $child.onSaved($scope.current)
    } catch (err) {
      console.log(err)

      // Show error retry Toast
      // $wbUtils.showErrorRetryToast(err, `Could not save ${displayName}.`, function () { _save(partner) })
    } finally {
      this.submitting = false
    }

    this.$scope.$digest()
  }
}