import {ExtendedHookConfig, HookBaseClass} from '../hook-base';

type Cfg = ExtendedHookConfig<{
  pushEvents: {
    client_sider_mounted: {payload: {id: string}};
    client_sider_still_alive: {payload: {id: string}};
    client_sider_destroyed: {payload: {id: string}};
  };
}>;

export class ClientSider extends HookBaseClass<Cfg> {
  tickId: number | undefined;

  mounted() {
    console.log('ClientSider mounted');
    this.pushEvent('client_sider_mounted', {id: this.el.id});

    this.tickId = setInterval(() => {
      console.log('ClientSider still alive');
      this.pushEvent('client_sider_still_alive', {id: this.el.id});
    }, 1000);
  }

  destroyed() {
    console.log('ClientSider destroyed');
    this.pushEvent('client_sider_destroyed', {id: this.el.id});
    clearInterval(this.tickId);
  }
}
