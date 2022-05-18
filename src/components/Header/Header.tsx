import { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { WrapperHeader, ContentHeader, Logo, WrapperButtons, StyledButton } from './Header.styled';
import { LanguageToggler } from './LanguageToggler/LanguageToggler';
import { ModalAddBoard } from './ModalAddBoard/ModalAddBoard';
import { getLoginToken } from 'helpers/getLoginToken';
import { useAppDispatch } from 'store/reducers/user/hooks';
import { setUnauthorized } from 'store/reducers/user/userSlice';

export const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const toggleClass = () => {
      window.pageYOffset > 0 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener('scroll', toggleClass);
  }, []);

  const openModalAddBoard = () => {
    setOpenModal(true);
  };

  const toSignOut = () => {
    const token = getLoginToken();
    document.cookie = `user=${token};max-age=0;samesite=lax;path=/`;
    dispatch(setUnauthorized());
    navigate(`/welcome`);
  };

  const toEditProfile = () => {
    navigate(`/edit-profile`);
  };

  const { t } = useTranslation();
  const addText = t('Add new board');
  const editText = t('Edit profile');
  const outText = t('Sign out');

  const buttons = [
    { id: 1, text: addText, icon: <AddCircleIcon />, onClick: openModalAddBoard },
    { id: 2, text: editText, icon: <EditIcon />, onClick: toEditProfile },
    { id: 3, text: outText, icon: <LogoutIcon />, onClick: toSignOut },
  ];

  return (
    <>
      <WrapperHeader className={isActive ? 'active' : ''}>
        <ContentHeader>
          <Logo />
          <WrapperButtons>
            {buttons.map((button) => {
              return (
                <StyledButton
                  key={button.id}
                  variant="contained"
                  color="primary"
                  startIcon={button.icon}
                  onClick={button.onClick}
                >
                  {button.text}
                </StyledButton>
              );
            })}
            <LanguageToggler />
          </WrapperButtons>
        </ContentHeader>
      </WrapperHeader>
      <ModalAddBoard openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};
