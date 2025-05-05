// chakra imports
import { Box, ChakraProvider, Portal } from '@chakra-ui/react';
import Footer from 'components/Footer/Footer.js';
// core components
import AuthNavbar from 'components/Navbars/AuthNavbar.js';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes.js';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import theme from 'theme/theme.js';

export default function Pages(props) {
	const { ...rest } = props;
	// ref for the wrapper div
	const wrapper = React.createRef();
	React.useEffect(() => {
		document.body.style.overflow = 'unset';
		// Specify how to clean up after this effect:
		return function cleanup() {};
	});
	const getActiveRoute = (routes) => {
		// Default active route
		let activeRoute = 'Default Brand Text';
	
		// Ensure routes is an array before proceeding
		if (!Array.isArray(routes)) return activeRoute;
	
		for (let i = 0; i < routes.length; i++) {
			const route = routes[i];
	
			// Check if the current route is defined before accessing its properties
			if (!route) continue;
	
			// Handle collapse case (recursive)
			if (route.collapse && Array.isArray(route.views)) {
				let collapseActiveRoute = getActiveRoute(route.views);
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			}
			// Handle category case (recursive)
			else if (route.category && Array.isArray(route.views)) {
				let categoryActiveRoute = getActiveRoute(route.views);
				if (categoryActiveRoute !== activeRoute) {
					return categoryActiveRoute;
				}
			}
			// Handle normal route
			else {
				const routePath = route.layout && route.path ? route.layout + route.path : '';
				if (routePath && window.location.href.indexOf(routePath) !== -1) {
					return route.name || activeRoute;
				}
			}
		}
	
		return activeRoute;
	};
	
	const getActiveNavbar = (routes) => {
		// Default active navbar state
		let activeNavbar = false;
	
		// Ensure routes is an array before proceeding
		if (!Array.isArray(routes)) return activeNavbar;
	
		for (let i = 0; i < routes.length; i++) {
			const route = routes[i];
	
			// Check if the current route is defined before accessing its properties
			if (!route) continue;
	
			// Handle category case (recursive)
			if (route.category && Array.isArray(route.views)) {
				let categoryActiveNavbar = getActiveNavbar(route.views);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			}
			// Handle normal route
			else {
				const routePath = route.layout && route.path ? route.layout + route.path : '';
				if (routePath && window.location.href.indexOf(routePath) !== -1) {
					if (route.secondaryNavbar !== undefined) {
						return route.secondaryNavbar;
					}
				}
			}
		}
	
		return activeNavbar;
	};
	
	const getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.collapse) {
				return getRoutes(prop.views);
			}
			if (prop.category === 'account') {
				return getRoutes(prop.views);
			}
			if (prop.layout === '/auth') {
				return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
			} else {
				return null;
			}
		});
	};
	const navRef = React.useRef();
	document.documentElement.dir = 'ltr';
	return (
		<ChakraProvider theme={theme} resetCss={false} w='100%'>
			<Box ref={navRef} w='100%'>
				<Portal containerRef={navRef}>
					<AuthNavbar secondary={getActiveNavbar(routes)} logoText='PURITY UI DASHBOARD' />
				</Portal>
				<Box w='100%'>
					<Box ref={wrapper} w='100%'>
						<Switch>
							{getRoutes(routes)}
							<Redirect from='/auth' to='/auth/login-page' />
						</Switch>
					</Box>
				</Box>
				<Box px='24px' mx='auto' width='1044px' maxW='100%'>
					<Footer />
				</Box>
			</Box>
		</ChakraProvider>
	);
}
