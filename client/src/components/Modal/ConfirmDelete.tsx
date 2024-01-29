import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
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
import { useDeleteDomainMutation } from "../../api";
import { useStore } from "../../context";

const ConfirmDelete = () => {
  const { deleteModal, handleDeleteModal, handleToast } = useActions();
  const { deleteDomain } = useStore();
  const [deleteDomainGQL] = useDeleteDomainMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteDomainGQL({
        variables: {
          deleteDomainId: `${deleteModal.data?.id}`,
        },
      });

      if (response.data?.destroyDomain.affectedCount == 1) {
        deleteDomain(`${deleteModal.data?.id}`);
        handleToast(true, true, "Successfully deleted!");
      } else {
        handleToast(true, false, "Something went wrong!");
      }

      handleDeleteModal();
    } catch (error) {
      console.log(error);
      handleToast(true, false, "Something went wrong!");
    }
  };

  return (
    <Modal isOpen={deleteModal.status} onClose={handleDeleteModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {deleteModal.data?.password
            ? "Happy to assist you! 😊"
            : "It's not resolved yet! 🥺"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure to delete{" "}
          <Kbd mx={2} color={"purple"} fontSize={18}>
            {deleteModal.data?.name}
          </Kbd>
          ?
          {deleteModal.data?.password && (
            <Text textAlign={"left"}>
              Please Remember this - <b>{deleteModal.data?.password}</b>
            </Text>
          )}
          <Stack direction="row" mt={4}>
            <Badge
              colorScheme="red"
              p={0.5}
              px={2}
              borderRadius={"8px"}
              fontSize={"12px"}
            >
              {deleteModal.data?.usedPW?.length || 0} failed attempt
            </Badge>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => handleDeleteModal()}>
            Close
          </Button>
          <Button colorScheme="pink" onClick={handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDelete;
