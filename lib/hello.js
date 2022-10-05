'use babel';

import HelloView from './hello-view';
import { CompositeDisposable } from 'atom';

export default {

  helloView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.helloView = new HelloView(state.helloViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.helloView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'hello:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.helloView.destroy();
  },

  serialize() {
    return {
      helloViewState: this.helloView.serialize()
    };
  },

  toggle() {
    console.log('Hello was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
