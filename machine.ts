import { assign, setup } from "xstate";
import { Context, Events } from "./machine-types";
import { onLoad, onPause } from "./effect";
import { Effect } from "effect";

export const machine = setup({
  types: {
    events: {} as Events,
    context: {} as Context,
  },
  actions: {
    onLoad: assign(({ self }, { audioRef }: { audioRef: HTMLAudioElement }) =>
      onLoad({ audioRef, audioContext: null, trackSource: null }).pipe(
        Effect.tap(() =>
          Effect.sync(() => self.send({ type: "loaded" }))
        ),
        Effect.tapError(({ message }) =>
          Effect.sync(() => self.send({ type: "error", params: { message } }))
        ),
        Effect.map(({ context  }) => context ),
        Effect.catchTag("OnLoadError", ({ context }) => Effect.succeed(context)),
        Effect.runSync
      )),
    onError: ({ context, event }) => { },
    onPause: ({ context: { audioRef } }) => onPause({ audioRef }).pipe(Effect.runSync),
    onRestart: ({ context, event }) => { },
    onTimeUpdate: assign((_, { updatedTime }: { updatedTime: number }) => ({ currentTime: updatedTime })),
    onPlay: ({ context, event }) => { }
  },
  actors: {},
  guards: {},
  delays: {},
}).createMachine(
  {
    context: {
      audioRef: null,
      currentTime: 0,
      trackSource: null,
      audioContext: null,
    },
    id: "Audio Player",
    initial: "Init",
    states: {
      Init: {
        on: {
          loading: {
            target: "Loading",
            actions: {
              type: "onLoad",
            },
          },
          "init-error": {
            target: "Error",
            actions: {
              type: "onError",
            },
          },
        },
      },
      Loading: {
        on: {
          error: {
            target: "Error",
            actions: {
              type: "onError",
            },
          },
          loaded: {
            target: "Active",
          },
        },
      },
      Error: {
        type: "final",
      },
      Active: {
        initial: "Paused",
        states: {
          Paused: {
            entry: {
              type: "onPause",
            },
            on: {
              play: {
                target: "Playing",
              },
              restart: {
                target: "Playing",
                actions: {
                  type: "onRestart",
                },
              },
            },
          },
          Playing: {
            entry: {
              type: "onPlay",
            },
            on: {
              pause: {
                target: "Paused",
              },
              end: {
                target: "Paused",
              },
              restart: {
                target: "Playing",
                actions: {
                  type: "onRestart",
                },
              },
              time: {
                target: "Playing",
                actions: {
                  type: "onTimeUpdate",
                  params: ({ event }) => ({
                    updatedTime: event.params.updatedTime,
                  }),
                },
              },
            },
          },
        },
      },
    },
  },
);
