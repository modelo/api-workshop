import React from 'react';
import { Router, Link, RouteComponentProps, Redirect } from '@reach/router';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import classNames from 'classnames';
import ModelContainer from './containers/model-container';
import './styles/routes.css';

const routes = [
  { name: 'page 1', link: '/page1', component: Page1 },
  { name: 'page 2', link: '/page2', component: Page2 },
  { name: 'page 3', link: '/page3', component: Page3 },
  { name: 'page 4', link: '/page4', component: Page4 },
];

const Links = (props: RouteComponentProps<{ children: React.ReactNode }>) => {
  const { children } = props;
  return (
    <div className="routes">
      {routes.map((route) => (
        <div key={route.link} className={classNames('route', { 'route--active': props.uri == route.link })}>
          <Link to={route.link} getProps={(props) => ({ style: { color: props.isCurrent ? 'red' : 'black' } })}>
            <div>{route.name}</div>
          </Link>
        </div>
      ))}

      {children}
    </div>
  );
};

type Props = {};

function Routes(props: Props) {
  return (
    <ModelContainer modelId="VYnJKyYJ">
      <Router>
        <Links path="/">
          {routes.map((route) => (
            <route.component key={route.link} path={route.link} />
          ))}
        </Links>

        <Redirect from="/" to="/page1" noThrow />
      </Router>
    </ModelContainer>
  );
}

export default Routes;
