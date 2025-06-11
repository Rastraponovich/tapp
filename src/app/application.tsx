import './index.css';
import { Button } from '@/shared/ui';
import { ViewerCard } from '@/shared/viewer';

export function Application() {
  const handleClick = () => {
    alert('ты пидор');
  };

  return (
    <>
      <ViewerCard />

      <div className='card'>
        <Button onClick={handleClick}>узнать судьбу</Button>
      </div>
    </>
  );
}
