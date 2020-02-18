import App from '../App'

export default [{
  path: '/',
  component: App,
  children: [
    {
      path: '/:tab?',
      component: r => require.ensure([], () => r(require('../pages/Index/')), 'tab')
    },


    // {
    //   path: '/equip',
    //   component: r => require.ensure([], () => r(require('../pages/Index/equip')), 'equip')
    // },
    // {
    //   path: '/rune',
    //   component: r => require.ensure([], () => r(require('../pages/Index/rune')), 'rune')
    // },
  ]
}]