import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import NavbarDesktop from '../components/home/navbar/NavbarDesktop';
import ButtonComponent from '../components/shared/Button';

const HomePage = () => {
  return (
    <Box maxW="100vw" minH={'100vh'} mx={{ base: 1, md: 2, lg: 28, xl: 72 }}>
      <NavbarDesktop />
      <HStack justify={'center'} h="90vh" spacing={56} px={28} align={'center'}>
        <Text
          color={'brand.900'}
          fontWeight={'700'}
          fontSize={60}
          letterSpacing={'0.01px'}
          lineHeight={'70px'}
        >
          Search and get the job of your dreams *
        </Text>
        <VStack minW={'40%'} alignItems={'flex-start'}>
          <Text fontSize={20}>
            Oportunist is a job search service provider in which there are more
            than 1000 job vacancies. You can be what you want.
          </Text>
          <HStack h={'80px'} spacing={16}>
            <ButtonComponent label="Get Started" />
            <Text cursor={'pointer'} borderBottom={'3px solid black'}>
              How It Works
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default HomePage;
