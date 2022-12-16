import {ExtendedHookConfig, HookBaseClass, HookConfig} from '../hook-base';

type Cfg = ExtendedHookConfig<{
  el: HTMLInputElement;
  handleEvents: {
    erace_value: {payload: {id_for_filter: string}};
  };
}>;

export class ValueEracable extends HookBaseClass<Cfg> {
  mounted() {
    this.handleEvent('erace_value', ({id_for_filter}) => {
      console.log('erace_value');
      if (this.el.id !== id_for_filter) return;
      this.el.value = '';
    });
  }
}
