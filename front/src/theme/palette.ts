import { PaletteOptions } from '@material-ui/core/styles/createPalette'
const white = '#fff'

const palette: PaletteOptions = {
  common: {
    white,
    black: '#000'
  },
  primary: {
    contrastText: white,
    light: '#7986cb',
    main: '#3f51b5',
    dark: '#303f9f'
  },
  secondary: {
    contrastText: white,
    light: '#ff4081',
    main: '#f50057',
    dark: '#c51162'
  },
  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
    contrastText: white
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)'
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  background: {
    paper: '#fff',
    default: '#fafafa'
  },
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(0, 0, 0, 0.14)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)'
  }
}

export default palette
