angular.module('questCreator').controller('sceneCtrl', function(socket, $state, $scope, $compile, EditorService) {
  var self = this;

  this.view = 'events';

  this.selecting = {
    background: false,
    object: false,
    entity: false
  };

  this.selectedObject = null;
  this.selectedEntity = null;
  this.selectedEvent= null;

  this.selectBackground = function(background) {
    EditorService.getAssetInfo(background.id, 'backgrounds').done(function(info) {
        background.info = info;
        $scope.editor.currentScene.background = angular.copy(background);
        self.selecting.background = false;
        $scope.$apply();
    });
  };

  this.selectObject = function(object) {
    if (!object) {
      return;
    }
    EditorService.getAssetInfo(object.id, 'obstacles').done(function(info) {
        object.info = info;
        $scope.editor.currentScene.objects.push(angular.copy(object));
        self.selecting.object = false;
    });
  };

  this.selectEntity = function(entity) {
    if (!entity) {
      return;
    }
    EditorService.getAssetInfo(entity.id, 'entities').done(function(info) {
        entity.info = info;
        $scope.editor.currentScene.entities.push(angular.copy(entity));
        self.selecting.entity = false;
    });
  };

  this.selectEvent = function(event) {
    if (!event){
      return;
    }
    $scope.editor.currentScene.events.push(angular.copy(event));
  };

  this.alreadyAdded = function(event){
    if (!$scope.editor.currentScene){
      return false;
    } else {
      return $scope.editor.currentScene.events.forEach(function(element) {
        if (event.id === element.id){
          return true;
        } else {
          return false;
        }
      });
    }
  }

  this.removeEvent = function(index){
    $scope.editor.currentScene.events.splice(index, 1);
  };

  this.addLocationEvent = function(){
    var locationCount = ($scope.editor.currentScene.events.filter(function(element){
      return element.category === "location";
    })).length;
    console.log("LocationCount: ", locationCount);
    var name = (locationCount >= 1) ? "New Location Event " + (locationCount) : "New Location Event";
    var newEvent = {
      name: name,
      category: 'location',
      info: {
        requirements: [],
        results: {
          achievements: [],
          inventory: [],
          portal: {},
          text: []
        },
        triggers: []
      },
    };
    console.log("newEvent: ", newEvent);
    $scope.editor.currentScene.events.push(newEvent);
  };

  this.anyResults = function(event){
    if (!event) {
      return false;
    }
    var results = event.info.results;
    if (results.text.length > 0 ||
        results.achievements.length > 0 ||
        results.inventory.length > 0 ||
        Object.keys(results.portal).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  this.anyRequirements = function(event){
    if (!event) {
      return false;
    }
    if (event.info.requirements.length === 0) {
      event.info.requirements = {
        achievements: [],
        inventory: []
      }
    }
    var requirements = event.info.requirements;
    //OH MY GOD THIS IS SO HACKY
    if (requirements.achievements.length > 0 ||
        requirements.inventory.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  this.removeAsset = function(index, type){
    $scope.editor.currentScene[type].splice(index, 1);
  };

  this.saveScene = function(scene) {
    console.log("Turns out saving is unnecessary here. Here's the game as proof.");
    console.log($scope.editor.currentEditingGame);
  };

  this.placeAsset = function(asset, type) {
    console.log("placin");
    var position = {
      'top': "{{"+type+ ".info.pos.x}}",
      'left': "{{"+type+ ".info.pos.y}}",
      'position': 'absolute'
    };
    var url = asset.thumbnail;
    var html = '<img src="'+url+'" draggable">';
    var template = angular.element(html);
    var linkFn = $compile(template);
    var element = linkFn($scope);
    $(element).appendTo('#scene-BG');
    $scope.apply;
  };

});
