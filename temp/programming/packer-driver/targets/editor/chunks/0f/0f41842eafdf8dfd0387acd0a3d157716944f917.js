System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, _dec, _class, _crd, ccclass, property, LoadingScreen;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      director = _cc.director;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "97f03u690dF5KopqdXd/SHJ", "LoadingScreen", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("LoadingScreen", LoadingScreen = (_dec = ccclass("LoadingScreen"), _dec(_class = class LoadingScreen extends Component {
        start() {
          this.loadGameScene();
        }

        loadGameScene() {
          director.preloadScene("MainScene", null, () => {
            director.loadScene("MainScene");
          });
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0f41842eafdf8dfd0387acd0a3d157716944f917.js.map