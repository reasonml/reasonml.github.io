import ReactDOM from 'react-dom/server'
import React from 'react'
import Typography from 'typography'
import CodePlugin from 'typography-plugin-code'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'
import {text} from '../utils/colors'

const options = {
  baseFontSize: '18px',
  baseLineHeight: 1.45,
  headerFontFamily: [
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    'Lucida Grande',
    'sans-serif',
  ],
  bodyFontFamily: [
    '-apple-system',
    'system-ui',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif'
  ],
  scaleRatio: 2.25,
  plugins: [new CodePlugin()],
  overrideStyles: ({ rhythm, scale }, options) => ({
    body: {
      color: text
    },
    [MOBILE_MEDIA_QUERY]: {
      // Make baseFontSize on mobile 16px.
      html: {
        fontSize: `${16 / 16 * 100}%`,
      },
    },
  }),
}

const typography = new Typography(options)

typography.headerFontFamily = () => typography.options.headerFontFamily.join(',')
typography.bodyFontFamily = () => typography.options.headerFontFamily.join(',')

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
