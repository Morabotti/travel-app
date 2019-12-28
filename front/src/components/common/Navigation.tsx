import React, { useState, ReactNode } from 'react'
import { Menu } from 'mdi-material-ui'
import { useLocation, useHistory } from 'react-router'
import clsx from 'clsx'
import { PublicRoutes } from '@types'

import {
  Drawer,
  Toolbar,
  IconButton,
  AppBar,
  Typography as T,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  createStyles
} from '@material-ui/core'

const drawerWidth = 240
const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      backgroundColor: theme.palette.primary.main
    },
    menuButton: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(-1.5)
    },
    title: {
      ...theme.typography.h5,
      flexGrow: 1
    },
    icon: {
      marginLeft: theme.spacing(0.5)
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(8)
      }
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    drawerSelect: {
      borderLeft: `4px solid ${theme.palette.primary.dark}`
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
)

interface Props {
  routes: PublicRoutes[],
  children: ReactNode
}

const Navigation = ({ children, routes }: Props) => {
  const [active, setActive] = useState(true)
  const { push } = useHistory()
  const { pathname } = useLocation()
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='Open Menu'
            onClick={() => setActive(!active)}
          >
            <Menu />
          </IconButton>
          <T variant='h1' color='inherit' noWrap className={classes.title}>
            Travelling Application
          </T>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: active,
          [classes.drawerClose]: !active
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: active,
            [classes.drawerClose]: !active
          })
        }}
        open={active}
      >
        <div className={classes.toolbar} />
        <List>
          {routes.map(route => (
            <ListItem
              key={route.path}
              classes={{ selected: classes.drawerSelect }}
              button
              onClick={() => push(route.path)}
              selected={pathname === route.path}
            >
              <ListItemIcon>
                <route.icon className={classes.icon} />
              </ListItemIcon>
              <ListItemText>{route.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

export default Navigation
