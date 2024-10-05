import { useState } from 'react'; // Import useState
import { WelcomeWindow } from './Welcome';
import { NewPage } from './NewPage'; // Import the new page
import heartsBG from '../photos/hearts.webp'; // Import the background image

export const App = () => {
  const [showWelcome, setShowWelcome] = useState(true); // State to control which component to show

  // Function to handle showing the new page after 3 seconds
  const handleShowNewPage = () => {
    setTimeout(() => {
      setShowWelcome(false); // Hide the WelcomeWindow
    }, 3000); // Wait for 3 seconds
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        backgroundImage: `url(${heartsBG})`, // Use the imported background image
        backgroundSize: '33%', // Size of the image
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat', // Repeat the image
      }}
    >
      {showWelcome ? (
        <WelcomeWindow onHide={handleShowNewPage} /> // Pass the function to WelcomeWindow
      ) : (
        <NewPage /> // Show the new page
      )}
    </div>
  );
};
