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

// Mock data for the audiobook and podcast streaming interface
const mockData = {
  recentlyPlayed: [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      narrator: "James Clear",
      cover: "https://images.pexels.com/photos/2531130/pexels-photo-2531130.jpeg",
      duration: "5:35:00",
      type: "audiobook",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      id: 2,
      title: "The Joe Rogan Experience",
      host: "Joe Rogan",
      episode: "Episode #2054 - Elon Musk",
      cover: "https://images.pexels.com/photos/9786210/pexels-photo-9786210.jpeg",
      duration: "2:47:00",
      type: "podcast",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      id: 3,
      title: "Becoming",
      author: "Michelle Obama",
      narrator: "Michelle Obama",
      cover: "https://images.pexels.com/photos/6827290/pexels-photo-6827290.jpeg",
      duration: "19:03:00",
      type: "audiobook",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      id: 4,
      title: "Serial",
      host: "Sarah Koenig",
      episode: "Season 4: Nice White Parents",
      cover: "https://images.unsplash.com/photo-1629923759854-156b88c433aa",
      duration: "43:00",
      type: "podcast",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      id: 5,
      title: "Educated",
      author: "Tara Westover",
      narrator: "Julia Whelan",
      cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg",
      duration: "12:10:00",
      type: "audiobook",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      id: 6,
      title: "This American Life",
      host: "Ira Glass",
      episode: "Episode 785: The Friendship",
      cover: "https://images.pexels.com/photos/908965/pexels-photo-908965.jpeg",
      duration: "59:00",
      type: "podcast",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    }
  ],
  madeForYou: [
    {
      id: 7,
      title: "Discover Weekly",
      description: "Your weekly collection of fresh audiobooks and podcasts",
      cover: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg",
      type: "playlist"
    },
    {
      id: 8,
      title: "Daily Mix 1",
      description: "Self-help, productivity, and personal development",
      cover: "https://images.unsplash.com/photo-1582730147924-d92f4da00252",
      type: "playlist"
    },
    {
      id: 9,
      title: "New Releases",
      description: "Catch all the latest audiobooks and podcast episodes",
      cover: "https://images.pexels.com/photos/1181770/pexels-photo-1181770.jpeg",
      type: "playlist"
    },
    {
      id: 10,
      title: "Continue Listening",
      description: "Pick up where you left off",
      cover: "https://images.pexels.com/photos/1759350/pexels-photo-1759350.jpeg",
      type: "playlist"
    }
  ],
  trending: [
    {
      id: 11,
      title: "The Power of Now",
      author: "Eckhart Tolle",
      narrator: "Eckhart Tolle",
      cover: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c",
      duration: "7:37:00",
      type: "audiobook",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      id: 12,
      title: "Conan O'Brien Needs a Friend",
      host: "Conan O'Brien",
      episode: "Episode 234: Adam Sandler",
      cover: "https://images.unsplash.com/photo-1536849249744-44e01e7a089d",
      duration: "1:24:00",
      type: "podcast",
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