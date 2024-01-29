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
import { useActions } from "../../context/actions";
import { useRemoveDomainMutation } from "../../api";
import { useStore } from "../../context";

const ConfirmResolved = () => {
  const { resolvedModal, handleResolvedModal } = useActions();
  const { deleteDomain } = useStore();
  const [removeDomainGQL] = useRemoveDomainMutation();

  const handleRemove = async () => {
    const response = await removeDomainGQL({
      variables: {
        removeDomainId: `${resolvedModal.data?.id}`,
        password: resolvedModal.password,
      },
    });

    if (response.data?.removeDomain.affectedCount == 1) {
      deleteDomain(`${resolvedModal.data?.id}`);
    } else {
      console.log("something went wrong!");
    }

    handleResolvedModal();
  };

  return (
    <Modal isOpen={resolvedModal.status} onClose={handleResolvedModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Happy to assist you! 😊</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure to mark this as resolved{" "}
          <Kbd mx={2} color={"purple"} fontSize={18}>
            {resolvedModal.data?.name}
          </Kbd>
          ?
          <Text textAlign={"left"}>
            Please Remember this - <b>{resolvedModal.password}</b>
          </Text>
          <Stack direction="row" mt={4}>
            <Badge
              colorScheme="red"
              p={0.5}
              px={2}
              borderRadius={"8px"}
              fontSize={"12px"}
            >
              {resolvedModal.data?.usedPW?.length || 0} failed attempt
            </Badge>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => handleResolvedModal()}>
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
