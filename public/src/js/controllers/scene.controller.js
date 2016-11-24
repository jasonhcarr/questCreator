angular.module('questCreator').controller('sceneCtrl', function(socket, $state, $scope, $compile) {
  var self = this;

  this.selecting = {
    background: false,
    object: false,
    entity: false
  };

  this.selectedObject = null;
  this.selectedEntity = null;

  this.selectBackground = function(background) {
    console.log(background);
    $scope.editor.currentScene.background = background;
    self.selecting.background = false;
  }

  this.selectObject = function(object) {
    if (!object) {
      return;
    }
    console.log(object);
    $scope.editor.currentScene.objects.push(object);
    this.placeAsset(object, 'object');
    self.selecting.object = false;
  }

  this.selectEntity = function(entity) {
    if (!entity) {
      return;
    }
    // console.log(entity);
    console.log($scope.editor.currentScene.entities);
    $scope.editor.currentScene.entities.push(entity);
    console.log($scope.editor.currentScene.entities);
    this.placeAsset(entity, 'entity');
    self.selecting.entity = false;
  }

  this.removeAsset = function(asset, type){
    if (!asset) {
      return;
    }

    var assetType = asset;


    var assetIndex = $scope.editor.currentScene[type].findIndex(function (element){
      console.log("current index's gameID: ", element.game_id);
      return asset.game_id === element.game_id;
    });

    $scope.editor.currentScene[type].splice(assetIndex, 1);
  }

  this.saveScene = function(scene) {
    console.log("Turns out saving is unnecessary here. Here's the game as proof.");
    console.log($scope.editor.currentEditingGame);
  }

  this.placeAsset = function(asset, type) {
    console.log("placin");
    var position = {
      'top': "{{"+type+ ".info.pos.x}}",
      'left': "{{"+type+ ".info.pos.y}}",
      'position': 'absolute'
    };
    // var attributes = {
    //   'src': url,
    //   'ng-style': position
    // };
    var url = asset.thumbnail;
    var html = '<img src="'+url+'" draggable">';
    var template = angular.element(html);
    var linkFn = $compile(template);
    var element = linkFn($scope);
    $(element).appendTo('#scene-BG');
    $scope.apply;
    // console.log(placeholder);
  };


});
