import { Box, Button, Spinner, Text, VStack } from '@chakra-ui/react';
import Logo from '../components/logo/Logo';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { apiRequest } from '../helpers/apiHelpers';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type IRegister = {
  name: string;
  lastName?: string;
  email: string;
  password: string;
  country?: string;
};

const Register = () => {
  // Redux loading state
  const { loading } = useAppSelector((state) => state.alerts);

  // hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    const { name, lastName, email, password, country } = data;

    try {
      dispatch(showLoading());
      const { data } = await apiRequest.post('/auth/create-user', {
        name,
        lastName,
        email,
        password,
        country,
      });
      dispatch(hideLoading());

      if (data.success) {
        toast.success('Registered successfully!');
        navigate('/login');
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Invalid form deails please try again');
      console.log('Errro', error);
    }
  };

  return (
    <Box
      mx={{ base: 1, md: 2, lg: 28, xl: 72 }}
      display={'flex'}
      flexDir={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      minH={'100vh'}
    >
      <Logo fontSize={24} />

      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={8}>
            <VStack
              align="flex-start"
              spacing={1}
              h={'60px'}
              w={{ base: '100%', md: '400px', xl: '512px' }}
            >
              <label>Firstname</label>
              <input
                style={{
                  width: '100%',
                  padding: '10px',
                }}
                {...register('name', { required: true })}
              />
              {errors.name && (
                <Text color={'red'} fontWeight={700}>
                  Name field is required
                </Text>
              )}
            </VStack>
            <VStack
              align="flex-start"
              spacing={1}
              h={'60px'}
              w={{ base: '100%', md: '400px', xl: '512px' }}
            >
              <label>Lastname</label>
              <input
                style={{
                  width: '100%',
                  padding: '10px',
                }}
                {...register('lastName')}
              />
            </VStack>

            <VStack
              align="flex-start"
              spacing={1}
              h={'60px'}
              w={{ base: '100%', md: '400px', xl: '512px' }}
            >
              <label>Email</label>
              <input
                style={{
                  width: '100%',
                  padding: '10px',
                }}
                {...register('email', { required: true })}
              />
              {errors.email && (
                <Text color={'red'} fontWeight={700}>
                  Email is required
                </Text>
              )}
            </VStack>
            <VStack
              align="flex-start"
              spacing={1}
              h={'60px'}
              w={{ base: '100%', md: '400px', xl: '512px' }}
            >
              <label>Password</label>
              <input
                style={{
                  width: '100%',
                  padding: '10px',
                }}
                {...register('password', { required: true, minLength: 6 })}
              />
              {errors?.password?.type === 'minLength' && (
                <Text color={'red'} fontWeight={700}>
                  The length of the password must be more than 6
                </Text>
              )}
              {errors?.password?.type === 'required' && (
                <Text color={'red'} fontWeight={700}>
                  Password is required
                </Text>
              )}
            </VStack>
            <VStack
              align="flex-start"
              spacing={1}
              h={'60px'}
              w={{ base: '100%', md: '400px', xl: '512px' }}
            >
              <label>Country</label>
              <input
                style={{
                  width: '100%',
                  padding: '10px',
                }}
                {...register('country')}
              />
            </VStack>
            <VStack
              spacing={1}
              h={'60px'}
              w={{ base: '100%', md: '400px', xl: '512px' }}
            >
              <Button
                bg="brand.900"
                color={'brand.600'}
                px={10}
                py={5}
                _hover={{
                  bg: 'brand.600',
                  color: 'brand.900',
                  border: '2px dashed ',
                  borderColor: 'brand.900',
                }}
                type="submit"
                isLoading={loading}
              >
                Register
              </Button>
            </VStack>
          </VStack>
        </form>
      )}
    </Box>
  );
};

export default Register;
