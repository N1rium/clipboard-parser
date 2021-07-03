import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Wrapper,
  Info,
  Window,
  WindowHeader,
  WindowFooter,
  WindowContentWrapper,
  Tab,
  Toast,
  Toolbar,
  Version,
} from '@/styles/pages/home';
import { copyToClipboard } from '@/utils/clipboard';

export default function App() {
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [htmlConfig, setHtmlConfig] = useState({
    preview: false,
  });

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

      setHtmlConfig({ preview: false });
      setData(data_by_type);
    });
  }, []);

  return (
    <div id="main-content">
      <Head>
        <title>Clipboard parser</title>
        <meta name="google-site-verification" content="JGEGEMBfrzav1YzNA5WE5ILEG4puFIHFl07O9UmstZI" />
        <meta
          name="description"
          content="Inspect the contents of your clipboard. Simply paste and explore whatever you've copied!"
        />
      </Head>
      <Wrapper>
        <div>
          <Info>
            <h1>Clipboard parser</h1>
            <p>Paste (Ctrl+V, ⌘V) anywhere!</p>
          </Info>
          {data && (
            <div>
              <WindowHeader>
                {data.map((content, i) => (
                  <Tab key={i} active={i === index} onClick={() => setIndex(i)}>
                    {content.type}
                  </Tab>
                ))}
              </WindowHeader>
              <Window>
                <WindowContentWrapper>
                  {data[index].type === 'text/html' && htmlConfig.preview === true ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data[index].data,
                      }}
                    />
                  ) : (
                    data[index].data
                  )}
                </WindowContentWrapper>
                <WindowFooter>
                  <div>
                    {data[index].type === 'text/html' && (
                      <Toolbar>
                        <h6>Preview</h6>
                        <input
                          type="checkbox"
                          value={htmlConfig.preview}
                          onChange={() => setHtmlConfig({ ...htmlConfig, preview: !htmlConfig.preview })}
                        />
                      </Toolbar>
                    )}
                  </div>
                  <div>
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
                  </div>
                </WindowFooter>
              </Window>
            </div>
          )}
        </div>
      </Wrapper>
      <Toast active={showToast}>Copied to clipboard!</Toast>
      <Version>v0.1</Version>
    </div>
  );
}
