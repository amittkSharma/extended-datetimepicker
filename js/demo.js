/**
 * Created by intelWorx on 11/11/2015.
 */
(function () {
  'use strict';
  angular.module('mdDatetimePickerDemo', [
      'ngMaterialDatePicker'
    ])
    .controller('DemoCtrl', function ($scope) {

      var startOfWeek = moment().startOf('week');
      var endOfWeek = moment().endOf('week');

      var days = [];
      var day = startOfWeek;

      while (day <= endOfWeek) {
          days.push(day.format("YYYY-MM-DDTHH:mm:ssZ"));
          day = day.clone().add(1, 'd');
      }

      $scope.date = new Date();
      $scope.time = new Date();
      $scope.dateTime = new Date();
      $scope.minDate = moment().subtract(1, 'month');
      $scope.maxDate = moment().add(1, 'month');
      $scope.dates = days

    })

    .directive('exSourceCode', function () {
      return {
        template: '<h4>{{title}}</h4><pre  hljs class="html"><code>{{sourceCode}}</code></pre>',
        scope: {},
        link: function (scope, element, attrs) {
          var tmp = angular.element((element.parent()[0]).querySelector(attrs.target || 'md-input-container'));
          if (tmp.length) {
            scope.title = attrs.title || "Source Code";
            var sourceCode = tmp[0].outerHTML
              .replace('ng-model=', 'angularModel=')
              .replace(/ng-[a-z\-]+/g, '')
              .replace(/ +/g, ' ')
              .replace('angularModel=', 'ng-model=')
              ;
            scope.sourceCode = style_html(sourceCode, {
              'indent_size': 2,
              'indent_char': ' ',
              'max_char': 78,
              'brace_style': 'expand'
            });
          }
        }
      };
    })
    .directive('hljs', function ($timeout) {
      return {
        link: function (scope, element) {
          $timeout(function () {
            hljs.highlightBlock(element[0].querySelector('code'));
          }, 100);
        }
      };
    })
  ;
})();