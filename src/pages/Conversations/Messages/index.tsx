import clsx from 'clsx';
import './style.css';

const Messages = () => {
  return (
    <div className='message-container'>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          className={clsx('message-item', {
            'message--owner': index % 2 === 0
          })}
          key={index}
        >
          <div className='message__avatar'>
            <img
              width={50}
              height={50}
              src='https://picsum.photos/200'
              alt='avatar'
              className='message__avatar__image'
            />
          </div>
          <div className='message__content'>This show message content</div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
