import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const routeTransition = () => {
  return trigger('routeTransition', [
    transition('* => *', [
      // host element (router-outlet wrapper)
      style({ position: 'relative' }),

      // both (entering page and leaving page)
      query(':enter, :leave', [
        style({ position: 'absolute', top: 0, left: 0, width: '100%' }),
      ], { optional: true }),

      query(':enter', [
        style({ opacity: 0, transform: 'translateY(-40px)' })
      ], { optional: true }),


      group([
        // leaving page
        query(':leave', [
          style({ opacity: '*', transform: '*' }),
          animate('250ms ease-in-out', style({ opacity: 0, transform: 'translateY(30px)' }))
        ], { optional: true }),

        // entering page
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-12px)' }),
          animate('333ms cubic-bezier(.3,.87,.75,.87)', style({ opacity: '*', transform: '*' }))
        ], { optional: true, delay: 300 })
      ])
    ])
  ])
}
