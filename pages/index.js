import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Head from 'next/head';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled.div`
  text-align: center;
`;

const Window = styled.div`
  resize: both;
  width: 640px;
  height: 480px;
  background: var(--bg-2);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  header {
    padding: 1em;
    background: var(--bg-3);
  }

  & > div {
    flex: 1 1 auto;
    overflow: auto;
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0.5em;
    background: var(--bg-3);
    box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.25);
    font-weight: bold;
  }
`;

const Button = styled.div`
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

const Toast = styled.div`
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

export default function App() {
  const [data, setData] = useState('');
  const [bg, setBg] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const copyToClipboard = () => {
    var textArea = document.createElement('textarea');
    textArea.value = data.data;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
    } catch (err) {}

    document.body.removeChild(textArea);
  };

  const _setBg = (val) => {
    if (val) {
      setData((d) => ({ ...d, data: d.data.replace('_background-color', 'background-color') }));
    } else {
      setData((d) => ({ ...d, data: d.data.replace('background-color', '_background-color') }));
    }
    setBg(val);
  };

  useEffect(() => {
    document.addEventListener('paste', (e) => {
      var data_transfer = e.clipboardData;
      var data_by_type = Array.from(data_transfer.types).map((type) => {
        var data = data_transfer.getData(type);
        return {
          type: type,
          data: data,
        };
      });

      var content = data_by_type.find(function (d) {
        return d.type == 'text/html';
      });
      setData(content);
    });
  }, []);

  return (
    <div id="main-content">
      <Head>
        <title>Clipboard parser</title>
      </Head>
      <Wrapper>
        <div>
          <Info>
            <h1>
              {'<'}Clipboard parser{'/>'}
            </h1>
            <p>Paste (Ctrl+V, ⌘V) anywhere!</p>
          </Info>
          <Window>
            {/* <header></header> */}
            <div
              dangerouslySetInnerHTML={{
                __html: data.data,
              }}
            />
            <footer>
              <Button onClick={() => _setBg(!bg)}>Background {bg === true ? 'enabled' : 'disabled'}</Button>
              <Button
                onClick={() => {
                  copyToClipboard();
                  setShowToast(true);
                  setTimeout(() => {
                    setShowToast(false);
                  }, 2500);
                }}
              >
                Copy to clipboard
              </Button>
            </footer>
          </Window>
        </div>
      </Wrapper>
      <Toast active={showToast}>Copied to clipboard!</Toast>
    </div>
  );
}
