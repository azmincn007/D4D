import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/config';
import { LoginContext } from '../../../App';

function WatchTime() {
  const [watchTime, setWatchTime] = useState('00:00:00');
  const [baseWatchTime, setBaseWatchTime] = useState(0);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const { isLoggedIn } = useContext(LoginContext);

  const updateWatchTime = useCallback(async () => {
    try {
      const token = localStorage.getItem('usertoken');
      if (!token) return;

      await axios.post(`${API_BASE_URL}/api/user/update-watch-time`, {
        watch_time: watchTime
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    } catch (error) {
      console.error('Error updating watch time:', error);
    }
  }, [watchTime]);

  useEffect(() => {
    const handleUserActivity = () => {
      setLastActivity(Date.now());
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    const interval = setInterval(() => {
      const now = Date.now();
      const idleDuration = now - lastActivity;

      if (idleDuration >= 30000) {
        updateWatchTime();
        setLastActivity(now);
      }

      const totalSeconds = Math.floor(idleDuration / 1000) + baseWatchTime;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setWatchTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      updateWatchTime();
      // Use a synchronous request to ensure it completes before the page unloads
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${API_BASE_URL}/api/user/update-watch-time`, false);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('usertoken')}`);
      xhr.send(JSON.stringify({ watch_time: watchTime }));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(interval);
    };
  }, [lastActivity, updateWatchTime, baseWatchTime]);

  useEffect(() => {
    const fetchWatchTime = async () => {
      try {
        const token = localStorage.getItem('usertoken');
        if (!token) return;

        const response = await axios.get(`${API_BASE_URL}/api/user/watch-time`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const [hours, minutes, seconds] = response.data.data.watch_time.split(':').map(Number);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        setBaseWatchTime(totalSeconds);
        setWatchTime(response.data.data.watch_time);
      } catch (error) {
        console.error('Error fetching watch time:', error);
      }
    };

    if (isLoggedIn) {
      fetchWatchTime();
    }
  }, [isLoggedIn]);

  return (
    <div className="watchtime w-[177px] py-[4px] Tab:mt-[-15px] bg-[#232F3E] text-center text-white rounded-[1000px] Tab:w-[100px]">
      <p className="text-small Tab:text-xs">Watch Time</p>
      <p className="text-xs Tab:text-[6px]">{watchTime}</p>
    </div>
  );
}

export default WatchTime;