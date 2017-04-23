import {animate, state, style, transition, trigger} from "@angular/animations";

abstract class AnimationGenerator {

    /* private static getCardsAnimationStates(numCards, animateAt): any[] {

     }*/

    private static getLeaveTransitions(numCards, animateAt): any[] {
        return [
            transition('card_' + (numCards - 1) + '=>void', [
                animate(animateAt + 'ms', style({left: 100 + (100 / numCards) + '%', opacity: 0}))
            ]),
            transition('card_0=>void', [
                animate(animateAt + 'ms', style({left: -100 / numCards + '%', opacity: 0}))
            ])
        ]
    }

    private static getEnterTransitions(numCards, animateAt): any[] {
        return [
            transition('void=>card_0', [
                style({left: -100 / numCards + '%', opacity: 0}),
                animate(animateAt + 'ms')
            ]),
            transition('void=>card_' + (numCards - 1), [
                style({left: 100 + (100 / numCards) + '%', opacity: 0}),
                animate(animateAt + 'ms')
            ])
        ]
    }

    public static getEnterLeaveAnimation(numCards: number, animateAt: number) {
        let states: any[] = [];
        //cards animation states
        for (let i = 0; i < numCards; i++) {
            states.push(state("card_" + i, style({left: (100 / numCards) * i + '%'})));
        }

        for (let i = 0; i < numCards - 1; i++) {
            states.push(transition('card_' + i + '<=>card_' + (i + 1), [
                animate(animateAt + 'ms')
            ]))
        }
        //leave animations
        states.push(transition('card_' + (numCards - 1) + '=>void', [
            animate(animateAt + 'ms', style({left: 100 + (100 / numCards) + '%', opacity: 0}))
        ]));

        states.push(transition('card_0=>void', [
            animate(animateAt + 'ms', style({left: -100 / numCards + '%', opacity: 0}))
        ]));
        //enter animations
        states.push(transition('void=>card_0', [
            style({left: -100 / numCards + '%', opacity: 0}),
            animate(animateAt + 'ms')
        ]));
        states.push(transition('void=>card_' + (numCards - 1), [
            style({left: 100 + (100 / numCards) + '%', opacity: 0}),
            animate(animateAt + 'ms')
        ]));

        return trigger("enterLeaveAnimation", [
            ...states
        ])
    }
}
