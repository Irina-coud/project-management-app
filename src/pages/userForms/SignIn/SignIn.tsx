import { Typography, TextField, Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import {
  ButtonGoBack,
  BackendError,
  Logo,
  StyledBox,
  StyledError,
  StyledForm,
} from '../userForms.styled';
import { useSignIn } from '../useMakeInput';
import { useAppDispatch, useAppSelector } from 'store/reducers/user/hooks';
import { saveUserData, loginUser, setPassword } from 'store/reducers/user/userSlice';
import { getUserDataFromToken } from 'helpers/getUserDataFromToken';
import { getLoginToken } from 'helpers/getLoginToken';

type Inputs = {
  login: string;
  loginRequired: string;
  password: string;
  passwordRequired: string;
};

export function SignIn() {
  const { isAuthorized, errorMessage } = useAppSelector((store) => store.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = getLoginToken();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const { inputs } = useSignIn(register);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await dispatch(loginUser(data));

    // const token = getLoginToken();
    // const { userId } = getUserDataFromToken(token);

    // dispatch(setPassword(data.password));
    // dispatch(saveUserData(userId));

    if (!errorMessage) {
      reset();
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  const { t } = useTranslation();

  return (
    <StyledBox>
      <ButtonGoBack variant="contained" onClick={() => navigate(-1)}>
        <ArrowBackIosIcon /> {t('Back')}
      </ButtonGoBack>
      <Logo />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography>{t('Welcome back to TLZ!')}</Typography>
        {inputs.map((input) => (
          <TextField
            key={input.id}
            label={input.label}
            type={input.type}
            {...input.register}
            autoComplete="off"
            fullWidth
          />
        ))}

        <BackendError>
          <StyledError>{errorMessage}</StyledError>
        </BackendError>

        <Button variant="outlined" type="submit">
          {t('I am back!')}
        </Button>
      </StyledForm>
    </StyledBox>
  );
}
