angular.module('foundation').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/accordion/accordion-item.html',
    '<div class="accordion-item" ng-class="{\'is-active\': active}">\n' +
    '  <div class="accordion-title" ng-click="activate()">{{ title }}</div>\n' +
    '  <div class="accordion-content" ng-transclude></div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('foundation').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/accordion/accordion.html',
    '<div class="accordion" ng-transclude>\n' +
    '</div>\n' +
    '');
}]);

angular.module('foundation').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/actionsheet/actionsheet-button.html',
    '<div>\n' +
    '  <a href="#"\n' +
    '    class="button"\n' +
    '    ng-if="title.length > 0">{{ title }}</a>\n' +
    '  <div ng-transclude></div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('foundation').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/actionsheet/actionsheet-content.html',
    '<div\n' +
    '  class="action-sheet {{ position }}"\n' +
    '  ng-class="{\'is-active\': active}"\n' +
    '  >\n' +
    '    <div\n' +
    '    ng-transclude>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('foundation').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/actionsheet/actionsheet.html',
    '<div class="action-sheet-container"\n' +
    '  ng-transclude>\n' +
    '</div>\n' +
    '');
}]);

angular.module('foundation').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/modal/modal.html',
    '<div\n' +
    '  class="modal-overlay"\n' +
    '  ng-click="hideOverlay($event)">\n' +
    '  <aside\n' +
    '    class="modal"\n' +
    '    ng-transclude>\n' +
    '  </aside>\n' +
    '</div>\n' +
    '');
}]);

angular.module('foundation').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/notification/notification-set.html',
    '<div class="notification-container {{position}}">\n' +
    '  <zf-notification ng-repeat="notification in notifications"\n' +
    '    title="notification.title"\n' +
    '    image="notification.image"\n' +
    '    notif-id = "notification.id"\n' +
    '    color="notification.color"\n' +
    '    autoclose="notification.autoclose"\n' +
    '    >{{ notification.content }}</zf-notification>\n' +
    '</div>');
}]);

angular.module('foundation').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/notification/notification-static.html',
    '<div zf-swipe-close="swipe" class="static-notification {{ color }} {{ position }}">\n' +
    '  <a href="#"\n' +
    '    class="close-button"\n' +
    '    ng-click="hide(); $event.preventDefault(); $event.stopPropagation()">&times;</a>\n' +
    '  <div class="notification-icon" ng-if="image">\n' +
    '    <img ng-src="{{ image }}"/>\n' +
    '  </div>\n' +
    '  <div class="notification-content">\n' +
    '    <h1 ng-bind-html="trustedTitle"></h1>\n' +
    '    <p ng-transclude></p>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('foundation').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/notification/notification.html',
    '<div zf-swipe-close="swipe" class="notification {{ color }}">\n' +
    '  <a href="#"\n' +
    '    class="close-button"\n' +
    '    ng-click="hide(); $event.preventDefault(); $event.stopPropagation()">&times;</a>\n' +
    '  <div class="notification-icon" ng-if="image">\n' +
    '    <img ng-src="{{ image }}"/>\n' +
    '  </div>\n' +
    '  <div class="notification-content">\n' +
    '    <h1 ng-bind-html="trustedTitle"></h1>\n' +
    '    <p ng-transclude></p>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('foundation').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/offcanvas/offcanvas.html',
    '<div\n' +
    '  class="off-canvas {{ position }}"\n' +
    '  ng-class="{\'is-active\': active}"\n' +
    '  ng-transclude>\n' +
    '</div>\n' +
    '');
}]);

angular.module('foundation').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/panel/panel.html',
    '<div\n' +
    '  class="panel"\n' +
    '  ng-class="positionClass"\n' +
    '  ng-transclude\n' +
    '  >\n' +
    '</div>\n' +
    '');
}]);

angular.module('foundation').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/popup/popup.html',
    '<div class="popup" ng-class="{\'is-active\': active }" ng-transclude>\n' +
    '</div>\n' +
    '');
}]);

angular.module('foundation').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/tabs/tab-content.html',
    '<div class="tab-contents">\n' +
    '  <div zf-tab-individual\n' +
    '    class="tab-content"\n' +
    '    ng-class="{\'is-active\': tab.active}"\n' +
    '    ng-repeat="tab in tabs"\n' +
    '    tab="tab">\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('foundation').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/tabs/tab.html',
    '<div class="tab-item"\n' +
    '  ng-class="{\'is-active\': active}"\n' +
    '  ng-click="makeActive()">{{ title }}</div>\n' +
    '');
}]);

angular.module('foundation').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/tabs/tabs.html',
    '<div>\n' +
    '  <div class="tabs" ng-transclude>\n' +
    '  </div>\n' +
    '  <div zf-tab-content\n' +
    '    target="{{ id }}"\n' +
    '    ng-if="showTabContent">\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
