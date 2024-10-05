import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import flowerCorner from '../photos/flower-corner.jpg';
import flowerLine from '../photos/flowerline.png'; // Import the flowerline image
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Loading.css';

export const WelcomeWindow = () => {
  const [showHearts, setShowHearts] = useState([]);
  const [hovering, setHovering] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false); // New state for animation
  const buttonRef = useRef(null);
  const heartRef = useRef(null);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setShowHearts([]);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleButtonClick = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email');
    } else {
      setEmailError('');
      setIsLoading(true);

      if (heartRef.current) {
        heartRef.current.classList.add('fill');
      }

      setTimeout(() => {
        if (heartRef.current) {
          heartRef.current.classList.remove('fill');
        }
        console.log('Stored Email:', email);
        setTimeout(() => {
          setIsLoading(false);
          setIsContentVisible(false);
        }, 300);
      }, 3000);
    }
  };

  const handleSecondButtonClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      // Trigger the exit animation
      setIsContentVisible(false);
    }, 600); // Wait for the animation duration
  };

  useEffect(() => {
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
      }, 400);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'auto';
    };
  }, [hovering]);

  // Custom input component for the DatePicker
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      type="text"
      value={value}
      onClick={onClick}
      ref={ref}
      placeholder="Select a date"
      style={{
        padding: '15px', // Adjust padding
        borderRadius: '5px',
        border: '1px solid #000', // Black border
        color: '#000', // Dark text
        fontSize: '18px', // Increased font size
        width: '190px', // Half the previous width
        textAlign: 'center', // Center the text inside the input
      }}
    />
  ));

  return (
    <motion.div
      initial={{ y: '100vh', opacity: 1 }}
      animate={{
        y: isAnimating ? [0, 10, -800] : 0, // Animation for exit
        opacity: isAnimating ? [1, 1, 0] : 1,
      }}
      transition={{ duration: isAnimating ? 0.6 : 0.5 }} // Adjust duration based on animation state
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
        display: 'flex',
        flexDirection: 'column', // Stack children vertically
        alignItems: 'center', // Center items horizontally
      }}
    >
      {/* Corner images */}
      <img src={flowerCorner} alt="Flower Corner"
           style={{ position: 'absolute', bottom: '10px', left: '10px', width: '140px', height: '140px' }} />
      <img src={flowerCorner} alt="Flower Corner" style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        width: '140px',
        height: '140px',
        transform: 'rotate(-90deg)',
      }} />
      <img src={flowerCorner} alt="Flower Corner" style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        width: '140px',
        height: '140px',
        transform: 'rotate(90deg)',
      }} />
      <img src={flowerCorner} alt="Flower Corner" style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '140px',
        height: '140px',
        transform: 'rotate(180deg)',
      }} />

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <div id="heart" ref={heartRef} className="loading-heart"></div>
        </div>
      ) : !isContentVisible ? (
        <>
          <h6 style={{ margin: '32px 0' }}>Choose your perfect date!</h6>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            customInput={<CustomInput />} // Use the custom input
          />
          <img src={flowerLine} alt="Flower Line" style={{ margin: '32px 0 16px 0', width: '50%' }} />
          <motion.button
            onClick={handleSecondButtonClick} // Trigger the animation on click
            style={{
              width: '400px',
              padding: '15px 20px',
              fontSize: '18px',
              borderRadius: '10px',
              border: '2px solid #000000',
              cursor: 'pointer',
              backgroundColor: '#ffffff',
              color: '#000000',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.1s ease, box-shadow 0.1s ease',
              marginTop: '20px',
              marginBottom: '0',
            }}
            whileHover={{ scale: 1.05 }} // Slightly increase size on hover
            whileTap={{ scale: 0.95 }} // Slightly decrease size on tap
          >
            Second Button
          </motion.button>
        </>
      ) : (
        <>
          <h3 style={{ margin: '16px 0' }}>Template Creator</h3>
          <p style={{ margin: '16px 0' }}>Create a perfect template!</p>

          <div style={{ margin: '16px 0 32px 0' }}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '380px',
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
              onClick={handleButtonClick}
              style={{
                width: '400px',
                padding: '15px 20px',
                fontSize: '18px',
                borderRadius: '10px',
                border: '2px solid #000000',
                cursor: 'pointer',
                backgroundColor: '#ffffff',
                color: '#000000',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                transform: hovering ? 'scale(1.05)' : 'scale(1)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Begin
            </motion.button>

            {showHearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ opacity: 0, scale: 1 }}
                animate={{
                  opacity: [1, 0],
                  scale: [1, 1.5, 0],
                  x: heart.x,
                  y: heart.y - 100,
                }}
                transition={{ duration: 1.2 }}
                style={{
                  position: 'absolute',
                  top: `${heart.startY}px`,
                  left: `${heart.startX}px`,
                  fontSize: '24px',
                  color: '#ff007f',
                  pointerEvents: 'none',
                }}
              >
                ❤️
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};
