import { Box, Text } from '@chakra-ui/react';

const Logo = () => {
  return (
    <Text
      fontSize={{ base: 16, md: 24, lg: 36, xl: 48 }}
      fontWeight={600}
      color={'brand.900'}
    >
      Oportun
      <Box as="span" color="brand.800">
        ist
      </Box>
    </Text>
  );
};

export default Logo;
