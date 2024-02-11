export type MachineParams<A extends Record<string, Record<string, any>>> =
  keyof A extends infer Type
    ? Type extends keyof A
      ? keyof A[Type] extends ''
        ? { readonly type: Type }
        : { readonly type: Type; readonly params: A[Type] }
      : never
    : never;

export interface Context {
  readonly currentTime: number;
  readonly audioRef: HTMLAudioElement | null;
  readonly audioContext: AudioContext | null;
  readonly trackSource: MediaElementAudioSourceNode | null;
}

export type Events = MachineParams<{
  play: {};
  restart: {};
  end: {};
  pause: {};
  loaded: {};
  loading: { readonly audioRef: HTMLAudioElement };
  error: { readonly message: unknown };
  'init-error': { readonly message: unknown };
  time: { readonly updatedTime: number };
}>;
