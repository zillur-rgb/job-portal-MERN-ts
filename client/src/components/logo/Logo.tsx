import { Box, Text } from '@chakra-ui/react';

const Logo = ({ fontSize }: { fontSize: number }) => {
  return (
    <Text fontSize={fontSize} fontWeight={600} color={'brand.900'}>
      Oportun
      <Box as="span" color="brand.800">
        ist
      </Box>
    </Text>
  );
};

export default Logo;
