import styled from "styled-components";

export const HomeContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 16px;
`;

export const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const ProductCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  border-radius: 16px;
  cursor: pointer;
  margin: 8px;
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;
