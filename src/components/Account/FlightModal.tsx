import { Button, Modal } from 'flowbite-react';
import React, { useState } from 'react';

const FlightModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleModalToggle = () => setShowModal((old) => !old);
  
  return (
    <div>
      
    </div>
  );
};

export default FlightModal;
