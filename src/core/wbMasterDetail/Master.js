import { NgTableParams } from 'ng-table'
import { isArray, isObject, isFunction } from 'util'
import { isEmpty } from 'lodash'

import masterView from './master.html'
import './master-detail.scss'

export class MasterDirective {
  constructor() {
    this.restrict = 'E'
    this.replace = true
    this.transclude = {
      filters: '?masterFilters',
      actions: '?masterActions',
      header: 'masterHeader',
      content: 'masterContent',
      detail: '?detailContent' 
    }
    this.template = masterView
  }
}

export class MasterCtrl {
  constructor($scope, $state, $timeout) {
    this.$scope = $scope
    this.$state = $state
    this.tableClass = ''

    this.status = 'ok'
    this.selected = null
    this.filterValues = []

    this.showDetail = false

    this.summary = {}
    // this.pagination = {
    //   params: {},
    //   pages: []
    // }

    this.table = new NgTableParams(
      { page: 1, count: 20, maxBlocks: 1 },
      {
        counts: [10, 20, 50],
        paginationMaxBlocks: 7,
        getData: params => this._getData(params)
      })

    $scope.$watchCollection(() => $state.params, async params => {
      $timeout(() => {
        this.selected = params.id
        this.showDetail = !isEmpty(this.selected)
      })
    })
  }

  async _getData(params) {
    // Make sure no duplication
    if (this.status === 'loading') {
      return
    }
    //   console.log(params)
    // Clear the current selected item
    this.selected = null
    // Mark loading state
    this.status = 'loading'

    try {
      let rows = null
      const res = await this.list(this.filterValues, params)
      if (isArray(res)) {
        rows = res
      } else if (isObject(res)) {
        if (res.summary) {
          params.total(res.summary.count || 0)

          this.summary = res.summary
          this.pagination = {
            params,
            pages: params.generatePagesArray()
          }
        }
        rows = res.data
      } else {
        throw new Error('Unexpected data type loading master list')
      }

      this.status = 'ok'
      return rows
    } catch (err) {
      console.log(err)
      this.status = 'error'
    } finally {
      this.$scope.$digest()
    }
  }

  /**
   * Child class to provide data loading logic.
   * @param {object} filters 
   * @param {object} params 
   */
  list(filters, params)  {
    Promise.reject('Not implemented')
  }

  /**
   * Call to reload the data, mostly for view to call.
   */
  reload() {
    if (this.data) {
      this.data.reload()
    }
  }

  /**
   * Select the given item.
   * @param {object} item the item to be selected.
   */
  select(item) {
    this.$state.go('.', { id: item.id }, { notify: false })
  }
}