// src/navigation/NavigationService.js
import { createRef } from 'react';
import { CommonActions } from '@react-navigation/native';

export const navigationRef = createRef();

/**
 * Navigate to a specific screen
 * @param {string} name - Route name
 * @param {object} params - Route parameters
 */
export function navigate(name, params) {
    if (navigationRef.current?.navigate) {
        navigationRef.current.navigate(name, params);
    }
}

/**
 * Reset navigation stack to a specific route
 * @param {string} routeName - Name of the route to reset to (e.g., 'Auth' or 'App')
 */
export function reset(routeName) {
    if (navigationRef.current?.dispatch) {
        navigationRef.current.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: routeName }],
            })
        );
    }
}