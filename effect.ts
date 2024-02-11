import * as Effect from 'effect';

export const onLoad = ({
    audioRef,
    audioContext,
    trackSource
}: {
    audioRef: HTMLAudioElement;
    audioContext: AudioContext | null;
    trackSource: MediaElementAudioSourceNode | null;
}) => {};

export const onPlay = ({
    audioRef,
    audioContext,
}: {
    audioRef: HTMLAudioElement;
    audioContext: AudioContext | null;
}) => {};

export const onPause = ({
    audioRef,
}: {
    audioRef: HTMLAudioElement;
}) => {};

export const onRestart = ({
    audioRef,
}: {
    audioRef: HTMLAudioElement;
}) => {};

export const onTimeUpdate = ({
    audioRef,
}: {
    audioRef: HTMLAudioElement;
}) => {};

export const onError = ({
    message,
}: {
    message: unknown;
}) => {};