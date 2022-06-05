import './App.css';
import { Container, Grid, GridItem } from '@chakra-ui/react';
import Table from './table/Table';
import Form from './form/Form';

function App() {
  return (
    <Container maxW="100vw">
      <Container maxW="90vw">
        <Grid gridTemplateColumns={'40vw 1fr'} gap={1}>
          <GridItem p="3rem">
            <Form />
          </GridItem>
          <GridItem pt="3rem">
            <Table />
          </GridItem>
        </Grid>
      </Container>
    </Container>
  );
}

export default App;
