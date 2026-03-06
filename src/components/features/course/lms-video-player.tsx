'use client';

import React, {
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from 'react';

type SubtitleTrack = {
   src: string;
   srcLang: string;
   label: string;
   default?: boolean;
};

type PlaybackRateOption = 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;

type LmsVideoPlayerProps = {
   src: string;
   poster?: string;
   title?: string;
   className?: string;
   subtitles?: SubtitleTrack[];
   lessonId?: string;
   autoPlay?: boolean;
   initialPlaybackRate?: PlaybackRateOption;
   showTopBar?: boolean;
   messagesCount?: number;
   onBack?: () => void;
   onEnded?: () => void;
   onProgressSave?: (currentTime: number, duration: number) => void;
};

const DOUBLE_TAP_WINDOW = 280;
const SEEK_AMOUNT = 10;
const HIDE_CONTROLS_DELAY = 2200;

function formatTime(time: number): string {
   if (!Number.isFinite(time) || time < 0) return '00:00';

   const totalSeconds = Math.floor(time);
   const hours = Math.floor(totalSeconds / 3600);
   const minutes = Math.floor((totalSeconds % 3600) / 60);
   const seconds = totalSeconds % 60;

   if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
         2,
         '0',
      )}:${String(seconds).padStart(2, '0')}`;
   }

   return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
   )}`;
}

function clamp(value: number, min: number, max: number): number {
   return Math.min(max, Math.max(min, value));
}

export default function LmsVideoPlayer({
   src,
   poster,
   title = 'Lesson Video',
   className,
   subtitles = [],
   lessonId,
   autoPlay = false,
   initialPlaybackRate = 1,
   showTopBar = true,
   messagesCount = 0,
   onBack,
   onEnded,
   onProgressSave,
}: LmsVideoPlayerProps) {
   const containerRef = useRef<HTMLDivElement | null>(null);
   const videoRef = useRef<HTMLVideoElement | null>(null);
   const hideControlsTimerRef = useRef<number | null>(null);
   const saveProgressTimerRef = useRef<number | null>(null);

   const lastTapLeftRef = useRef<number>(0);
   const lastTapRightRef = useRef<number>(0);

   const storageKey = useMemo(
      () => `lms-video-progress:${lessonId ?? src}`,
      [lessonId, src],
   );

   const [isPlaying, setIsPlaying] = useState<boolean>(false);
   const [isMuted, setIsMuted] = useState<boolean>(false);
   const [volume, setVolume] = useState<number>(1);
   const [duration, setDuration] = useState<number>(0);
   const [currentTime, setCurrentTime] = useState<number>(0);
   const [bufferedPercent, setBufferedPercent] = useState<number>(0);
   const [showControls, setShowControls] = useState<boolean>(true);
   const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
   const [isSeeking, setIsSeeking] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [showSettings, setShowSettings] = useState<boolean>(false);
   const [playbackRate, setPlaybackRate] =
      useState<PlaybackRateOption>(initialPlaybackRate);
   const [resumePrompt, setResumePrompt] = useState<{
      visible: boolean;
      time: number;
   }>({ visible: false, time: 0 });
   const [seekFeedback, setSeekFeedback] = useState<{
      visible: boolean;
      direction: 'left' | 'right';
      seconds: number;
   } | null>(null);

   const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

   const clearHideTimer = () => {
      if (hideControlsTimerRef.current) {
         window.clearTimeout(hideControlsTimerRef.current);
         hideControlsTimerRef.current = null;
      }
   };

   const scheduleHideControls = useCallback(() => {
      clearHideTimer();

      if (!isPlaying || isSeeking) return;

      hideControlsTimerRef.current = window.setTimeout(() => {
         setShowControls(false);
         setShowSettings(false);
      }, HIDE_CONTROLS_DELAY);
   }, [isPlaying, isSeeking]);

   const pingControls = useCallback(() => {
      setShowControls(true);
      scheduleHideControls();
   }, [scheduleHideControls]);

   const saveProgress = useCallback(
      (time: number, total: number) => {
         if (!lessonId && !src) return;
         if (!Number.isFinite(time) || !Number.isFinite(total) || total <= 0)
            return;

         const payload = JSON.stringify({
            currentTime: Math.floor(time),
            duration: Math.floor(total),
            updatedAt: Date.now(),
         });

         localStorage.setItem(storageKey, payload);
         onProgressSave?.(time, total);
      },
      [lessonId, src, storageKey, onProgressSave],
   );

   const restoreProgress = useCallback(() => {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;

      try {
         const parsed = JSON.parse(raw) as {
            currentTime?: number;
            duration?: number;
         };
         const savedTime = parsed.currentTime ?? 0;

         if (savedTime > 15) {
            setResumePrompt({
               visible: true,
               time: savedTime,
            });
         }
      } catch {
         // ignore broken localStorage entries
      }
   }, [storageKey]);

   const applyPlaybackRate = useCallback((rate: PlaybackRateOption) => {
      const video = videoRef.current;
      if (!video) return;
      video.playbackRate = rate;
      setPlaybackRate(rate);
   }, []);

   const togglePlay = useCallback(async () => {
      const video = videoRef.current;
      if (!video) return;

      try {
         if (video.paused) {
            await video.play();
         } else {
            video.pause();
         }
      } catch {
         // autoplay or browser restrictions can land here
      }
   }, []);

   const seekTo = useCallback((time: number) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(video.duration)) return;
      video.currentTime = clamp(time, 0, video.duration);
   }, []);

   const seekBy = useCallback(
      (seconds: number, direction: 'left' | 'right') => {
         const video = videoRef.current;
         if (!video) return;

         const next = clamp(
            video.currentTime + seconds,
            0,
            video.duration || Infinity,
         );
         video.currentTime = next;

         setSeekFeedback({
            visible: true,
            direction,
            seconds: Math.abs(seconds),
         });

         window.setTimeout(() => {
            setSeekFeedback((prev) =>
               prev ? { ...prev, visible: false } : null,
            );
         }, 700);
      },
      [],
   );

   const toggleMute = useCallback(() => {
      const video = videoRef.current;
      if (!video) return;

      video.muted = !video.muted;
      setIsMuted(video.muted);
   }, []);

   const handleVolumeChange = useCallback((nextVolume: number) => {
      const video = videoRef.current;
      if (!video) return;

      const safeVolume = clamp(nextVolume, 0, 1);
      video.volume = safeVolume;
      video.muted = safeVolume === 0;

      setVolume(safeVolume);
      setIsMuted(video.muted);
   }, []);

   const toggleFullscreen = useCallback(async () => {
      const container = containerRef.current;
      if (!container) return;

      try {
         if (!document.fullscreenElement) {
            await container.requestFullscreen();
         } else {
            await document.exitFullscreen();
         }
      } catch {
         // some mobile browsers may behave differently
      }
   }, []);

   const togglePiP = useCallback(async () => {
      const video = videoRef.current;
      if (!video) return;

      try {
         const anyVideo = video as HTMLVideoElement & {
            requestPictureInPicture?: () => Promise<PictureInPictureWindow>;
         };

         if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
         } else if (anyVideo.requestPictureInPicture) {
            await anyVideo.requestPictureInPicture();
         }
      } catch {
         // silently ignore unsupported browsers
      }
   }, []);

   const handleProgressInput = (value: number) => {
      const video = videoRef.current;
      if (!video || !duration) return;

      const nextTime = (value / 100) * duration;
      video.currentTime = nextTime;
      setCurrentTime(nextTime);
   };

   const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
         const tag = (
            event.target as HTMLElement | null
         )?.tagName?.toLowerCase();
         const isTyping =
            tag === 'input' ||
            tag === 'textarea' ||
            (event.target as HTMLElement)?.isContentEditable;

         if (isTyping) return;

         switch (event.key.toLowerCase()) {
            case ' ':
            case 'k':
               event.preventDefault();
               togglePlay();
               break;
            case 'arrowleft':
               event.preventDefault();
               seekBy(-SEEK_AMOUNT, 'left');
               break;
            case 'arrowright':
               event.preventDefault();
               seekBy(SEEK_AMOUNT, 'right');
               break;
            case 'm':
               event.preventDefault();
               toggleMute();
               break;
            case 'f':
               event.preventDefault();
               toggleFullscreen();
               break;
            default:
               break;
         }

         pingControls();
      },
      [pingControls, seekBy, toggleFullscreen, toggleMute, togglePlay],
   );

   useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const onLoadedMetadata = () => {
         setDuration(video.duration || 0);
         setIsLoading(false);
         applyPlaybackRate(initialPlaybackRate);
         restoreProgress();
      };

      const onTimeUpdate = () => {
         setCurrentTime(video.currentTime);

         if (saveProgressTimerRef.current) {
            window.clearTimeout(saveProgressTimerRef.current);
         }

         saveProgressTimerRef.current = window.setTimeout(() => {
            saveProgress(video.currentTime, video.duration || 0);
         }, 500);
      };

      const onDurationChange = () => setDuration(video.duration || 0);

      const onProgress = () => {
         try {
            if (!video.duration || video.buffered.length === 0) {
               setBufferedPercent(0);
               return;
            }

            const bufferedEnd = video.buffered.end(video.buffered.length - 1);
            setBufferedPercent((bufferedEnd / video.duration) * 100);
         } catch {
            setBufferedPercent(0);
         }
      };

      const onPlay = () => {
         setIsPlaying(true);
         setIsLoading(false);
         scheduleHideControls();
      };

      const onPause = () => {
         setIsPlaying(false);
         setShowControls(true);
         clearHideTimer();
      };

      const onWaiting = () => setIsLoading(true);
      const onCanPlay = () => setIsLoading(false);

      const onEndedInternal = () => {
         setIsPlaying(false);
         setShowControls(true);
         saveProgress(0, video.duration || 0);
         localStorage.removeItem(storageKey);
         onEnded?.();
      };

      video.addEventListener('loadedmetadata', onLoadedMetadata);
      video.addEventListener('timeupdate', onTimeUpdate);
      video.addEventListener('durationchange', onDurationChange);
      video.addEventListener('progress', onProgress);
      video.addEventListener('play', onPlay);
      video.addEventListener('pause', onPause);
      video.addEventListener('waiting', onWaiting);
      video.addEventListener('canplay', onCanPlay);
      video.addEventListener('ended', onEndedInternal);

      document.addEventListener('keydown', handleKeyDown);

      return () => {
         video.removeEventListener('loadedmetadata', onLoadedMetadata);
         video.removeEventListener('timeupdate', onTimeUpdate);
         video.removeEventListener('durationchange', onDurationChange);
         video.removeEventListener('progress', onProgress);
         video.removeEventListener('play', onPlay);
         video.removeEventListener('pause', onPause);
         video.removeEventListener('waiting', onWaiting);
         video.removeEventListener('canplay', onCanPlay);
         video.removeEventListener('ended', onEndedInternal);
         document.removeEventListener('keydown', handleKeyDown);
         clearHideTimer();

         if (saveProgressTimerRef.current) {
            window.clearTimeout(saveProgressTimerRef.current);
         }
      };
   }, [
      applyPlaybackRate,
      handleKeyDown,
      initialPlaybackRate,
      onEnded,
      restoreProgress,
      saveProgress,
      scheduleHideControls,
      storageKey,
   ]);

   useEffect(() => {
      const onFullscreenChange = () => {
         setIsFullscreen(Boolean(document.fullscreenElement));
         pingControls();
      };

      document.addEventListener('fullscreenchange', onFullscreenChange);
      return () => {
         document.removeEventListener('fullscreenchange', onFullscreenChange);
      };
   }, [pingControls]);

   useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      video.volume = volume;
      video.muted = isMuted;
   }, [isMuted, volume]);

   useEffect(() => {
      if (autoPlay) {
         void togglePlay();
      }
   }, [autoPlay, togglePlay]);

   const handleOverlayTap = () => {
      togglePlay();
      pingControls();
   };

   const handleDoubleTapZone = (direction: 'left' | 'right') => {
      const now = Date.now();

      if (direction === 'left') {
         if (now - lastTapLeftRef.current < DOUBLE_TAP_WINDOW) {
            seekBy(-SEEK_AMOUNT, 'left');
         }
         lastTapLeftRef.current = now;
         return;
      }

      if (now - lastTapRightRef.current < DOUBLE_TAP_WINDOW) {
         seekBy(SEEK_AMOUNT, 'right');
      }
      lastTapRightRef.current = now;
   };

   return (
      <div
         ref={containerRef}
         className={className}
         style={{
            position: 'relative',
            width: '100%',
            aspectRatio: isFullscreen ? undefined : '586 / 250',
            minHeight: isFullscreen ? '100vh' : undefined,
            background: '#000',
            borderRadius: isFullscreen ? 0 : 8,
            overflow: 'hidden',
            userSelect: 'none',
            touchAction: 'manipulation',
         }}
         onMouseMove={pingControls}
         onTouchStart={pingControls}
      >
         <video
            ref={videoRef}
            src={src}
            poster={poster}
            playsInline
            preload="metadata"
            style={{
               width: '100%',
               height: '100%',
               objectFit: 'cover',
               display: 'block',
               background: '#000',
            }}
         >
            {subtitles.map((track) => (
               <track
                  key={`${track.src}-${track.srcLang}`}
                  kind="subtitles"
                  src={track.src}
                  srcLang={track.srcLang}
                  label={track.label}
                  default={track.default}
               />
            ))}
         </video>

         <div
            style={{
               position: 'absolute',
               inset: 0,
               background:
                  'linear-gradient(180deg, rgba(0,0,0,0) 0.89%, rgba(0,0,0,0.49) 52%, rgba(0,0,0,0.69) 100%)',
               pointerEvents: 'none',
            }}
         />

         <button
            type="button"
            aria-label="Toggle play"
            onClick={handleOverlayTap}
            style={{
               position: 'absolute',
               inset: 0,
               background: 'transparent',
               border: 'none',
               cursor: 'pointer',
            }}
         />

         <button
            type="button"
            aria-label="Seek backward 10 seconds"
            onTouchStart={() => handleDoubleTapZone('left')}
            onDoubleClick={() => seekBy(-SEEK_AMOUNT, 'left')}
            style={{
               position: 'absolute',
               left: 0,
               top: 0,
               bottom: 0,
               width: '32%',
               background: 'transparent',
               border: 'none',
               zIndex: 2,
            }}
         />

         <button
            type="button"
            aria-label="Seek forward 10 seconds"
            onTouchStart={() => handleDoubleTapZone('right')}
            onDoubleClick={() => seekBy(SEEK_AMOUNT, 'right')}
            style={{
               position: 'absolute',
               right: 0,
               top: 0,
               bottom: 0,
               width: '32%',
               background: 'transparent',
               border: 'none',
               zIndex: 2,
            }}
         />

         {showTopBar && showControls && (
            <div
               style={{
                  position: 'absolute',
                  top: isFullscreen ? 20 : 16,
                  left: isFullscreen ? 20 : 16,
                  right: isFullscreen ? 20 : 16,
                  zIndex: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#fff',
               }}
            >
               <div
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: 12,
                     minWidth: 0,
                  }}
               >
                  {onBack && (
                     <button
                        type="button"
                        onClick={onBack}
                        aria-label="Go back"
                        style={iconButtonStyle}
                     >
                        <ArrowLeftIcon />
                     </button>
                  )}

                  <div
                     style={{
                        fontSize: isFullscreen ? 24 : 14,
                        fontWeight: 500,
                        lineHeight: 1.1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '70vw',
                     }}
                  >
                     {title}
                  </div>
               </div>

               <div style={{ position: 'relative' }}>
                  <button
                     type="button"
                     aria-label="Messages"
                     style={iconButtonStyle}
                  >
                     <MessageIcon />
                  </button>

                  {messagesCount > 0 && (
                     <span
                        style={{
                           position: 'absolute',
                           top: -4,
                           right: -4,
                           minWidth: 16,
                           height: 16,
                           padding: '0 4px',
                           borderRadius: 999,
                           background: '#ED1C24',
                           color: '#fff',
                           fontSize: 10,
                           fontWeight: 700,
                           display: 'inline-flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                        }}
                     >
                        {messagesCount}
                     </span>
                  )}
               </div>
            </div>
         )}

         {!isPlaying && (
            <button
               type="button"
               onClick={togglePlay}
               aria-label="Play video"
               style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: isFullscreen ? 96 : 56,
                  height: isFullscreen ? 96 : 56,
                  borderRadius: '50%',
                  background: 'rgba(44, 44, 44, 0.48)',
                  border: 'none',
                  display: 'grid',
                  placeItems: 'center',
                  zIndex: 4,
                  cursor: 'pointer',
                  backdropFilter: 'blur(2px)',
               }}
            >
               <PlayIcon size={isFullscreen ? 38 : 22} />
            </button>
         )}

         {isLoading && (
            <div
               style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'grid',
                  placeItems: 'center',
                  zIndex: 4,
                  pointerEvents: 'none',
               }}
            >
               <div
                  style={{
                     width: 34,
                     height: 34,
                     borderRadius: '50%',
                     border: '3px solid rgba(255,255,255,0.35)',
                     borderTopColor: '#fff',
                     animation: 'lms-spin 1s linear infinite',
                  }}
               />
            </div>
         )}

         {resumePrompt.visible && (
            <div
               style={{
                  position: 'absolute',
                  left: 16,
                  right: 16,
                  bottom: 78,
                  zIndex: 6,
                  background: 'rgba(10, 10, 10, 0.82)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 12,
                  padding: 12,
                  color: '#fff',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
               }}
            >
               <div style={{ fontSize: 14 }}>
                  Resume from <strong>{formatTime(resumePrompt.time)}</strong>?
               </div>

               <div style={{ display: 'flex', gap: 8 }}>
                  <button
                     type="button"
                     onClick={() => {
                        setResumePrompt({ visible: false, time: 0 });
                        seekTo(0);
                     }}
                     style={smallButtonStyle}
                  >
                     Start over
                  </button>
                  <button
                     type="button"
                     onClick={() => {
                        seekTo(resumePrompt.time);
                        setResumePrompt({ visible: false, time: 0 });
                     }}
                     style={{
                        ...smallButtonStyle,
                        background: '#ED1C24',
                        borderColor: '#ED1C24',
                     }}
                  >
                     Resume
                  </button>
               </div>
            </div>
         )}

         {seekFeedback?.visible && (
            <div
               style={{
                  position: 'absolute',
                  top: '50%',
                  left: seekFeedback.direction === 'left' ? '24%' : '76%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 6,
                  background: 'rgba(0,0,0,0.45)',
                  color: '#fff',
                  padding: '10px 12px',
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 600,
                  backdropFilter: 'blur(4px)',
               }}
            >
               {seekFeedback.direction === 'left' ? '⏪' : '⏩'}{' '}
               {seekFeedback.seconds}s
            </div>
         )}

         <div
            style={{
               position: 'absolute',
               left: isFullscreen ? 22 : 16,
               right: isFullscreen ? 22 : 16,
               bottom: isFullscreen ? 18 : 14,
               zIndex: 5,
               opacity: showControls ? 1 : 0,
               transform: `translateY(${showControls ? 0 : 10}px)`,
               transition: 'opacity 180ms ease, transform 180ms ease',
               pointerEvents: showControls ? 'auto' : 'none',
            }}
         >
            <div style={{ marginBottom: 10 }}>
               <div
                  style={{
                     position: 'relative',
                     height: isFullscreen ? 10 : 5,
                  }}
               >
                  <div style={trackBaseStyle(isFullscreen ? 10 : 5)} />
                  <div
                     style={{
                        ...trackBufferedStyle(isFullscreen ? 10 : 5),
                        width: `${bufferedPercent}%`,
                     }}
                  />
                  <div
                     style={{
                        ...trackPlayedStyle(isFullscreen ? 10 : 5),
                        width: `${progressPercent}%`,
                     }}
                  />
                  <input
                     type="range"
                     min={0}
                     max={100}
                     step={0.1}
                     value={progressPercent || 0}
                     onMouseDown={() => setIsSeeking(true)}
                     onMouseUp={() => {
                        setIsSeeking(false);
                        scheduleHideControls();
                     }}
                     onTouchStart={() => setIsSeeking(true)}
                     onTouchEnd={() => {
                        setIsSeeking(false);
                        scheduleHideControls();
                     }}
                     onChange={(e) =>
                        handleProgressInput(Number(e.target.value))
                     }
                     aria-label="Seek video"
                     style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        margin: 0,
                        appearance: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                     }}
                  />
               </div>
            </div>

            <div
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  flexWrap: 'wrap',
               }}
            >
               <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                     type="button"
                     onClick={togglePlay}
                     aria-label={isPlaying ? 'Pause video' : 'Play video'}
                     style={iconButtonStyle}
                  >
                     {isPlaying ? <PauseIcon /> : <PlayIcon size={16} />}
                  </button>

                  <div
                     style={{
                        color: '#fff',
                        fontSize: isFullscreen ? 18 : 14,
                        lineHeight: 1,
                        fontWeight: 400,
                        minWidth: 95,
                     }}
                  >
                     {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
               </div>

               <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button
                     type="button"
                     onClick={toggleMute}
                     aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                     style={iconButtonStyle}
                  >
                     {isMuted || volume === 0 ? <MuteIcon /> : <VolumeIcon />}
                  </button>

                  <input
                     type="range"
                     min={0}
                     max={1}
                     step={0.01}
                     value={isMuted ? 0 : volume}
                     onChange={(e) =>
                        handleVolumeChange(Number(e.target.value))
                     }
                     aria-label="Volume"
                     style={{
                        width: 72,
                        accentColor: '#ED1C24',
                        cursor: 'pointer',
                     }}
                  />

                  <div style={{ position: 'relative' }}>
                     <button
                        type="button"
                        onClick={() => setShowSettings((prev) => !prev)}
                        aria-label="Open settings"
                        style={iconButtonStyle}
                     >
                        <SettingsIcon />
                     </button>

                     {showSettings && (
                        <div
                           style={{
                              position: 'absolute',
                              right: 0,
                              bottom: 'calc(100% + 8px)',
                              minWidth: 140,
                              borderRadius: 12,
                              background: 'rgba(17,17,17,0.95)',
                              border: '1px solid rgba(255,255,255,0.12)',
                              padding: 8,
                              color: '#fff',
                              boxShadow: '0 10px 30px rgba(0,0,0,0.28)',
                           }}
                        >
                           <div
                              style={{
                                 fontSize: 12,
                                 opacity: 0.72,
                                 marginBottom: 6,
                                 padding: '4px 8px',
                              }}
                           >
                              Playback speed
                           </div>

                           {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                              <button
                                 key={rate}
                                 type="button"
                                 onClick={() => {
                                    applyPlaybackRate(
                                       rate as PlaybackRateOption,
                                    );
                                    setShowSettings(false);
                                 }}
                                 style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    border: 'none',
                                    background:
                                       rate === playbackRate
                                          ? '#ED1C24'
                                          : 'transparent',
                                    color: '#fff',
                                    borderRadius: 8,
                                    padding: '8px 10px',
                                    cursor: 'pointer',
                                 }}
                              >
                                 {rate}x
                              </button>
                           ))}
                        </div>
                     )}
                  </div>

                  <button
                     type="button"
                     onClick={togglePiP}
                     aria-label="Picture in picture"
                     style={iconButtonStyle}
                  >
                     <PipIcon />
                  </button>

                  <button
                     type="button"
                     onClick={toggleFullscreen}
                     aria-label={
                        isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'
                     }
                     style={iconButtonStyle}
                  >
                     {isFullscreen ? <MinimizeIcon /> : <ExpandIcon />}
                  </button>
               </div>
            </div>
         </div>

         <style>
            {`
          @keyframes lms-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 10px;
            height: 20px;
            border-radius: 999px;
            background: #ED1C24;
            border: none;
          }

          input[type="range"]::-moz-range-thumb {
            width: 10px;
            height: 20px;
            border-radius: 999px;
            background: #ED1C24;
            border: none;
          }

          input[type="range"]::-webkit-slider-runnable-track {
            background: transparent;
          }

          input[type="range"]::-moz-range-track {
            background: transparent;
          }

          @media (max-width: 768px) {
            input[type="range"]::-webkit-slider-thumb {
              width: 8px;
              height: 16px;
            }

            input[type="range"]::-moz-range-thumb {
              width: 8px;
              height: 16px;
            }
          }
        `}
         </style>
      </div>
   );
}

const iconButtonStyle: React.CSSProperties = {
   width: 32,
   height: 32,
   border: 'none',
   background: 'transparent',
   color: '#fff',
   display: 'grid',
   placeItems: 'center',
   cursor: 'pointer',
   padding: 0,
};

const smallButtonStyle: React.CSSProperties = {
   border: '1px solid rgba(255,255,255,0.16)',
   background: 'rgba(255,255,255,0.06)',
   color: '#fff',
   borderRadius: 10,
   padding: '8px 12px',
   cursor: 'pointer',
   fontSize: 13,
};

function trackBaseStyle(height: number): React.CSSProperties {
   return {
      position: 'absolute',
      inset: 0,
      borderRadius: 999,
      background: '#EDEDED',
      opacity: 0.95,
      height,
   };
}

function trackBufferedStyle(height: number): React.CSSProperties {
   return {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      borderRadius: 999,
      background: '#DCDCDC',
      height,
   };
}

function trackPlayedStyle(height: number): React.CSSProperties {
   return {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      borderRadius: 999,
      background: '#ED1C24',
      height,
   };
}

function ArrowLeftIcon() {
   return (
      <svg
         width="22"
         height="22"
         viewBox="0 0 24 24"
         fill="none"
         aria-hidden="true"
      >
         <path
            d="M15 6L9 12L15 18"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </svg>
   );
}

function PlayIcon({ size = 18 }: { size?: number }) {
   return (
      <svg
         width={size}
         height={size}
         viewBox="0 0 24 24"
         fill="none"
         aria-hidden="true"
      >
         <path
            d="M8 5.5L19 12L8 18.5V5.5Z"
            fill="currentColor"
            stroke="currentColor"
            strokeLinejoin="round"
         />
      </svg>
   );
}

function PauseIcon() {
   return (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         aria-hidden="true"
      >
         <rect x="6" y="5" width="4" height="14" rx="1.5" fill="currentColor" />
         <rect
            x="14"
            y="5"
            width="4"
            height="14"
            rx="1.5"
            fill="currentColor"
         />
      </svg>
   );
}

function VolumeIcon() {
   return (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         aria-hidden="true"
      >
         <path d="M4 10H8L13 6V18L8 14H4V10Z" fill="currentColor" />
         <path
            d="M16 9C17.333 10 17.333 14 16 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
         />
         <path
            d="M18.7 6.7C21.2 8.8 21.2 15.2 18.7 17.3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
         />
      </svg>
   );
}

function MuteIcon() {
   return (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         aria-hidden="true"
      >
         <path d="M4 10H8L13 6V18L8 14H4V10Z" fill="currentColor" />
         <path
            d="M17 9L21 13M21 9L17 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
         />
      </svg>
   );
}

function SettingsIcon() {
   return (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         aria-hidden="true"
      >
         <path
            d="M12 8.8A3.2 3.2 0 1 0 12 15.2A3.2 3.2 0 1 0 12 8.8Z"
            stroke="currentColor"
            strokeWidth="2"
         />
         <path
            d="M19.4 15A1 1 0 0 0 19.6 16.1L19.7 16.2A2 2 0 1 1 16.8 19.1L16.7 19A1 1 0 0 0 15.6 18.8A1 1 0 0 0 15 19.7V20A2 2 0 1 1 11 20V19.8A1 1 0 0 0 10.4 18.9A1 1 0 0 0 9.3 19L9.2 19.1A2 2 0 1 1 6.3 16.2L6.4 16.1A1 1 0 0 0 6.6 15A1 1 0 0 0 5.7 14.4H5.5A2 2 0 1 1 5.5 10.4H5.7A1 1 0 0 0 6.6 9.8A1 1 0 0 0 6.4 8.7L6.3 8.6A2 2 0 1 1 9.2 5.7L9.3 5.8A1 1 0 0 0 10.4 6A1 1 0 0 0 11 5.1V5A2 2 0 1 1 15 5V5.2A1 1 0 0 0 15.6 6.1A1 1 0 0 0 16.7 5.9L16.8 5.8A2 2 0 1 1 19.7 8.7L19.6 8.8A1 1 0 0 0 19.4 9.9A1 1 0 0 0 20.3 10.5H20.5A2 2 0 1 1 20.5 14.5H20.3A1 1 0 0 0 19.4 15Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </svg>
   );
}

function ExpandIcon() {
   return (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         aria-hidden="true"
      >
         <path
            d="M8 3H3V8M16 3H21V8M8 21H3V16M21 16V21H16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </svg>
   );
}

function MinimizeIcon() {
   return (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         aria-hidden="true"
      >
         <path
            d="M9 3H3V9M15 3H21V9M3 15V21H9M21 15V21H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </svg>
   );
}

function MessageIcon() {
   return (
      <svg
         width="22"
         height="22"
         viewBox="0 0 24 24"
         fill="none"
         aria-hidden="true"
      >
         <path
            d="M5 6.5C5 5.119 6.119 4 7.5 4H16.5C17.881 4 19 5.119 19 6.5V12.5C19 13.881 17.881 15 16.5 15H11L7 19V15H7.5C6.119 15 5 13.881 5 12.5V6.5Z"
            fill="currentColor"
         />
      </svg>
   );
}

function PipIcon() {
   return (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         aria-hidden="true"
      >
         <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
         />
         <rect x="12" y="11" width="6" height="4" rx="1" fill="currentColor" />
      </svg>
   );
}
