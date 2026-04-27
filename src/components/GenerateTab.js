import React, { useState } from 'react';
// import axios from 'axios';
const GenerateTab = () => {
  const [lyrics, setLyrics] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('pop');

  const generateSong = async () => {
    if (!lyrics.trim()) {
      setError('Please enter lyrics first');
      return;
    }

    setLoading(true);
    setError('');
    setSongs([]);

    // Simulate API call (replace with your actual music generation)
    setTimeout(() => {
      // Demo audio URL (free sample)
      const demoAudio = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
      
      const generatedSongs = [
        {
          id: 1,
          title: `${selectedStyle.toUpperCase()} Version - Full Song`,
          audioUrl: demoAudio,
          duration: '1:30',
          style: selectedStyle
        },
        {
          id: 2,
          title: `${selectedStyle.toUpperCase()} Version - Instrumental`,
          audioUrl: demoAudio,
          duration: '1:30',
          style: selectedStyle
        },
        {
          id: 3,
          title: `${selectedStyle.toUpperCase()} Version - Acoustic`,
          audioUrl: demoAudio,
          duration: '1:30',
          style: selectedStyle
        }
      ];

      setSongs(generatedSongs);
      setLoading(false);
    }, 2000);
  };

  const handlePreview = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const handleDownload = async (audioUrl, title) => {
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/\s/g, '_')}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Download failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎤 Generate Song from Lyrics</h2>
      
      <div style={styles.styleSelector}>
        <button
          style={selectedStyle === 'pop' ? styles.styleActive : styles.styleButton}
          onClick={() => setSelectedStyle('pop')}
        >
          🎵 Pop
        </button>
        <button
          style={selectedStyle === 'acoustic' ? styles.styleActive : styles.styleButton}
          onClick={() => setSelectedStyle('acoustic')}
        >
          🎸 Acoustic
        </button>
        <button
          style={selectedStyle === 'rock' ? styles.styleActive : styles.styleButton}
          onClick={() => setSelectedStyle('rock')}
        >
          🤘 Rock
        </button>
      </div>

      <textarea
        style={styles.textarea}
        placeholder="Enter your lyrics here (Burmese or English)..."
        value={lyrics}
        onChange={(e) => setLyrics(e.target.value)}
        rows={8}
      />

      <button
        style={styles.button}
        onClick={generateSong}
        disabled={loading}
      >
        {loading ? '🎶 Generating...' : '🎤 Generate 3 Songs'}
      </button>

      {loading && (
        <div style={styles.loading}>
          <p>🎵 Creating your song...</p>
          <p style={styles.loadingSmall}>This may take a few moments</p>
        </div>
      )}

      {error && <p style={styles.error}>❌ {error}</p>}

      {songs.length > 0 && (
        <div style={styles.results}>
          <h3 style={styles.resultsTitle}>🎉 Your Generated Songs</h3>
          <div style={styles.songsContainer}>
            {songs.map((song) => (
              <div key={song.id} style={styles.songCard}>
                <h4 style={styles.songTitle}>{song.title}</h4>
                <p style={styles.songDuration}>⏱ Duration: {song.duration}</p>
                <p style={styles.songStyle}>🎨 Style: {song.style}</p>
                <div style={styles.buttonGroup}>
                  <button
                    style={styles.previewBtn}
                    onClick={() => handlePreview(song.audioUrl)}
                  >
                    ▶ Preview
                  </button>
                  <button
                    style={styles.downloadBtn}
                    onClick={() => handleDownload(song.audioUrl, song.title)}
                  >
                    ⬇ Download MP3
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px'
  },
  styleSelector: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'center'
  },
  styleButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '25px',
    cursor: 'pointer'
  },
  styleActive: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  textarea: {
    width: '100%',
    padding: '15px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '20px',
    fontFamily: 'monospace',
    resize: 'vertical'
  },
  button: {
    width: '100%',
    padding: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    marginTop: '20px'
  },
  loadingSmall: {
    fontSize: '12px',
    color: '#666',
    marginTop: '5px'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#ffe0e0',
    borderRadius: '8px'
  },
  results: {
    marginTop: '30px'
  },
  resultsTitle: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  songsContainer: {
    display: 'grid',
    gap: '15px'
  },
  songCard: {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9'
  },
  songTitle: {
    margin: '0 0 10px 0',
    color: '#333'
  },
  songDuration: {
    margin: '5px 0',
    color: '#666',
    fontSize: '14px'
  },
  songStyle: {
    margin: '5px 0 15px 0',
    color: '#4CAF50',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px'
  },
  previewBtn: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  downloadBtn: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#FF9800',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default GenerateTab;