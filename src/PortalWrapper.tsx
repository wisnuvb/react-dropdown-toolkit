import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface PortalWrapperProps {
  portal: boolean;
  children: React.ReactNode;
}

const PortalWrapper: React.FC<PortalWrapperProps> = ({ portal, children }) => {
  const el = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (portal) {
      el.current = document.createElement('div');
      document.body.appendChild(el.current);
      return () => {
        if (el.current) {
          document.body.removeChild(el.current);
        }
      };
    }
  }, [portal]);

  return portal ? el.current ? ReactDOM.createPortal(children, el.current) : null : <>{children}</>;
};

export default PortalWrapper;
