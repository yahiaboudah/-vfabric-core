import { fabric } from 'fabric';
import { SelectMode } from '../eventType';
import type { IEditor, IPluginTempl } from '@vfabric/core';

type IPlugin = Pick<FlipPlugin, 'flip'>;

declare module '@vfabric/core' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface IEditor extends IPlugin {}
}

const t = (key: string) => key;
// import event from '@/utils/event/notifier';

export default class FlipPlugin implements IPluginTempl {
  static pluginName = 'FlipPlugin';
  static apis = ['flip'];
  constructor(public canvas: fabric.Canvas, public editor: IEditor) {}

  flip(type: 'X' | 'Y') {
    const activeObject = this.canvas.getActiveObject();
    if (activeObject) {
      activeObject.set(`flip${type}`, !activeObject[`flip${type}`]).setCoords();
      this.canvas.requestRenderAll();
    }
  }

  contextMenu() {
    const selectedMode = this.editor.getSelectMode();
    if (selectedMode === SelectMode.ONE) {
      return [
        {
          text: 'Flip',
          hotkey: '❯',
          subitems: [
            {
              text: t('flip.x'),
              hotkey: '|',
              onclick: () => this.flip('X'),
            },
            {
              text: t('flip.y'),
              hotkey: '-',
              onclick: () => this.flip('Y'),
            },
          ],
        },
      ];
    }
  }

  destroy() {
    console.log('pluginDestroy');
  }
}
