import { _decorator, Component, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LoadingScreen")
export class LoadingScreen extends Component {
  start() {
    this.loadGameScene();
  }

  loadGameScene() {
    director.preloadScene("MainScene", null, () => {
      director.loadScene("MainScene");
    });
  }
}
