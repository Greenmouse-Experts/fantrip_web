"use client"
import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
interface ModalProps{
  title: string;
    children: JSX.Element;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}
const useDialog = () => {
  const [showModal, setModal] = useState(false);

  const setShowModal = (state:boolean) => setModal(state);
  const closeModal = () => setModal(false)

  const Dialog: React.FC<ModalProps> = ({ title, children, size}) =>{
    return (
        <>
          <Modal size={size} blockScrollOnMount={false} isCentered motionPreset='slideInBottom' isOpen={showModal} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent className="pb-4 dark:!bg-darkColorLight">
              <ModalHeader className="dark:text-white">{title}</ModalHeader>
              <ModalCloseButton className="dark:invert" />
              <ModalBody>
                <div>
                    {children}
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )
  };

  return { Dialog, showModal, setShowModal };
};

export default useDialog;
