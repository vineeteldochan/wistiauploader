
 describe('Testing Wistia Video uploader', function() {
  describe('Testing uploaderController', function(){
      beforeEach(module('processstdemo'));
      it('should initialize vidlist with empty array', inject(function($componentController){
        var scope = {},
        attrs = {},
        element = angular.element('<div></div>'); //provide element you want to test

        var ctrl = $componentController('uploader',{$scope: scope, $element:element, $attrs:attrs });

        expect(ctrl.vidlist).toBeDefined();
        expect(ctrl.vidlist.length).toBe(0);
      }));

      it('should pick up the accesstoken from the attribute', inject(function($componentController){
        var scope = {},
        attrs = {accesstoken:"c669e5d08ba3a80943a61068d0b217c624e5a7f7f3835925434a982abbc6b894"},
        element = angular.element('<div></div>'); //provide element you want to test

        var ctrl = $componentController('uploader',{$scope: scope, $element:element, $attrs:attrs });

        expect(attrs.accesstoken).toBe("c669e5d08ba3a80943a61068d0b217c624e5a7f7f3835925434a982abbc6b894");

      }));
  });
});
