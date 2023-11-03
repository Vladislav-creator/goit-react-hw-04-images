import styled from '@emotion/styled';

export const AppContent = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;
export const Title = styled.h2`
 color: red;
 font-style: italic;
 text-shadow: #f2f3f4 2px 5px;
 animation-duration: 3s;
  animation-name: slidein;
 
  @keyframes slidein {
    from {
      margin-left: 100%;
      width: 300%;
    }
    to {
      margin-left: 0%;
      width: 100%;
    }
`;