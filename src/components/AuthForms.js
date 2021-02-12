import styled from 'styled-components';

const Card = styled.div`
  box-sizing: border-box;
  max-width: 410px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #999;
  margin-bottom: 1rem;
  font-size: 0.8rem;
`;

const Button = styled.button`
  background: linear-gradient(to bottom, #6371c7, #5563c1);
  border-color: #3f4eae;
  border-radius: 3px;
  padding: 1rem;
  color: white;
  font-weight: 700;
  width: 30%;
  margin-bottom: 1rem;
  font-size: 0.8rem;
`;

const SmallButton = styled.button`
  background: #aa4455;
  border-radius: 3px;
  padding: 0.5rem;
  color: white;
  font-weight: 400;
  width: 30%;
  max-width: 80px;
  margin-bottom: 1rem;
  font-size: 0.8rem;
`;

const Error = styled.div`
  background-color: red;
`;

export { SmallButton, Form, Input, Button, Card, Error };