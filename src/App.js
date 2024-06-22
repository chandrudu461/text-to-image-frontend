import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const generateImage = async () => {
        if (!text.trim()) {
            setError('Please enter some text.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/generate-image', { prompt: text });
            setImageUrl(response.data.imageUrl);
        } catch (error) {
            console.error('Error generating image:', error);
            setError('Failed to generate image. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Text to Image Generator</h1>
                <div className="input-container">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text to generate an image"
                    />
                    <button onClick={generateImage} disabled={loading}>
                        {loading ? 'Generating...' : 'Generate Image'}
                    </button>
                </div>
                {error && <p className="error-message">{error}</p>}
                {imageUrl && <img className="generated-image" src={imageUrl} alt="Generated" />}
            </header>
        </div>
    );
}

export default App;
