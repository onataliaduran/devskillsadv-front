import { useEffect, useContext } from 'react';
import { MembersContext } from '../context/MembersContext';
import { API, Uri, setToken } from './../api';
import {
  Table as T,
  Thead,
  Tbody,
  Th,
  Tr,
  TableContainer,
  Box,
} from '@chakra-ui/react';
import Row from './Row';

const Table = () => {
  const { members, setMembers } = useContext(MembersContext) ?? {};

  useEffect(() => {
    API.post(Uri.Auth, {
      username: 'sarah',
      password: 'connor',
    })
      .then((res) => {
        setToken(res.data.token);
      })
      .then(() => {
        API.get(Uri.Members).then(function (res) {
          if (setMembers) setMembers(res.data);
        });
      });
  }, []);

  return (
    <Box boxShadow="xl" rounded="md" py="8" px="4">
      <TableContainer overflowX="scroll">
        <T size="sm">
          <Thead>
            <Tr>
              <Th fontSize="1rem">First Name</Th>
              <Th fontSize="1rem">Last Name</Th>
              <Th fontSize="1rem">Address</Th>
              <Th fontSize="1rem">SSN</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!!members?.length &&
              members.map((m) => <Row key={m.ssn} member={m} />)}
          </Tbody>
        </T>
      </TableContainer>
    </Box>
  );
};

export default Table;
