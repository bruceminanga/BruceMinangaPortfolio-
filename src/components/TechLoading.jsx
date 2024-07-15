import React, { useState, useEffect } from 'react';

const TechLoading = () => {
  const [text, setText] = useState('');
  const fullText = 'BruceMinanga@Fedora> systemctl start portfolio.sh\n Loading modules...\n Optimizing performance...\n portfolio successfully started...';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText((prevText) => {
        if (index < fullText.length) {
          index++;
          return fullText.slice(0, index);
        }
        clearInterval(timer);
        return prevText;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-full max-w-2xl p-4 font-mono text-green-400 bg-black border-2 border-green-400 rounded-md">
        <pre className="whitespace-pre-wrap">{text}</pre>
        <span className="inline-block w-2 h-5 ml-1 bg-green-400 animate-blink"></span>
      </div>
    </div>
  );
};

export default TechLoading;