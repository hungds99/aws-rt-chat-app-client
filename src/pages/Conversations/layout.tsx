import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import Messages from './Messages';
import Rooms from './Rooms';
import './style.css';

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
            <div className='conversation-layout__right-header'>
              <div className='conversation-layout__right-header__avatar'>
                <img
                  width={50}
                  height={50}
                  src='https://picsum.photos/200'
                  alt='avatar'
                  className='conversation-layout__right-header__avatar__image'
                />
              </div>
              <div className='conversation-layout__right-header__info'>
                <div className='conversation-layout__right-header__info__name'>
                  Room name
                </div>
                <div className='conversation-layout__right-header__info__last-active'>
                  Active 1 hour ago
                </div>
              </div>
            </div>
            <div className='conversation-layout_right-content'>
              <Messages />
            </div>
            <div className='conversation-layout_right-footer'>
              <Input type='text' placeholder='Type a message...' />
              <Button>Send</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className='conversation-layout__footer'></CardFooter>
      </Card>
    </div>
  );
};

export default ConversationsLayout;
