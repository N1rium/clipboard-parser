export const copyToClipboard = (content) => {
  let textArea = document.createElement('textarea');
  textArea.value = content;
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
