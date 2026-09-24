export default function AnimatedText({ text, className }) {
  if (!text) return null;
  return (
    <span className={`animated-text ${className || ''}`}>
      {text.split('').map((char, index) => (
        <span key={index} className="char">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
