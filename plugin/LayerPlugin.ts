/*
 * @Author: 秦少卫
 * @Date: 2023-06-15 23:23:18
 * @LastEditors: 秦少卫
 * @LastEditTime: 2024-07-06 23:53:42
 * @Description: 图层调整插件
 */

import { fabric } from 'fabric';
import type { IEditor, IPluginTempl } from '@vfabric/core';

type IPlugin = Pick<LayerPlugin, 'up' | 'down' | 'toFront' | 'toBack'>;

declare module '@vfabric/core' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface IEditor extends IPlugin {}
}

class LayerPlugin implements IPluginTempl {
  static pluginName = 'LayerPlugin';
  static apis = ['up', 'down', 'toFront', 'toBack'];
  constructor(public canvas: fabric.Canvas, public editor: IEditor) {}

  _getWorkspace() {
    return this.canvas.getObjects().find((item) => item.id === 'workspace');
  }

  _workspaceSendToBack() {
    const workspace = this._getWorkspace();
    workspace && workspace.sendToBack();
  }

  up() {
    const actives = this.canvas.getActiveObjects();
    if (actives && actives.length === 1) {
      const activeObject = this.canvas.getActiveObjects()[0];
      activeObject && activeObject.bringForward();
      this.canvas.renderAll();
      this._workspaceSendToBack();
    }
  }

  down() {
    const actives = this.canvas.getActiveObjects();
    if (actives && actives.length === 1) {
      const activeObject = this.canvas.getActiveObjects()[0];
      activeObject && activeObject.sendBackwards();
      this.canvas.renderAll();
      this._workspaceSendToBack();
    }
  }

  toFront() {
    const actives = this.canvas.getActiveObjects();
    if (actives && actives.length === 1) {
      const activeObject = this.canvas.getActiveObjects()[0];
      activeObject && activeObject.bringToFront();
      this.canvas.renderAll();
      this._workspaceSendToBack();
    }
  }

  toBack() {
    const actives = this.canvas.getActiveObjects();
    if (actives && actives.length === 1) {
      const activeObject = this.canvas.getActiveObjects()[0];
      activeObject && activeObject.sendToBack();
      this.canvas.renderAll();
      this._workspaceSendToBack();
    }
  }

  contextMenu() {
    const activeObject = this.canvas.getActiveObject();
    if (activeObject) {
      return [
        {
          text: 'Layer Management',
          hotkey: '❯',
          subitems: [
            {
              text: 'Bring Forward',
              hotkey: '',
              onclick: () => this.up(),
            },
            {
              text: 'Send Backward',
              hotkey: '',
              onclick: () => this.down(),
            },
            {
              text: 'Bring to Front',
              hotkey: '',
              onclick: () => this.toFront(),
            },
            {
              text: 'Send to Back',
              hotkey: '',
              onclick: () => this.toBack(),
            },
          ],
        },
      ];
      // return [{ text: '复制', hotkey: 'Ctrl+V', disabled: false, onclick: () => this.clone() }];
    }
  }

  destroy() {
    console.log('pluginDestroy');
  }
}

export default LayerPlugin;
