import { Outlet } from 'react-router-dom';
import Rooms from '.';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { RoomProvider } from '../../providers/rooms';
import './style.css';

const RoomsLayout = () => {
  return (
    <RoomProvider>
      <div className='room-layout'>
        <Card className='room-layout__card'>
          <CardHeader className='room-layout__header'>
            <Button>Home</Button>
          </CardHeader>
          <CardContent className='room-layout__content'>
            <div className='room-layout__left'>
              <div className='search-box'>
                <Input type='text' placeholder='Search...' />
              </div>
              <Rooms />
            </div>
            <div className='room-layout__right'>
              <Outlet />
            </div>
          </CardContent>
          <CardFooter className='room-layout__footer'></CardFooter>
        </Card>
      </div>
    </RoomProvider>
  );
};

export default RoomsLayout;
