import { DetailController } from '../core/wbMasterDetail/Detail'
import template from './company-detail.html'
// import { StoreApi } from 'kiolyn-api'

class CompanyDetail {
  constructor() {
    this.restrict = 'E'
    this.template = template
    this.displayName = 'Company'
    this.controller = CompanyDetailController
    this.bindToController = true
    this.controllerAs = '$ctrl'
    this.scope = {
      id: '<',
    }
  }
}

class CompanyDetailController extends DetailController {
  /*@ngInject*/ constructor($rootScope, $scope, $timeout, $mdDialog, $wbDialog) {
    super($rootScope, $scope, $timeout, $mdDialog, $wbDialog)
  }

  getObject(id) {
    return Promise.resolve({id: '123', name: '456'})
  }

  saveObject(obj) {
    return Promise.resolve({})
  }

  deleteObject(id) {
    return Promise.resolve({})
  }
}

export default {
  name: 'companyDetail',
  directive: CompanyDetail
}

