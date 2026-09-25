export default function AnimatedText({ text, className }) {
  if (!text) return null;
  const words = text.split(' ');
  
  let globalIndex = 0;

  return (
    <span className={`animated-text ${className || ''}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, index) => {
            const currentIndex = globalIndex++;
            return (
              <span 
                key={index} 
                className="char"
                style={{ '--char-index': currentIndex }}
              >
                {char}
              </span>
            );
          })}
        </span>
      )).reduce((prev, curr) => [prev, ' ', curr])}
    </span>
  );
}
