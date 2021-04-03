import proConfig from '../../share/pro-config';

const checkIsAsyncRoute = (component) => {
    console.log('component.name', component.name, component[proConfig.asyncComponentKey]);
    return component[proConfig.asyncComponentKey];
}

export default async function getStaticRoutes(routes) {
    let len = routes.length;

    let staticRoutes = [],
        i = 0;
        
    for(; i < len; i++) {
        let item = routes[i];
        if(checkIsAsyncRoute(item.component)) {
            staticRoutes.push({
                ...item,
                component: (await item.component().props.load()).default
            })
        } else {
            staticRoutes.push({...item});
        }
    }

    return staticRoutes;
}