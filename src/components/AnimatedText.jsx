export default function AnimatedText({ text, className }) {
  if (!text) return null;
  const words = text.split(' ');

  return (
    <span className={`animated-text ${className || ''}`} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, index) => (
            <span key={index} className="char">
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
