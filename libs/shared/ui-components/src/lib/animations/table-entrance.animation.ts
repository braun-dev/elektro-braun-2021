import { animate, AnimationTriggerMetadata, query, stagger, style, transition, trigger } from '@angular/animations';

export interface TableEntranceAnimationProps {
  duration?: number;
  delay?: number;
  easing?: string;
}

const defaultProps: TableEntranceAnimationProps = {
  duration: 200,
  delay: 0,
  easing: 'cubic-bezier(.64,.68,.48,.91)'
};

export const tableEntranceAnimation = (props?: TableEntranceAnimationProps): AnimationTriggerMetadata => {
  const duration = props?.duration ?? defaultProps.duration;
  const delay = props?.delay ?? defaultProps.delay;
  const easing = props?.easing ?? defaultProps.easing;
  const params = { duration, delay, easing };
  return trigger('tableEntrance', [
    transition('* <=> *', [
      query(':enter', [
          style({ opacity: 0, transform: 'translateY(-7px)' }),
          stagger('12ms', animate('{{duration}}ms {{delay}}ms cubic-bezier(.64,.68,.48,.91)', style('*')))
        ], { optional: true, params }
      ),
      query(':leave', [
          animate('120ms ease-in', style({ opacity: 0, transform: 'translateY(9px)' }))
        ], { optional: true, delay: 0 }
      )
    ])
  ]);
}
