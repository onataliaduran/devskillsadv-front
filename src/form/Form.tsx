import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import {
  Input,
  FormControl,
  FormLabel,
  Button,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react';
import { API, Uri } from '../api';
import { MembersContext } from '../context/MembersContext';
import { Member } from '../common/types';

const regex = /^\d{3}-\d{2}-\d{4}$/;
const initialFormState: Member = {
  firstName: '',
  lastName: '',
  address: '',
  ssn: '',
};

const Form = () => {
  const { members, setMembers } = useContext(MembersContext) ?? {};
  const [formData, setFormData] = useState(initialFormState);
  const [enableSend, setEnableSend] = useState(false);
  const toast = useToast();

  const validString = (str: string) => str !== '' && str.trim().length > 1;
  const validationsHandler = (data: Member) => {
    if (
      !validString(data.firstName) ||
      !validString(data.lastName) ||
      !validString(data.address)
    ) {
      setEnableSend(false);
      return;
    }

    if (regex.test(data.ssn) === false) {
      setEnableSend(false);
      return;
    }

    setEnableSend(true);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    validationsHandler({ ...formData, [name]: value });
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    API.post(Uri.Members, { ...formData })
      .then((res) => {
        if (members && setMembers) setMembers([...members, res.data]);
      })
      .catch((err) => {
        toast({
          title: err.response.data.message,
          status: 'error',
          position: 'top',
          isClosable: true,
        });
      });
  };

  const onResetHandler = () => {
    setFormData({ ...initialFormState });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      {/* FIRST NAME */}
      <FormControl>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          size="sm"
          borderRadius="0.4rem"
          value={formData.firstName}
          onChange={(event) => onChangeHandler(event)}
        />
      </FormControl>

      {/* LAST NAME */}
      <FormControl>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          size="sm"
          borderRadius="0.4rem"
          value={formData.lastName}
          onChange={(event) => onChangeHandler(event)}
        />
      </FormControl>

      {/* ADDRESS */}
      <FormControl>
        <FormLabel htmlFor="address">Address</FormLabel>
        <Input
          id="address"
          name="address"
          type="text"
          size="sm"
          borderRadius="0.4rem"
          value={formData.address}
          onChange={(event) => onChangeHandler(event)}
        />
      </FormControl>

      {/* SSN */}
      <FormControl>
        <FormLabel htmlFor="ssn">SSN</FormLabel>
        <Input
          id="ssn"
          name="ssn"
          type="text"
          size="sm"
          borderRadius="0.4rem"
          value={formData.ssn}
          onChange={(event) => onChangeHandler(event)}
        />
      </FormControl>

      {/* ACTION BTNS */}
      <ButtonGroup colorScheme="teal" mt={4}>
        <Button variant="outline" onClick={onResetHandler}>
          Reset
        </Button>
        <Button variant="solid" type="submit" isDisabled={!enableSend}>
          Save
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default Form;
