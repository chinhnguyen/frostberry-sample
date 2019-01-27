import { isEmpty } from 'lodash'
import { DetailController } from '../core/wbMasterDetail/Detail'
import template from './company-detail.html'

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
  /*@ngInject*/ constructor($rootScope, $scope, $state, $timeout, $mdDialog, $wbDialog, $api) {
    super($rootScope, $scope, $state, $timeout, $mdDialog, $wbDialog, $api)
    this.$api = $api
    this.displayName = "Company"
  }

  newObject() {
    return Promise.resolve({
      id: '', 
      name: ''
    })
  }

  async getObject(id) {
    return await this.$api.getCompany(id)
  }

  async saveObject(obj) {
    if (isEmpty(obj.id)) {
      delete obj.id
      return await this.$api.createCompany(obj)
    } else {
      const updated = await this.$api.updateCompany(obj.id, obj)
      console.log(updated)
      return updated
    }
  }

  async deleteObject(id) {
    return await this.$api.deleteCompany(id)
  }
}

export default {
  name: 'companyDetail',
  directive: CompanyDetail
}

