'use client';
import React, { useRef, useEffect, useState } from 'react';

const SCALE = 15;
const INITIAL_SNAKE = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
];
const INITIAL_DIRECTION = { x: 1, y: 0 };

function getRandomFood() {
  return {
    x: Math.floor(Math.random() * (600 / SCALE)),
    y: Math.floor(Math.random() * (600 / SCALE)),
  };
}

export default function SnakeGamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(getRandomFood());
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const directionQueue = useRef([{ ...INITIAL_DIRECTION }]);
  const canvasSize = 600;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameOver) return;
        setRunning(r => !r);
        return;
      }
      const lastDir = directionQueue.current[directionQueue.current.length - 1];
      let newDir = null;
      switch (e.key) {
        case 'ArrowUp':
          if (lastDir.y === 0) newDir = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (lastDir.y === 0) newDir = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (lastDir.x === 0) newDir = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (lastDir.x === 0) newDir = { x: 1, y: 0 };
          break;
      }
      if (newDir) directionQueue.current.push(newDir);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameOver]);

  useEffect(() => {
    if (!running || gameOver) return;
    const interval = setInterval(() => {
      setSnake(prev => {
        const maxCells = canvasSize / SCALE;
        const nextDir = directionQueue.current.length > 1 ? directionQueue.current.shift()! : directionQueue.current[0];
        const newHead = {
          x: prev[0].x + nextDir.x,
          y: prev[0].y + nextDir.y,
        };
        if (newHead.x < 0) newHead.x = maxCells - 1;
        if (newHead.x >= maxCells) newHead.x = 0;
        if (newHead.y < 0) newHead.y = maxCells - 1;
        if (newHead.y >= maxCells) newHead.y = 0;
        if (prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameOver(true);
          setRunning(false);
          setTimeout(() => setShowInput(true), 500);
          return prev;
        }
        const newSnake = [newHead, ...prev];
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(getRandomFood());
          setScore(s => s + 1);
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [food, gameOver, canvasSize, running]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * SCALE, food.y * SCALE, SCALE, SCALE);
    ctx.fillStyle = 'white';
    snake.forEach(seg => {
      ctx.fillRect(seg.x * SCALE, seg.y * SCALE, SCALE, SCALE);
    });
    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, canvasSize / 2 - 30, canvasSize, 60);
      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', canvasSize / 2, canvasSize / 2);
      ctx.font = '16px Arial';
      ctx.fillText('Refresh to restart', canvasSize / 2, canvasSize / 2 + 24);
    }
  }, [snake, food, gameOver, canvasSize]);

  // Fetch leaderboard from API route
  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      try {
        const res = await fetch('/api/snake-leaderboard');
        if (!res.ok) throw new Error('Failed to fetch leaderboard');
        const data = await res.json();
        console.log(data);
        setLeaderboard(data || []);
      } catch (err) {
        console.log(err)
      }
      setLoading(false);
    }
    fetchLeaderboard();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    try {
      const res = await fetch('/api/snake-leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, score }),
      });
      if (!res.ok) throw new Error('Failed to submit score');
      setUsername('');
      // Re-fetch leaderboard after submit
      const lbRes = await fetch('/api/snake-leaderboard');
      const lbData = await lbRes.json();
      setLeaderboard(lbData || []);
    } catch (err) {
        console.log(err);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-row items-start mt-8 gap-12">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Snake Game</h1>
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          style={{ border: '2px solid #333', background: 'black', maxWidth: 600, maxHeight: 600 }}
          tabIndex={0}
        />
        <div className="mt-2 font-mono text-white">Score: {score}</div>
        <div className="mt-2 text-gray-400 text-sm">Press <kbd className="px-1 py-0.5 bg-gray-700 rounded">Space</kbd> to Start/Stop</div>
      </div>
      <div className="flex flex-col items-center min-w-[220px]">
        <h2 className="text-xl font-bold mb-2">Leaderboard</h2>
        {loading && <div className="text-gray-400">Loading...</div>}
        <ol className="w-full mb-4">
          {leaderboard.length === 0 && !loading && <li className="text-gray-400">No scores yet</li>}
          {leaderboard.map((entry, idx) => (
            <li key={idx} className="flex justify-between w-full text-white font-mono">
              <span>{entry.name}</span>
              <span>{entry.score}</span>
            </li>
          ))}
        </ol>
        {gameOver && showInput && (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-center gap-2 w-full">
            <label htmlFor="username" className="font-mono text-white">Submit your result:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="border px-2 py-1 rounded w-full"
              placeholder="Your name"
              disabled={submitted || loading}
              required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50 w-full" disabled={submitted || loading}>
              {submitted ? 'Submitted!' : loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
