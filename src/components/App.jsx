import { WelcomeWindow } from './Welcome';
import heartsBG from '../photos/hearts.webp'; // Импорт изображения из папки photos

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        backgroundImage: `url(${heartsBG})`, // Используем импортированное изображение
        backgroundSize: '33%', // Размер изображения — 50%, чтобы поместилось 4 раза
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat', // Повтор изображения по обоим направлениям
      }}
    >
      <WelcomeWindow />
    </div>
  );
};
