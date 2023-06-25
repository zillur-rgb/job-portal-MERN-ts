import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ButtonComponent = ({ label, href }: { label: string; href?: string }) => {
  return (
    <Link to={href || '/'}>
      <Button
        bg="brand.900"
        color={'brand.600'}
        px={10}
        py={5}
        _hover={{
          bg: 'brand.600',
          color: 'brand.900',
          outline: '2px dashed ',
          borderColor: 'brand.900',
        }}
      >
        {label}
      </Button>
    </Link>
  );
};

export default ButtonComponent;
