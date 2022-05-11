import styled from 'styled-components';

import { VIOLET, AZURE_BLUE, RED } from 'styles/constants';
import { rgba } from 'styles/helpers/rgba';
import logo from 'assets/svg/logo.svg';

export const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  background-color: ${rgba(VIOLET, 0.1)};
  min-height: calc(100vh - 60px);
  gap: 15px;
`;

export const Logo = styled.div`
  width: 170px;
  height: 140px;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-size: contain;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 0px 19px 2px ${rgba(AZURE_BLUE, 0.4)};
  border-radius: 10px;
  padding: 20px 40px;
  max-width: 400px;
  width: 100%;
  gap: 30px;
`;

export const StyledInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 400px;
  width: 100%;
`;

export const StyledError = styled.p`
  color: ${RED};
  margin: 5px 0 0 0;
`;

export const LoginError = styled.div`
  height: 10px;
`;
