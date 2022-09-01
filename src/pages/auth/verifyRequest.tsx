import React from 'react';
import { SiMinutemailer } from 'react-icons/si';

const VerifyRequest = () => {
  return (
    <div className="text-center mt-10">
      <p className="mb-10 text-2xl">Email sent!</p>

      <div className="flex justify-center items-center" >
        <SiMinutemailer size={64}/>
      </div>

      <p className="text-xl mb-4">Check your email for your login link.</p>
      <p>You may close this window after logging in.</p>
    </div>
  );
};

export default VerifyRequest;
