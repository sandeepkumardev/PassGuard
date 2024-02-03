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
import { useDeleteDomainMutation } from "../../api";
import { useStore } from "../../store";

const ConfirmDelete = () => {
  const { state, dispatch } = useStore();
  const [deleteDomainGQL] = useDeleteDomainMutation();

  const closeModal = () => {
    dispatch({ type: "HANDLE_DELETE_MODAL", payload: { isOpen: false, data: null } });
  };

  const handleDelete = async () => {
    try {
      const response = await deleteDomainGQL({
        variables: {
          deleteDomainId: `${state.actions.deleteModal.data?.id}`,
        },
      });

      if (response.data?.destroyDomain.affectedCount == 1) {
        dispatch({
          type: "DELETE_DOMAIN",
          payload: { id: `${state.actions.deleteModal.data?.id}` },
        });
        dispatch({
          type: "HANDLE_TOAST",
          payload: { isOpen: true, success: true, message: "Successfully deleted!" },
        });
      } else {
        dispatch({
          type: "HANDLE_TOAST",
          payload: { isOpen: true, success: false, message: "Something went wrong!" },
        });
      }
      closeModal();
    } catch (error) {
      console.log(error);
      dispatch({
        type: "HANDLE_TOAST",
        payload: { isOpen: true, success: false, message: "Something went wrong!" },
      });
    }
  };

  return (
    <Modal isOpen={state.actions.deleteModal.isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {state.actions.deleteModal.data?.password
            ? "Happy to assist you! 😊"
            : "It's not resolved yet! 🥺"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure to delete{" "}
          <Kbd mx={2} color={"purple"} fontSize={18}>
            {state.actions.deleteModal.data?.name}
          </Kbd>
          ?
          {state.actions.deleteModal.data?.password && (
            <Text textAlign={"left"}>
              Please Remember this - <b>{state.actions.deleteModal.data?.password}</b>
            </Text>
          )}
          <Stack direction="row" mt={4}>
            <Badge colorScheme="red" p={0.5} px={2} borderRadius={"8px"} fontSize={"12px"}>
              {state.actions.deleteModal.data?.usedPW?.length || 0} failed attempt
            </Badge>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => closeModal()}>
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
