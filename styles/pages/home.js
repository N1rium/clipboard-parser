import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Info = styled.div`
  text-align: center;
  h1 {
    &:before {
      content: '<';
    }
    &:after {
      content: '/>';
    }
  }
`;

export const Window = styled.div`
  resize: both;
  width: 640px;
  height: 480px;
  background: var(--bg-2);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: auto;
`;

export const WindowHeader = styled.header`
  display: flex;
  align-items: center;
  border-bottom: 4px solid var(--bg-3);
`;

export const Tab = styled.div`
  padding: 0.5em 1em;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  font-size: 0.8em;
  cursor: pointer;
  background: var(--bg-2);
  transition: all 0.225s ease-in-out;
  user-select: none;

  ${(props) =>
    props.active &&
    css`
      background: var(--bg-3);
      color: #fff;
    `};

  &:hover {
    background: var(--bg-3);
  }

  &:not(:first-child) {
    margin-left: 0.25em;
  }
`;

export const WindowContentWrapper = styled.div`
  padding: 1em;
  width: 100%;
  height: 100%;
  font-size: 0.8em;

  flex: 1 1 auto;
  overflow: auto;
`;

export const WindowFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 1em;
  background: var(--bg-3);
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.25);
  font-weight: bold;

  i {
    color: #fff;
    cursor: pointer;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled.div`
  padding: 0.5em;
  font-size: 0.8em;
  outline: 0;
  border: 0;
  cursor: pointer;
  color: #fff;
  position: relative;
  &:hover {
    text-decoration: underline;
  }
`;

export const Toast = styled.div`
  position: fixed;
  bottom: 2em;
  right: 2em;
  padding: 1em;
  opacity: 0;
  transition: all 0.225s ease-in-out;
  background: var(--bg-3);
  font-size: 0.8em;
  font-weight: bold;
  color: #fff;
  transform: translateY(100%);
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
  z-index: 10;

  ${(props) =>
    props.active &&
    css`
      opacity: 1;
      transform: translateY(0%);
    `}
`;

export const Version = styled.div`
  position: fixed;
  bottom: 2em;
  right: 2em;
  color: var(--secondary-text-color);
  font-size: 0.8em;
  font-weight: bold;
`;
