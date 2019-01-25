import * as angular from 'angular'
import { ngTableModule } from 'ng-table' 
import wbLoading from './wbLoading/WbLoading'
import { MasterDirective } from './wbMasterDetail/Master'
import { DetailDirective, DetailSaveButton, DetailDeleteButton, DetailCloseButton } from './wbMasterDetail/Detail'

export default angular
    .module('app.core', [
        ngTableModule.name, 
    ])
    .directive(wbLoading.name, () => new wbLoading.directive)
    .directive("masterDetail", () => new MasterDirective)
    .directive("wbDetail", () => new DetailDirective)
    .directive("detailSaveButton", () => new DetailSaveButton)
    .directive("detailDeleteButton", () => new DetailDeleteButton)
    .directive("detailCloseButton", () => new DetailCloseButton)
