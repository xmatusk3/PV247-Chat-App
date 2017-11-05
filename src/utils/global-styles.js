import { injectGlobal } from 'styled-components';

injectGlobal`
  @font-face {
    font-family: 'Geektastic';
    src: url('../static/assets/fonts/geektastic.ttf');
  }

  body {
    margin: 0;
  }
`;