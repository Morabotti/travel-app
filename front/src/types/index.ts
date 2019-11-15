import { LazyExoticComponent, FC } from 'react'
import { SvgIconProps } from '@material-ui/core/SvgIcon'

export interface PublicRoutes {
  name: string
  path: string
  icon: (props: SvgIconProps) => JSX.Element
  component: LazyExoticComponent<FC>
}

export interface PrivateRoutes {
  name: string
  path: string
  component: LazyExoticComponent<FC>
}
