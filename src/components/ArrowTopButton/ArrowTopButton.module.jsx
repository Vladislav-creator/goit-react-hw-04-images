 import styled from '@emotion/styled';

 export const ArrowTopButton = styled.button`
     position: fixed;
     bottom: 30px;
     right: 6px;
     height: 40px;
     width: 40px;
     font-size: 30px;
     color: white;
     border-radius: 50%;
     cursor: pointer;
     
     background: linear-gradient(180deg, #00cfff 0%, #3ed598 100%);
     box-shadow: 0px 2px 4px rgba(15, 218, 137, 0.3);
     
     transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1);

    :hover,
    :focus {
     background: #286053;
   `;
