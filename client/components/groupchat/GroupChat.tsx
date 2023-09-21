import React from 'react';
import MessageList from '../messages/chat/MeassageInput';
import MessageInput from '../messages/chat/MessageList';
import GroupList from './GroupList';
import Chatlist from '../messages/chatlist';
import Createuser from '../chat/Createuser';
import Display from '../GroupList/Display';
import Groupchat from '../conversation/groupchat';

const GroupChat: React.FC = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        {/* <Chatlist /> */}
        <Createuser/>
      </div>
      <div className="w-3/4 flex">
        <div className='w-1/3'>
          {/* <GroupList /> */}
          <Display/>
        </div>
        <div className='w-2/3'>
          <MessageList />
          {/* <Groupchat/> */}
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
