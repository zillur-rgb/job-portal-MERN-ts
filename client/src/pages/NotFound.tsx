import { VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <VStack minH="100vh" justify={'center'}>
      <h1>Page Not Found</h1>
      <Link className="btn btn-success" to="/">
        Go Back
      </Link>
    </VStack>
  );
};

export default NotFound;
