import template from './wbLoading.html'
import './wbLoading.scss'

class WbLoading {
  constructor() {
    this.restrict = 'E'
    this.replace = true
    this.template = template
    this.scope = {
      status: '<',
      reload: '&',
      errorMessage: '@?',
      emptyMessage: '@?',
    }
  }

  link($scope) {
    $scope.errorMessage = $scope.errorMessage || `Something went wrong while loading data.`
    $scope.emptyMessage = $scope.emptyMessage || `No matching data could be loaded.`
  }
}

export default {
  name: 'wbLoading',
  directive: WbLoading
}

