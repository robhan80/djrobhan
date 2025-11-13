
import React, { useState, useRef, useEffect } from 'react';
import { useContent } from '../hooks/useContent';
import { Track } from '../types';

const PlayIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>;
const PauseIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>;
const PrevIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>;
const NextIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>;

function getYoutubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function getSpotifyTrackId(url: string): string | null {
  const match = url.match(/open\.spotify\.com\/track\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

const getEmbedUrl = (track: Track): string | null => {
    if (track.sourceType === 'youtube') {
        const videoId = getYoutubeVideoId(track.src);
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    if (track.sourceType === 'spotify') {
        const trackId = getSpotifyTrackId(track.src);
        return trackId ? `https://open.spotify.com/embed/track/${trackId}?utm_source=generator` : null;
    }
    return null;
}


export const MusicPlayer: React.FC = () => {
    const { content } = useContent();
    const { playlist } = content;
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const currentTrack = playlist[currentTrackIndex];

    useEffect(() => {
        if (!playlist || playlist.length === 0) {
            setIsPlaying(false);
            setCurrentTrackIndex(0);
            return;
        }
        if (currentTrackIndex >= playlist.length) {
            setCurrentTrackIndex(0);
        }
    }, [playlist, currentTrackIndex]);

    useEffect(() => {
        if (audioRef.current && currentTrack && currentTrack.sourceType === 'mp3') {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex, currentTrack]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setProgress(audioRef.current.currentTime);
        }
    };
    
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleTrackEnd = () => {
        handleNext();
    };
    
    const handlePlayPause = () => {
        if (!currentTrack || currentTrack.sourceType !== 'mp3') return;
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        if (!playlist || playlist.length === 0) return;
        setIsPlaying(false);
        setProgress(0);
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    };

    const handlePrev = () => {
        if (!playlist || playlist.length === 0) return;
        setIsPlaying(false);
        setProgress(0);
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressBarRef.current && audioRef.current && currentTrack && currentTrack.sourceType === 'mp3') {
            const rect = progressBarRef.current.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            audioRef.current.currentTime = audioRef.current.duration * percentage;
        }
    };
    
    const formatTime = (time: number) => {
        if (isNaN(time) || time === 0) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    if (!currentTrack) {
        return (
            <div className="w-full max-w-md mx-auto bg-dark-2/80 backdrop-blur-md rounded-xl shadow-2xl p-4 border border-dark-3 text-center">
                <p className="text-gray-400">Ingen spor tilgjengelig i spillelisten.</p>
            </div>
        );
    }
    
    const renderPlayerContent = () => {
      if (currentTrack.sourceType === 'youtube' || currentTrack.sourceType === 'spotify') {
        const embedUrl = getEmbedUrl(currentTrack);
        return embedUrl ? (
          <div className="aspect-video">
            <iframe
              key={currentTrack.id}
              className="w-full h-full"
              src={embedUrl}
              title={currentTrack.title}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : <p className="text-red-500 text-center">Kunne ikke laste media. Sjekk URL.</p>;
      }

      // MP3 Player
      return (
        <>
          <div className="mt-4">
              <div 
                  ref={progressBarRef}
                  className="w-full bg-dark-3 rounded-full h-2 cursor-pointer"
                  onClick={handleProgressClick}
              >
                  <div className="bg-[var(--color-primary)] h-2 rounded-full" style={{ width: `${(progress / duration) * 100}%` }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
              </div>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4 text-white">
              <button onClick={handlePrev} className="p-2 rounded-full hover:bg-dark-3 transition-colors duration-300" aria-label="Forrige spor"><PrevIcon /></button>
              <button onClick={handlePlayPause} className="p-4 bg-[var(--color-primary)] rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300" aria-label={isPlaying ? 'Pause' : 'Spill'}>
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button onClick={handleNext} className="p-2 rounded-full hover:bg-dark-3 transition-colors duration-300" aria-label="Neste spor"><NextIcon /></button>
          </div>
        </>
      );
    }

    return (
        <div className="w-full max-w-md mx-auto bg-dark-2/80 backdrop-blur-md rounded-xl shadow-2xl p-4 border border-dark-3">
            <audio
                ref={audioRef}
                src={currentTrack.sourceType === 'mp3' ? currentTrack.src : ''}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleTrackEnd}
                key={currentTrack.id}
                preload="metadata"
            />
            <div className="flex items-center space-x-4">
                <img src={`https://picsum.photos/seed/${currentTrack.title}/100/100`} alt="Album Art" className="w-20 h-20 rounded-lg"/>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white truncate">{currentTrack.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{currentTrack.artist}</p>
                </div>
            </div>
            {renderPlayerContent()}
            {(currentTrack.sourceType === 'youtube' || currentTrack.sourceType === 'spotify') && (
                <div className="flex items-center justify-center space-x-6 mt-4 text-white">
                    <button onClick={handlePrev} className="p-2 rounded-full hover:bg-dark-3 transition-colors duration-300" aria-label="Forrige spor"><PrevIcon /></button>
                    <div className="p-4 bg-gray-600 rounded-full shadow-lg cursor-not-allowed" aria-label="Avspillingskontroller er i vinduet ovenfor">
                         <PlayIcon />
                    </div>
                    <button onClick={handleNext} className="p-2 rounded-full hover:bg-dark-3 transition-colors duration-300" aria-label="Neste spor"><NextIcon /></button>
                </div>
            )}
        </div>
    );
};
