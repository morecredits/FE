import styled, { keyframes } from "styled-components";

const shadow = keyframes`
  0%{
        transform: scaleX(1.5);
    }
    40%{
        transform: scaleX(1);
        opacity: .7;
    }
    100%{
        transform: scaleX(.2);
        opacity: .4;
    }
`;
const circle = keyframes`
 0%{
        top:60px;
        height:5px;
        border-radius: 50px 50px 25px 25px;
        transform: scaleX(1.7);
    }
    40%{
        height:20px;
        border-radius: 50%;
        transform: scaleX(1);
    }
    100%{
        top:0%;
    }
`;

export const Wrapper = styled.div`
  width: 200px;
  height: 60px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export const Circle = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  border-radius: 50%;
  background-color: #1849b1;
  left: 15%;
  transform-origin: 50%;
  animation: ${circle} 0.5s alternate infinite ease;
  &:nth-child(2) {
    left: 45%;
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    left: auto;
    right: 15%;
    animation-delay: 0.3s;
  }
`;
export const Shadow = styled.div`
  width: 20px;
  height: 4px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 62px;
  transform-origin: 50%;
  z-index: -1;
  left: 15%;
  filter: blur(1px);
  animation: ${shadow} 0.5s alternate infinite ease;
  &:nth-child(4) {
    left: 45%;
    animation-delay: 0.2s;
  }
  &:nth-child(5) {
    left: auto;
    right: 15%;
    animation-delay: 0.3s;
  }
`;
export const Span = styled.span`
  position: absolute;
  top: 75px;
  font-size: 20px;
  letter-spacing: 12px;
  color: #1849b1;
  left: 15%;
`;

export const LoaderContainer = styled.div`
  div {
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
`;

export const LoaderWrapper = styled.div`
  border-radius: 50%;
  width: 70px;
  height: 70px;
  text-align: center;
  position: absolute;
  z-index: 99;
  left: 0;
  right: 0;
  margin: 0 auto;
  // top: 50%;
  top: 100px;
  transform: translateY(-50%);
`;
export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
`;

const skBounce = keyframes`
0% {
  transform: scale(0.0);
}
50% {
  transform: scale(1.0);
}
100% {
  transform: scale(0.0);
}
`;

export const Bounce1 = styled.div`
  background-color: #1849b1;

  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  animation: ${skBounce} 2s infinite ease-in-out;
`;
export const Bounce2 = styled.div`
  background-color: #1849b1;

  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation-delay: -1s;
  animation: ${skBounce} 2s infinite ease-in-out;
`;
