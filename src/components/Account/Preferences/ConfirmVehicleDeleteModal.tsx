import { Button, Modal } from 'flowbite-react';
import React from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Vehicle } from '../../../schema/preferences.schema';

interface ConfirmVehicleDeleteModalProps {
  show: boolean;
  closeModal: () => void;
  vehicle: Vehicle | undefined;
  handleConfirmDelete: () => void;
}
const ConfirmVehicleDeleteModal = ({
  show,
  closeModal,
  vehicle,
  handleConfirmDelete,
}: ConfirmVehicleDeleteModalProps) => {
  return (
    <div>
      <Modal show={show} size="md" popup={true}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400 dark:text-red-200" />
            <h3 className="mb-5 text-lg font-normal">
              Are you sure you want to delete your {vehicle?.vehicle_year}{' '}
              {vehicle?.vehicle_make} {vehicle?.vehicle_model}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleConfirmDelete()}
              >
                {'Yes, I\'m sure'}
              </Button>
              <Button onClick={closeModal}>No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ConfirmVehicleDeleteModal;
