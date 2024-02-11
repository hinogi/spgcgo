import { createMachine } from "xstate";
import { Context, Events } from "./machine-types";

export const machine = createMachine(
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
                },
              },
            },
          },
        },
      },
    },
    types: {
      events: {} as Events,
      context: {} as Context,
    },
  },
  {
    actions: {
      onLoad: ({ context, event }) => {},
      onError: ({ context, event }) => {},
      onPause: ({ context, event }) => {},
      onRestart: ({ context, event }) => {},
      onTimeUpdate: ({ context, event }) => {},
    },
    actors: {},
    guards: {},
    delays: {},
  },
);
