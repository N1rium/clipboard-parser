import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Wrapper,
  Info,
  WindowWrapper,
  Window,
  WindowHeader,
  WindowFooter,
  WindowContentWrapper,
  WindowContent,
  Tab,
  Toast,
} from '@/styles/pages/home';
import { copyToClipboard } from '@/utils/clipboard';

export default function App() {
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    document.addEventListener('paste', (e) => {
      setIndex(0);
      const data_transfer = e.clipboardData;
      const data_by_type = Array.from(data_transfer.types).map((type) => {
        const data = data_transfer.getData(type);
        return {
          type: type,
          data: data,
        };
      });

      setData(data_by_type);
    });
  }, []);

  return (
    <div id="main-content">
      <Head>
        <title>Clipboard parser</title>
        <meta
          name="description"
          content="Inspect the contents of your clipboard. Simply paste and explore whatever you've copied!"
        />
      </Head>
      <Wrapper>
        <div>
          <Info>
            <h1>
              {'<'}Clipboard parser{'/>'}
            </h1>
            <p>Paste (Ctrl+V, ⌘V) anywhere!</p>
          </Info>
          <WindowWrapper>
            <WindowHeader>
              {data &&
                data.map((content, i) => (
                  <Tab key={i} active={i === index} onClick={() => setIndex(i)}>
                    {content.type}
                  </Tab>
                ))}
            </WindowHeader>
            <Window>
              <WindowContentWrapper>
                {/* {data && (
                  <WindowContent
                    dangerouslySetInnerHTML={{
                      __html: data[index].data,
                    }}
                  />
                )} */}
                {data && data[index].data}
              </WindowContentWrapper>
              <WindowFooter>
                <i
                  aria-hidden
                  className="fas fa-copy"
                  onClick={() => {
                    copyToClipboard(data[index].data);
                    setShowToast(true);
                    setTimeout(() => {
                      setShowToast(false);
                    }, 2500);
                  }}
                ></i>
              </WindowFooter>
            </Window>
          </WindowWrapper>
        </div>
      </Wrapper>
      <Toast active={showToast}>Copied to clipboard!</Toast>
    </div>
  );
}
