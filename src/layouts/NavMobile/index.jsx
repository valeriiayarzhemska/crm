import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import cn from 'classnames';
import { Home, Menu } from 'lucide-react';

import { ButtonTemplate } from '../../components/ui/buttons/ButtonTemplate';
import { IconButtonTemplate } from '../../components/ui/buttons/IconButtonTemplate';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../redux/features/user/userSelectors';

import { colors } from '../../data/constants';

export const NavMobile = ({ toggleSidebar }) => {
  const [isUserAuthorised, setIsUserAuthorised] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const userToken = useSelector(selectUserToken);

  const navRef = useRef(null);
  const navHeight = navRef.current ? navRef.current.clientHeight : 0;
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible =
        prevScrollPos > currentScrollPos || currentScrollPos < navHeight;
      setIsNavVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, navHeight]);

  const handleClick = link => {
    navigate(link);
  };

  useEffect(() => {
    if (userToken) {
      setIsUserAuthorised(true);
    } else {
      setIsUserAuthorised(false);
    }
  }, [userToken]);

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed flex z-[9] justify-between top-0 left-0 right-0 px-2 py-2.5 w-full bg-gray-100 md:hidden transition-transform duration-300 ease-in-out',
        { 'transform translate-y-0': isNavVisible },
        { 'transform -translate-y-full': !isNavVisible }
      )}
    >
      <div className="flex gap-2 items-center">
        {isUserAuthorised && (
          <>
            <IconButtonTemplate
              icon={Home}
              size={20}
              color={colors.grayColor}
              handleClick={() => handleClick('/')}
            />

            <ButtonTemplate
              text={'Clients'}
              handleClick={() => handleClick('/clients')}
            />
          </>
        )}
      </div>

      <IconButtonTemplate
        icon={Menu}
        handleClick={toggleSidebar}
      />
    </nav>
  );
};
