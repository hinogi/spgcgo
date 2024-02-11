import { Console, Data, Effect } from "effect";
import { Context } from "./machine-types";

class OnLoadError extends Data.TaggedError("OnLoadError")<{
    context: Partial<Context>;
    message: string;
  }> {}
  
  class OnLoadSuccess extends Data.TaggedClass("OnLoadSuccess")<{
    context: Partial<Context>;
  }> {}

export const onLoad = ({
    audioRef,
    audioContext,
    trackSource
}: {
    audioRef: HTMLAudioElement;
    audioContext: AudioContext | null;
    trackSource: MediaElementAudioSourceNode | null;
}) => 
    Effect.gen(function* (_) {
        const AudioContext = window.AudioContext ?? (window as any).webkitAudioContext ?? false;

        if (!AudioContext) {
            return yield* _(
                Effect.fail(
                    new OnLoadError({
                        context: { audioRef },
                        message: "AudioContext not supported"
                    })
                )
            )
        }
    });

export const onPlay = ({
    audioRef,
    audioContext,
}: {
    audioRef: HTMLAudioElement;
    audioContext: AudioContext | null;
}) => { };

export const onPause = ({
    audioRef,
}: {
    audioRef: HTMLAudioElement | null;
}) =>
    Effect.gen(function* (_) {
        if (audioRef === null) {
            return yield* _(Effect.die("Missing audo ref" as const))
        }

        yield* _(Console.log(`Pausing audio at ${audioRef.currentTime}`))
        return yield* _(Effect.sync(() => audioRef.pause()));
    })
    ;

export const onRestart = ({
    audioRef,
}: {
    audioRef: HTMLAudioElement;
}) => { };

export const onTimeUpdate = ({
    audioRef,
}: {
    audioRef: HTMLAudioElement;
}) => { };

export const onError = ({
    message,
}: {
    message: unknown;
}) => { };