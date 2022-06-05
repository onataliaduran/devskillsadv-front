import { Tr, Td } from '@chakra-ui/react';
import { Member } from '../common/types';

const Row = (props: { member: Member }) => {
  const { firstName, lastName, address, ssn } = props.member;

  return (
    <Tr>
      <Td>{firstName}</Td>
      <Td>{lastName}</Td>
      <Td>{address}</Td>
      <Td>{ssn}</Td>
    </Tr>
  );
};

export default Row;
