/**
 * vConsole-resouces Plugin
 *
 * @author WechatFE
 */

import './style.less';
import Stats from 'stats.js';

class VConsoleStatsPlugin {
  constructor(vConsole) {
    this.vConsole = vConsole;
    this.$ = vConsole.$;
    this.dom = null;
    this.requestID = null;
    this.stats = null;
    return this.init();
  }

  init() {
    const vConsoleStats = new window.VConsole.VConsolePlugin('Stats', 'Stats');

    vConsoleStats.on('ready', () => {
      const { $ } = this;
      $.delegate($.one('.vc-stats-buttons'), 'click', '.vc-stats-button', (e) => {
        const currentType = e.target.dataset.type;
        this.changePanel(currentType);
      });
    });

    vConsoleStats.on('renderTab', (callback) => {
      const html = `<div class="vc-stats-buttons">
        <p>
          <button class="vc-stats-button" data-type="0">show FPS</button>
          <span>: Frames rendered in the last second. The higher the number the better.</span>
        </p>
        <p>
          <button class="vc-stats-button" data-type="1">show MS</button>
          <span>: Milliseconds needed to render a frame. The lower the number the better..</span>
        </p>
        <p>
          <button class="vc-stats-button" data-type="2">show MB</button>
          <span>: MB MBytes of allocated memory. (Run Chrome with --enable-precise-memory-info).</span>
        </p>
      </div>`;
      callback(html);
    });

    vConsoleStats.on('addTool', (callback) => {
      const buttons = [{
        name: 'Show Stats',
        onClick: this.show,
      }, {
        name: 'Close Stats',
        onClick: this.close,
      }];
      callback(buttons);
    });
    this.vConsole.addPlugin(vConsoleStats);
    return vConsoleStats;
  }

  show = () => {
    if (!this.stats) {
      this.stats = new Stats();
      this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
      this.dom = this.stats.dom;
      document.body.appendChild(this.dom);
      this.requestID = requestAnimationFrame(this.loop);
    }
  }

  changePanel = (type) => {
    if (!this.stats) {
      this.show();
    }
    this.stats.setMode(Number(type));
  }

  loop = () => {
    this.stats.update();
    this.requestID = requestAnimationFrame(this.loop);
  }

  close = () => {
    if (this.requestID) {
      cancelAnimationFrame(this.requestID);
    }
    if (this.dom) {
      document.body.removeChild(this.dom);
    }

    this.stats = null;
    this.requestID = null;
    this.dom = null;
  }
}

window.VConsole.VConsoleStatsPlugin = VConsoleStatsPlugin;

export default VConsoleStatsPlugin;