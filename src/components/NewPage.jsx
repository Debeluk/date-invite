import React from 'react';
import { motion } from 'framer-motion';
import flowerCorner from '../photos/flower-corner.jpg'; // Import the corner images
import rightArrow from '../photos/arrow.png'; // Import your right arrow image

export const NewPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <motion.div
        initial={{ x: '100vw', opacity: 0 }} // Start off-screen to the right
        animate={{ x: 0, opacity: 1 }} // Slide in to the center and fade in
        transition={{ duration: 0.5, ease: 'easeInOut' }} // Animation duration and ease
        style={{
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '10px',
          textAlign: 'center',
          width: '840px', // Width of the rectangle
          height: '420px', // Height of the rectangle
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
          border: '1px solid #000000', // Thin black border
          position: 'relative',
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

        {/* Button Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          marginTop: '20px',
          width: '100%',
        }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <button
              key={index}
              style={{
                width: '100%', // Make the button take full width of the grid cell
                height: '100px', // Set a fixed height for the buttons
                border: '1px solid #000', // Black border
                borderRadius: '5px', // Slightly rounded corners
                backgroundColor: '#fff', // White background
                cursor: 'pointer', // Change cursor on hover
              }}
            >
              {/* Empty button */}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Right Arrow Button outside the white rectangle */}
      <div style={{
        marginLeft: '400px',
        position: 'absolute',
        left: '880px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
      }}> {/* Adjusted positioning of the arrow */}
        <img
          src={rightArrow}
          alt="Right Arrow"
          style={{ width: '100px', height: '100px' }} // Increase the size of the arrow
        />
      </div>
    </div>
  );
};
