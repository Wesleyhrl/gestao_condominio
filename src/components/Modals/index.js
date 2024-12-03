import React, { useState } from 'react'
import { Box, Button, Center, FormControl, Input, Modal } from 'native-base';
import Picture from '../../screens/Moradores/partials/Picture';

export function Modals ({...props}) {
    return (
        <Center>
            <Modal isOpen={props.isVisible} onClose={() => props.closeModal()}>
            <Modal.Content maxWidth="600px">
                <Modal.CloseButton />
                <Modal.Header alignItems={'center'} justifyContent={'center'} >
                    {props.header() ?? null}
                </Modal.Header>
                <Modal.Body>
                    {props.body() ?? null}
                </Modal.Body>
                <Modal.Footer>
                <Button.Group space={2}>
                    <Button variant="ghost" colorScheme="blueGray" bgColor={'#EAEAEA'} onPress={() => {
                        props.closeModal();
                    }}>
                        Cancel
                    </Button>
                    <Button onPress={() => {
                        props.closeModal();
                    }}>
                        Save
                    </Button>
                </Button.Group>
                </Modal.Footer>
            </Modal.Content>
            </Modal>
        </Center>
    )
  };