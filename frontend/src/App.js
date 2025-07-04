import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { Components } from './components';

const { 
  Navbar, 
  Hero, 
  RecentlyPlayed, 
  MadeForYou, 
  TrendingNow, 
  PlaylistGrid, 
  MusicPlayer 
} = Components;

// Mock data for the music streaming interface
const mockData = {
  recentlyPlayed: [
    {
      id: 1,
      title: "Midnight City",
      artist: "M83",
      album: "Hurry Up, We're Dreaming",
      cover: "https://images.pexels.com/photos/2531130/pexels-photo-2531130.jpeg",
      duration: "4:03",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      id: 2,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      cover: "https://images.pexels.com/photos/9786210/pexels-photo-9786210.jpeg",
      duration: "3:20",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      id: 3,
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      album: "Fine Line",
      cover: "https://images.pexels.com/photos/6827290/pexels-photo-6827290.jpeg",
      duration: "2:54",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      id: 4,
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      cover: "https://images.unsplash.com/photo-1629923759854-156b88c433aa",
      duration: "3:23",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      id: 5,
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg",
      duration: "2:58",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      id: 6,
      title: "Stay",
      artist: "The Kid LAROI & Justin Bieber",
      album: "F*CK LOVE 3",
      cover: "https://images.pexels.com/photos/908965/pexels-photo-908965.jpeg",
      duration: "2:21",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    }
  ],
  madeForYou: [
    {
      id: 7,
      title: "Discover Weekly",
      description: "Your weekly mixtape of fresh music",
      cover: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg",
      type: "playlist"
    },
    {
      id: 8,
      title: "Daily Mix 1",
      description: "Harry Styles, Dua Lipa, The Weeknd and more",
      cover: "https://images.unsplash.com/photo-1582730147924-d92f4da00252",
      type: "playlist"
    },
    {
      id: 9,
      title: "Release Radar",
      description: "Catch all the latest music from artists you follow",
      cover: "https://images.pexels.com/photos/1181770/pexels-photo-1181770.jpeg",
      type: "playlist"
    },
    {
      id: 10,
      title: "On Repeat",
      description: "Songs you can't stop playing",
      cover: "https://images.pexels.com/photos/1759350/pexels-photo-1759350.jpeg",
      type: "playlist"
    }
  ],
  trending: [
    {
      id: 11,
      title: "As It Was",
      artist: "Harry Styles",
      album: "Harry's House",
      cover: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c",
      duration: "2:47",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      id: 12,
      title: "Heat Waves",
      artist: "Glass Animals",
      album: "Dreamland",
      cover: "https://images.unsplash.com/photo-1536849249744-44e01e7a089d",
      duration: "3:58",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    }
  ]
};

function App() {
  const [currentTrack, setCurrentTrack] = useState(mockData.recentlyPlayed[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [currentTrack]);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (newTime) => {
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="App min-h-screen bg-black text-white">
      <Navbar />
      <main className="pb-24">
        <Hero />
        <div className="px-6 space-y-8">
          <RecentlyPlayed tracks={mockData.recentlyPlayed} onPlayTrack={playTrack} />
          <MadeForYou playlists={mockData.madeForYou} />
          <TrendingNow tracks={mockData.trending} onPlayTrack={playTrack} />
          <PlaylistGrid />
        </div>
      </main>
      
      <MusicPlayer 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        onTogglePlay={togglePlay}
        onTimeChange={handleTimeChange}
        onVolumeChange={handleVolumeChange}
      />
      
      <audio ref={audioRef} src={currentTrack?.audioUrl} preload="metadata" />
    </div>
  );
}

export default App;