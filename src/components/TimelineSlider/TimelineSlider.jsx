import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { PlayArrow } from '@mui/icons-material';
import { Pause } from '@mui/icons-material';
function TimelineSlider({ onYearChange }) {
  const years = [2008, 2016, 2024, 2040];
  const [selectedYear, setSelectedYear] = useState(2008);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    if (onYearChange) {
      onYearChange(year);
    }
  };

  // Play functionality to auto-progress through years
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSelectedYear((prevYear) => {
          const nextIndex = (years.indexOf(prevYear) + 1) % years.length;
          const nextYear = years[nextIndex];
          if (onYearChange) onYearChange(nextYear);
          return nextYear;
        });
      }, 2000); // Adjust the interval time (e.g., 2000ms = 2 seconds)
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onYearChange, years]);

  return (
    <div className="absolute bottom-5 mt-[-5%] w-full flex items-center">
      {/* Play/Pause Button */}
      <div className='ml-[5%] mr-[5%] mt-[-5%]'>
      <IconButton
        onClick={() => setIsPlaying(!isPlaying)}
        style={{
            color: '#92843B', // Dynamic color
          }}
      >
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      </div>
      {/* Slider */}
      <div className="relative w-4/5">
        {/* Slider Track */}
        <div className="absolute w-full h-1 bg-gradient-to-r from-gray-400 via-[#92843B] to-[#92843B] rounded"></div>

        {/* Slider Points */}
        <div className="flex justify-between relative w-full">
          {years.map((year, index) => (
            <button
              key={index}
              onClick={() => handleYearChange(year)}
              className={`w-5 h-5 rounded-full border-2 ${
                selectedYear === year
                  ? 'bg-[#92843B] border-[#92843B]'
                  : 'bg-white border-gray-500'
              }`}
              style={{ position: 'relative', top: '-7px' }}
            />
          ))}
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-5">
          {years.map((year, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-lg shadow-md text-sm ${
                selectedYear === year
                  ? 'bg-[#92843B] text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {year}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimelineSlider;
