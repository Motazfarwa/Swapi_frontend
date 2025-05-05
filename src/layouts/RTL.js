// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from '@chakra-ui/react';
import { RtlProvider } from 'components/RTLProvider/RTLProvider';
import Configurator from 'components/Configurator/Configurator';
import Footer from 'components/Footer/Footer.js';
// Layout components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes.js';
// Custom Chakra theme
import theme from 'theme/theme.js';
import FixedPlugin from '../components/FixedPlugin/FixedPlugin';
// Custom components
import MainPanel from '../components/Layout/MainPanel';
import PanelContainer from '../components/Layout/PanelContainer';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import PanelContent from '../components/Layout/PanelContent';
export default function Dashboard(props) {
	const { ...rest } = props;
	// states and functions
	const [ sidebarVariant, setSidebarVariant ] = useState('transparent');
	const [ fixed, setFixed ] = useState(false);
	const getRoute = () => {
		return window.location.pathname !== '/admin/full-screen-maps';
	};
	const getActiveRoute = (routes) => {
		// Default route name if no active route is found
		let activeRoute = 'Default Brand Text';
	
		// Ensure routes is an array before proceeding
		if (!Array.isArray(routes)) return activeRoute;
	
		for (let i = 0; i < routes.length; i++) {
			const route = routes[i];
	
			// Ensure the route is defined before accessing its properties
			if (!route) continue;
	
			// Handle collapse case (recursive call)
			if (route.collapse && Array.isArray(route.views)) {
				let collapseActiveRoute = getActiveRoute(route.views);
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			}
			// Handle category case (recursive call)
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
		// Default navbar state
		let activeNavbar = false;
	
		// Ensure routes is an array before proceeding
		if (!Array.isArray(routes)) return activeNavbar;
	
		for (let i = 0; i < routes.length; i++) {
			const route = routes[i];
	
			// Ensure the route is defined before accessing its properties
			if (!route) continue;
	
			// Handle category case (recursive call)
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
			if (prop.layout === '/rtl' || prop.layout === '/admin') {
				return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
			} else {
				return null;
			}
		});
	};
	const { isOpen, onOpen, onClose } = useDisclosure();
	document.documentElement.dir = 'rtl';
	// Chakra Color Mode
	return (
		<ChakraProvider theme={theme} resetCss={false}>
			<RtlProvider>
				<Sidebar
					routes={routes}
					logoText={'PURITY UI DASHBOARD'}
					display='none'
					sidebarVariant={sidebarVariant}
					{...rest}
				/>
				<MainPanel
					variant='rtl'
					w={{
						base: '100%',
						xl: 'calc(100% - 275px)'
					}}>
					<Portal>
						<AdminNavbar
							onOpen={onOpen}
							logoText={'PURITY UI DASHBOARD'}
							brandText={getActiveRoute(routes)}
							secondary={getActiveNavbar(routes)}
							fixed={fixed}
							{...rest}
						/>
					</Portal>
					{getRoute() ? (
						<PanelContent>
							<PanelContainer>
								<Switch>
									{getRoutes(routes)}
									<Redirect from='/rtl' to='/rtl/rtl-support-page' />
								</Switch>
							</PanelContainer>
						</PanelContent>
					) : null}
					<Footer />
					<Portal>
						<FixedPlugin secondary={getActiveNavbar(routes)} fixed={fixed} onOpen={onOpen} />
					</Portal>
					<Configurator
						secondary={getActiveNavbar(routes)}
						isOpen={isOpen}
						onClose={onClose}
						isChecked={fixed}
						onSwitch={(value) => {
							setFixed(value);
						}}
						onOpaque={() => setSidebarVariant('opaque')}
						onTransparent={() => setSidebarVariant('transparent')}
					/>
				</MainPanel>
			</RtlProvider>
		</ChakraProvider>
	);
}
