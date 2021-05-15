import React from 'react';

type Props = {
  className?: string;
};

export const Eu: React.VFC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <defs>
        <g id="d">
          <g id="b">
            <path id="a" d="M0-1l-.3 1 .5.1z" />
            <use transform="scale(-1 1)" xlinkHref="#a" />
          </g>
          <g id="c">
            <use transform="rotate(72)" xlinkHref="#b" />
            <use transform="rotate(144)" xlinkHref="#b" />
          </g>
          <use transform="scale(-1 1)" xlinkHref="#c" />
        </g>
      </defs>
      <path fill="#039" d="M0 0h512v512H0z" />
      <g fill="#fc0" transform="translate(256 258.4) scale(25.28395)">
        <use width="100%" height="100%" y="-6" xlinkHref="#d" />
        <use width="100%" height="100%" y="6" xlinkHref="#d" />
        <g id="e">
          <use width="100%" height="100%" x="-6" xlinkHref="#d" />
          <use
            width="100%"
            height="100%"
            transform="rotate(-144 -2.3 -2.1)"
            xlinkHref="#d"
          />
          <use
            width="100%"
            height="100%"
            transform="rotate(144 -2.1 -2.3)"
            xlinkHref="#d"
          />
          <use
            width="100%"
            height="100%"
            transform="rotate(72 -4.7 -2)"
            xlinkHref="#d"
          />
          <use
            width="100%"
            height="100%"
            transform="rotate(72 -5 .5)"
            xlinkHref="#d"
          />
        </g>
        <use
          width="100%"
          height="100%"
          transform="scale(-1 1)"
          xlinkHref="#e"
        />
      </g>
    </svg>
  );
};
