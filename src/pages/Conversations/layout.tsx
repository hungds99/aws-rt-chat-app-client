import { Outlet } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import Rooms from './Rooms';
import './style.css';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../providers/auth';

const ConversationsLayout = () => {
  return (
    <div className='conversation-layout'>
      <Card className='conversation-layout__card'>
        <CardHeader className='conversation-layout__header'>
          <Button>Home</Button>
          <Button>New messages</Button>
        </CardHeader>
        <CardContent className='conversation-layout__content'>
          <div className='conversation-layout__left'>
            <div className='search-box'>
              <Input type='text' placeholder='Search...' />
            </div>
            <Rooms />
          </div>
          <div className='conversation-layout__right'>
            <Outlet />
          </div>
        </CardContent>
        <CardFooter className='conversation-layout__footer'></CardFooter>
      </Card>
    </div>
  );
};

export default ConversationsLayout;
