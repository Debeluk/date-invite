import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import flowerCorner from '../photos/flower-corner.jpg'; // Импорт изображения

export const WelcomeWindow = () => {
  const [showHearts, setShowHearts] = useState([]);
  const [hovering, setHovering] = useState(false);
  const [email, setEmail] = useState(''); // State for email input
  const [emailError, setEmailError] = useState(''); // State for email error message
  const buttonRef = useRef(null);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setShowHearts([]); // Очистка сердец при выходе мыши с кнопки
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(''); // Reset the error message on email change
  };

  const handleButtonClick = () => {
    // Validate email format on button click
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email');
    } else {
      setEmailError('');
      // Proceed with further actions here if needed
    }
  };

  useEffect(() => {
    // Блокировка прокрутки
    document.body.style.overflow = 'hidden';

    let interval;
    if (hovering) {
      interval = setInterval(() => {
        if (buttonRef.current) {
          const buttonRect = buttonRef.current.getBoundingClientRect();
          setShowHearts((prevHearts) => [
            ...prevHearts,
            ...Array.from({ length: 3 }).map(() => ({
              id: Math.random(),
              x: Math.random() * buttonRect.width - buttonRect.width / 2,
              y: Math.random() * buttonRect.height - buttonRect.height / 2,
              startX: Math.random() * buttonRect.width,
              startY: Math.random() * buttonRect.height,
            })),
          ]);
        }
      }, 400); // Каждые 400 мс добавляем несколько сердец
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
      // Сбрасываем стиль при размонтировании
      document.body.style.overflow = 'auto';
    };
  }, [hovering]);

  return (
    <motion.div
      initial={{ y: '100vh', opacity: 1 }} // Начальное положение: ниже экрана
      animate={{ y: 0, opacity: 1 }} // Конечное положение: в центре экрана
      transition={{ duration: 0.5 }} // Длительность анимации
      style={{
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        width: '800px',
        height: '400px',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
        border: '1px solid #000000',
        position: 'relative',
      }}
    >
      {/* Угловые изображения */}
      <img
        src={flowerCorner}
        alt="Flower Corner"
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          width: '140px',
          height: '140px',
        }}
      />
      <img
        src={flowerCorner}
        alt="Flower Corner"
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          width: '140px',
          height: '140px',
          transform: 'rotate(-90deg)',
        }}
      />
      <img
        src={flowerCorner}
        alt="Flower Corner"
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          width: '140px',
          height: '140px',
          transform: 'rotate(90deg)',
        }}
      />
      <img
        src={flowerCorner}
        alt="Flower Corner"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '140px',
          height: '140px',
          transform: 'rotate(180deg)',
        }}
      />

      <h3>Template Creator</h3>
      <p>Create a perfect template!</p>

      {/* Email Input */}
      <div style={{ marginBottom: '5px' }}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '380px', // Match button width
            fontSize: '16px',
          }}
        />
        {emailError && <p style={{ color: 'red', fontSize: '14px', margin: '5px 0 0' }}>{emailError}</p>}
      </div>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <motion.button
          ref={buttonRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleButtonClick} // Handle click event
          style={{
            width: '400px',
            padding: '15px 20px',
            fontSize: '18px',
            borderRadius: '10px',
            border: '2px solid #000000',
            cursor: 'pointer',
            backgroundColor: '#ffffff',
            color: '#000000',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)', // Increase shadow for more depth
            transition: 'transform 0.1s ease, box-shadow 0.1s ease', // Faster transition for the animation
            transform: hovering ? 'scale(1.05)' : 'scale(1)',
          }}
          whileTap={{ scale: 0.95 }} // Subtle scale down on tap
        >
          Begin
        </motion.button>

        {showHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              opacity: [1, 0], // Сердце сначала становится видимым, затем исчезает
              scale: [1, 1.5, 0], // Сердце увеличивается и затем "лопается"
              x: heart.x,
              y: heart.y - 100, // Сердце всегда движется вверх от исходной позиции
            }}
            transition={{ duration: 1.2 }} // Длительность анимации 1.2 секунды
            style={{
              position: 'absolute',
              top: `${heart.startY}px`, // Начальная позиция по Y относительно кнопки
              left: `${heart.startX}px`, // Начальная позиция по X относительно кнопки
              fontSize: '24px',
              color: '#ff007f',
              pointerEvents: 'none',
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
