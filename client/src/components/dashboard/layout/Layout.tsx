import { Box } from '@chakra-ui/react';
import DashboardNav from '../navbar/Navbar';

const Layout = ({ children }: any) => {
  return (
    <Box
      mx={{ base: 1, md: 2, lg: 28, xl: 72 }}
      display={'flex'}
      flexDir={'column'}
      minH={'100vh'}
      py={10}
    >
      <DashboardNav />
      {children}
    </Box>
  );
};

export default Layout;
