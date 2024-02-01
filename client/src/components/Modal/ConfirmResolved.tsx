import {
  Badge,
  Button,
  Kbd,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useRemoveDomainMutation } from "../../api";
import { useStore } from "../../context";

const ConfirmResolved = () => {
  const { actionDispatch, actions, storeDispatch } = useStore();
  const [removeDomainGQL] = useRemoveDomainMutation();

  const closeModal = () => {
    actionDispatch({ type: "HANDLE_RESOLVED_MODAL", payload: { isOpen: false, data: null } });
  };

  const handleRemove = async () => {
    try {
      const response = await removeDomainGQL({
        variables: {
          removeDomainId: `${actions.resolvedModal.data?.id}`,
          password: `${actions.resolvedModal.data?.password}`,
        },
      });

      if (response.data?.removeDomain.affectedCount == 1) {
        storeDispatch({
          type: "DELETE_DOMAIN",
          payload: { id: `${actions.resolvedModal.data?.id}` },
        });
        actionDispatch({
          type: "HANDLE_TOAST",
          payload: { isOpen: true, success: true, message: "Successfully resolved!" },
        });
      } else {
        actionDispatch({
          type: "HANDLE_TOAST",
          payload: { isOpen: true, success: false, message: "Something went wrong!" },
        });
      }

      closeModal();
    } catch (error) {
      console.log(error);
      actionDispatch({
        type: "HANDLE_TOAST",
        payload: { isOpen: true, success: false, message: "Something went wrong!" },
      });
    }
  };

  return (
    <Modal isOpen={actions.resolvedModal.isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Happy to assist you! 😊</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure to mark this as resolved{" "}
          <Kbd mx={2} color={"purple"} fontSize={18}>
            {actions.resolvedModal.data?.name}
          </Kbd>
          ?
          <Text textAlign={"left"}>
            Please Remember this - <b>{actions.resolvedModal.data?.password}</b>
          </Text>
          <Stack direction="row" mt={4}>
            <Badge colorScheme="red" p={0.5} px={2} borderRadius={"8px"} fontSize={"12px"}>
              {actions.resolvedModal.data?.usedPW?.length || 0} failed attempt
            </Badge>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => closeModal()}>
            Close
          </Button>
          <Button colorScheme="purple" onClick={handleRemove}>
            Resolved
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmResolved;
