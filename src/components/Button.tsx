import React from 'react';

/**
 * Props for the reusable gradient pill button.
 */
interface ButtonProps {
  /** Optional URL – renders an <a> element when provided. */
  href?: string;
  /** Click handler for button or link. */
  onClick?: () => void;
  /** Button label or children elements. */
  children: React.ReactNode;
  /** Additional CSS classes to merge with the base button style. */
  className?: string;
}

/**
 * Gradient‑styled pill button used throughout the app.
 *
 * - Renders an anchor (`<a>`) when `href` is supplied, opening the link in a new tab.
 * - Otherwise renders a native `<button>` element.
 * - Merges any custom `className` with the base `.button` utility defined in `theme.css`.
 */
export const Button: React.FC<ButtonProps> = ({ href, onClick, children, className = '' }) => {
  const baseClass = 'button';
  const combined = `${baseClass} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={combined} onClick={onClick} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={combined} onClick={onClick}>
      {children}
    </button>
  );
};
