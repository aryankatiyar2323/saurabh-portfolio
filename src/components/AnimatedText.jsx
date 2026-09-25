export default function AnimatedText({ text, className }) {
  if (!text) return null;
  const words = text.split(' ');
  
  let globalIndex = 0;

  return (
    <span className={`animated-text ${className || ''}`} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }}>
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
      ))}
    </span>
  );
}
