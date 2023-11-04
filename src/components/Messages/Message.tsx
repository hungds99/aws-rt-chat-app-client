import clsx from 'clsx';

const Message = ({ message, owner }) => {
  return (
    <div className='message-item'>
      <div
        className={clsx('message-item_detail', {
          'message--owner': message.userId === owner?.id
        })}
      >
        <div className='message__avatar'>
          <img
            width={50}
            height={50}
            src='https://picsum.photos/200'
            alt='avatar'
          />
        </div>
        <div className='message__content'>
          <p>
            {message.content} Lorem Ipsum is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
