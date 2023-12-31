import { Box } from '@chakra-ui/react';
import DashboardNav from '../components/dashboard/navbar/Navbar';

const Dashboard = () => {
  return (
    <Box
      mx={{ base: 1, md: 2, lg: 28, xl: 72 }}
      display={'flex'}
      flexDir={'column'}
      minH={'100vh'}
    >
      <DashboardNav />
    </Box>
  );
};

export default Dashboard;
