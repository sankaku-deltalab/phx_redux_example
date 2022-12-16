import {ExtendedHookConfig, HookBaseClass, HookConfig} from '../hook-base';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from '../redux/app/store';
import {increment, decrement} from '../redux/features/example/exampleSlice';
import App from '../redux/page-components/App';

type Cfg = ExtendedHookConfig<{
  pushEvents: HookConfig['pushEvents'];
  handleEvents: {
    inc: {payload: {}};
    dec: {payload: {}};
  };
}>;

type Ev<Payload extends Record<string, unknown>> = Event & {detail: Payload};

export class ClientSider extends HookBaseClass<Cfg> {
  mounted() {
    this.setupServerToClientHandling();
    this.setupClientToServerHandling();
    this.setupClientToClientHandling();
    this.setupReact();
  }

  private setupServerToClientHandling(): void {
    this.handleEvent('inc', ({}) => {
      store.dispatch(increment());
    });
    this.handleEvent('dec', ({}) => {
      store.dispatch(decrement());
    });
  }

  private setupClientToServerHandling(): void {
    this.el.addEventListener('c2s', (e: Ev<{event: string; payload: Record<string, unknown>}>) => {
      const {event, payload} = e.detail;
      this.pushEvent(event, payload);
    });
  }

  private setupClientToClientHandling(): void {
    this.el.addEventListener('incEl', (e: Ev<{}>) => {
      store.dispatch(increment());
    });
    this.el.addEventListener('decEl', (e: Ev<{}>) => {
      store.dispatch(decrement());
    });
  }

  private setupReact(): void {
    const root = createRoot(this.el);

    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
  }

  destroyed() {
    const root = createRoot(this.el);
    root.unmount();
  }

  static sendMessageToServer(id: string, event: string, payload: {}): void {
    // redux can call this function
    // and other hooks can call this via `JS.dispatch`
    // https://hexdocs.pm/phoenix_live_view/Phoenix.LiveView.JS.html#module-custom-js-events-with-js-dispatch-1-and-window-addeventlistener
    const detail = {event, payload};
    const ev = new CustomEvent('c2s', {detail});
    document.getElementById(id)!.dispatchEvent(ev);
  }
}
