import type {Socket} from 'phoenix';

export class LiveSocket {
  constructor(url: string, phxSocket: typeof Socket, opts: {});

  connect(): void;
  enableDebug(): void;
  enableLatencySim(upperBoundMs: number): void;
  disableLatencySim(): void;
}
