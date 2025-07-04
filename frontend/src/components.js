import React, { useState } from 'react';

// Navigation Component
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold">
            <span className="text-white">v</span>
            <span className="text-pink-500">osyn</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for audiobooks, podcasts, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-800 text-white rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <button className="text-white hover:text-pink-500 transition-colors font-medium">
            Home
          </button>
          <button className="text-pink-500 font-medium border-b-2 border-pink-500 pb-1">
            Listen
          </button>
          <button className="text-white hover:text-pink-500 transition-colors font-medium">
            Browse
          </button>
          <button className="text-white hover:text-pink-500 transition-colors font-medium">
            Library
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5M15 3h5l-5-5" />
            </svg>
          </button>
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Section Component
const Hero = () => {
  return (
    <section className="relative h-80 bg-gradient-to-br from-pink-900 via-purple-900 to-black flex items-center justify-center mt-16">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-white">
          Listen to your <span className="text-pink-400">favorite</span> stories
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Discover audiobooks, podcasts, and immersive audio content
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
          Start Listening
        </button>
      </div>
    </section>
  );
};

// Recently Played Component
const RecentlyPlayed = ({ tracks, onPlayTrack }) => {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">Recently Played</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer group"
            onClick={() => onPlayTrack(track)}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">{track.title}</h3>
                <p className="text-gray-400">
                  {track.type === 'audiobook' ? `by ${track.author}` : track.host}
                </p>
                <p className="text-gray-500 text-sm">
                  {track.type === 'audiobook' ? `Narrated by ${track.narrator}` : track.episode}
                </p>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-sm">
                  {track.duration}
                </div>
                <div className="text-gray-500 text-xs capitalize">
                  {track.type}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Made For You Component
const MadeForYou = ({ playlists }) => {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">Made For You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer group"
          >
            <div className="relative mb-4">
              <img
                src={playlist.cover}
                alt={playlist.title}
                className="w-full h-48 rounded-md object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-white font-semibold mb-2">{playlist.title}</h3>
            <p className="text-gray-400 text-sm">{playlist.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Trending Now Component
const TrendingNow = ({ tracks, onPlayTrack }) => {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">Trending Now</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer group"
            onClick={() => onPlayTrack(track)}
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-pink-500 w-8">
                {index + 1}
              </div>
              <div className="relative">
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">{track.title}</h3>
                <p className="text-gray-400">
                  {track.type === 'audiobook' ? `by ${track.author}` : track.host}
                </p>
                <p className="text-gray-500 text-sm">
                  {track.type === 'audiobook' ? `Narrated by ${track.narrator}` : track.episode}
                </p>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-sm">
                  {track.duration}
                </div>
                <div className="text-gray-500 text-xs capitalize">
                  {track.type}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Playlist Grid Component
const PlaylistGrid = () => {
  const categories = [
    { name: 'Self-Help', color: 'bg-pink-500', icon: '🧠' },
    { name: 'True Crime', color: 'bg-red-500', icon: '🔍' },
    { name: 'Comedy', color: 'bg-yellow-500', icon: '😂' },
    { name: 'Science', color: 'bg-blue-500', icon: '🔬' },
    { name: 'History', color: 'bg-purple-500', icon: '📚' },
    { name: 'Business', color: 'bg-green-500', icon: '💼' },
    { name: 'Fiction', color: 'bg-orange-500', icon: '📖' },
    { name: 'News', color: 'bg-indigo-500', icon: '📰' }
  ];

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">Browse by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`${category.color} rounded-lg p-6 h-32 flex flex-col justify-between cursor-pointer hover:scale-105 transition-transform`}
          >
            <h3 className="text-white font-bold text-lg">{category.name}</h3>
            <div className="text-2xl self-end">{category.icon}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Music Player Component
const MusicPlayer = ({ 
  currentTrack, 
  isPlaying, 
  currentTime, 
  duration, 
  volume, 
  onTogglePlay, 
  onTimeChange, 
  onVolumeChange 
}) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
      <div className="flex items-center justify-between">
        {/* Current Track Info */}
        <div className="flex items-center space-x-4 flex-1">
          <img
            src={currentTrack?.cover}
            alt={currentTrack?.title}
            className="w-14 h-14 rounded-md object-cover"
          />
          <div>
            <h4 className="text-white font-semibold">{currentTrack?.title}</h4>
            <p className="text-gray-400 text-sm">
              {currentTrack?.type === 'audiobook' 
                ? `by ${currentTrack?.author}` 
                : currentTrack?.host}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>
            <button 
              onClick={onTogglePlay}
              className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full max-w-md">
            <span className="text-gray-400 text-xs">{formatTime(currentTime)}</span>
            <div className="flex-1 h-1 bg-gray-600 rounded-full">
              <div 
                className="h-1 bg-white rounded-full transition-all duration-300"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            <span className="text-gray-400 text-xs">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </button>
          <div className="w-20 h-1 bg-gray-600 rounded-full">
            <div 
              className="h-1 bg-white rounded-full"
              style={{ width: `${volume * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Components = {
  Navbar,
  Hero,
  RecentlyPlayed,
  MadeForYou,
  TrendingNow,
  PlaylistGrid,
  MusicPlayer
};