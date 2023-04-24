import styled from "styled-components";
import { NavLink as NavLinks } from "react-router-dom";

export const SidebarWrapper = styled.div`
  width: 270px;
  height: auto;
  display: flex;
  flex-shrink: 0;
  background-color: #ffffff;
  flex-direction: column;

  @media only screen and (max-width: 767px) {
    /* width: "calc(100% - 65px)"; */
    width: auto;
    padding: 0;
    height: 100%;
  }
`;

export const MenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow-y: auto;

  @media only screen and (max-width: 767px) {
    padding: 20px 0;
    /* alignItems: 'flex-start'; */
  }
`;

export const NavLink = styled(NavLinks)`
  width: calc(100% - 30px);
  outline: 0;
  color: black;
  display: flex;
  align-items: center;
  padding: 20px 55px 20px 30px;
  text-decoration: none;
  transition: 0.15s ease-in-out;

  @media only screen and (max-width: 767px) {
    width: 100%;
    padding: 20px 35px;
  }

  &.active {
    color: black;
    background-color: blue;
    border-radius: 50px 0 0 50px;
  }
`;

export const Svg = styled.span`
  width: 16px;
  margin-right: 15px;
  display: flex;
  align-items: center;
`;
export const LogoutBtn = styled.button`
  width: calc(100% - 30px);
  outline: 0;
  color: black;
  background-color: transparent;
  border: 0;
  display: flex;
  align-items: center;
  padding: 20px 55px 20px 30px;
  text-decoration: none;
  transition: 0.15s ease-in-out;
  margin-left: auto;
  margin-top: auto;
  margin-bottom: 25px;
  cursor: pointer;

  @media only screen and (max-width: 767px) {
    width: 100%;
    padding: 20px 35px;
  }
`;

export const LogoImage = styled.img`
  display: block;
  backface-visibility: hidden;
  max-width: 150px;
  max-height: 36px;
  z-index: 1000;
  top: 12px;
  position: absolute;
  left: 33px;
`;
