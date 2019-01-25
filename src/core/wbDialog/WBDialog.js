import  { isFunction } from 'lodash'

/*@ngInject*/ function WBDialog($mdToast, $mdDialog) {
  return {
    /**
     * Call this to show an error Toast with option for retry.
     * 
     * @param {any} err The Error object.
     * @param {string} def_message Default message if cannot get a message from Error object.
     * @param {string} pos The Toast position - see possible value in https://material.angularjs.org/latest/demo/toast.
     * @param {any} element The element to show Toast upon, otherwise default to #main-content.
     */
    showErrorRetryToast: (err, def_message, retry, pos, element) => {
      // default message
      var message = def_message
      // try to override the message using err object
      if (err) { 
        // Log it to console for referecne
        console.log(err) 
        // override the message
        message = err.message || def_message 
      }
      // Show the toast with Retry option
      $mdToast.show(
        $mdToast.simple()
          .content("[ERROR] " +  message)
          .position(pos || 'bottom left')
          .hideDelay(5000)
          .action('Retry')
          .highlightAction(true)
      ).then(response => {
        if (response === 'ok' && isFunction(retry)) {
          retry()
        }
      })
    },

    /**
     * Call this to show an error Toast.
     * 
     * @param {string} message The message to display.
     * @param {string} pos The Toast position - see possible value in https://material.angularjs.org/latest/demo/toast.
     * @param {any} element The element to show Toast upon, otherwise default to #main-content.
     */
    showErrorToast: (message, pos, element) => {
      $mdToast.show(
        $mdToast.simple()
          .content("[ERROR] " +  message)
          .position(pos || 'bottom left') // Default to bottom left
          .hideDelay(3000) // Hide after 3s
          .action('OK')
          .highlightAction(true)
      ).then(response => {
        if (response === 'ok') { 
          $mdToast.hide(this)
        }
      })
    },

    /**
     * Call this to show a success Toast.
     * 
     * @param {string} message The message to display.
     * @param {string} pos The Toast position - see possible value in https://material.angularjs.org/latest/demo/toast.
     * @param {any} element The element to show Toast upon, otherwise default to #main-content.
     */
    showSuccessToast: (message, pos, element) => {
      $mdToast.show(
        $mdToast.simple()
          .content("[OK] " + message)
          .position(pos || 'bottom left')
          .hideDelay(3000)
          .action('OK')
          .highlightAction(true)
      ).then(response => {
        if (response === 'ok') { 
          $mdToast.hide(this)
        }          
      })
    },

    /**
     * Call this to show a confirmation Dialog.
     * 
     * @param {function} save The action to be called for saving.
     * @param {function} next The action to be called for continuing (called on both YES/NO).
     */
    showSaveConfirm: function(save, next) {
      var confirm = $mdDialog.confirm()
        .title('Save confirmation')
        .content('Do you want to save your changes first?')
        .ariaLabel('Save confirmation')
        .cancel('No.')
        .ok('Yes, please save it.')
      $mdDialog.show(confirm).then(() => {
        if (isFunction(save)) { 
          save(next)
        }
      }, () => {
        if (isFunction(next)) { 
          next()
        }
      })
    }
  }
}

export default {
  name: '$wbDialog',
  service: WBDialog
}

