import React, { FC, Suspense, lazy } from 'react'
import theme from '@theme'
import { Navigation, SuspenseLoader } from '@components/common'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import { PublicRoutes, PrivateRoutes } from '@types'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AccountMultiple, BullseyeArrow, ClipboardList } from 'mdi-material-ui'
import { hot } from 'react-hot-loader'

import '@/index.less'

const CustomersView = lazy(() => import('@components/customers/CustomersView'))
const OrdersView = lazy(() => import('@components/orders/OrdersView'))
const TravelsView = lazy(() => import('@components/travels/TravelsView'))
const CustomerView = lazy(() => import('@components/customer/CustomerView'))
const TravelView = lazy(() => import('@components/travel/TravelView'))
const OrderView = lazy(() => import('@components/order/OrderView'))

const publicRoutes: PublicRoutes[] = [
  {
    name: 'Customers',
    path: '/customers',
    icon: AccountMultiple,
    component: CustomersView
  },
  {
    name: 'Travels',
    path: '/travels',
    icon: BullseyeArrow,
    component: TravelsView
  },
  {
    name: 'Orders',
    path: '/orders',
    icon: ClipboardList,
    component: OrdersView
  }
]

const privateRoutes: PrivateRoutes[] = [
  {
    path: '/customers/:id',
    component: CustomerView
  }, {
    path: '/travels/:id',
    component: TravelView
  }, {
    path: '/orders/:id',
    component: OrderView
  }
]

const routes = [...privateRoutes, ...publicRoutes]

const App: FC = () => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline />
      <Navigation routes={publicRoutes}>
        <Suspense fallback={<SuspenseLoader />}>
          <Switch>
            <Redirect to='/customers' />
            {routes.map(route => (
              <Route key={route.path} path={route.path}>
                <route.component />
              </Route>
            ))}
          </Switch>
        </Suspense>
      </Navigation>
    </BrowserRouter>
  </MuiThemeProvider>
)

export default hot(module)(App)
