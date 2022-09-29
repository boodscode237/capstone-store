import styled from "styled-components";
import Button from "../button/button.component";

export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const FormContainer = styled.form`
  height: 120px;
  min-width: 500px;
`
export const PaymentButton = styled(Button)`
  margin-top: 15px;
  margin-left: auto;
  //margin-right: 5px;
`