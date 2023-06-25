import { Flex, Button, HStack, chakra } from '@chakra-ui/react';
import Logo from '../../logo/Logo';
import { Link } from 'react-router-dom';
import ButtonComponent from '../../shared/Button';

export type INavDataTypes = {
  label: string;
  href: string;
};

const CTA = 'Register';
export const navbarData: INavDataTypes[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Features',
    href: '/features',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
  {
    label: 'About',
    href: '/about',
  },
];
export default function NavbarDesktop() {
  return (
    <chakra.header id="header">
      <Flex w="100%" px="6" py="5" align="center" justify="space-between">
        {/* // Logo */}
        <Logo fontSize={24} />
        {/* // Nav Items */}
        <HStack as="nav" spacing="5">
          {navbarData.map((item: INavDataTypes, i) => (
            <Link to={item.href} key={i}>
              <Button variant="nav"> {item.label} </Button>
            </Link>
          ))}
        </HStack>
        {/* // Call to action items */}
        <HStack>
          <ButtonComponent href="/register" label={CTA} />
        </HStack>
      </Flex>
    </chakra.header>
  );
}
