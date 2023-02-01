import { trigger, transition, style, animate, state } from "@angular/animations";

export let slide = trigger('slide', [

    transition('void => *', [
        style({ transform: 'translateY(-20px)' }),
        animate("0.3s ease-out")
    ]),


    transition('* => void', [
        animate("0.25s ease-in", style({ transform: 'translateY(-20px)' }))
    ])


])

export let fade = trigger('fade', [
    state('void', style({ opacity: 0 })),

    transition('void => *', [
        animate("0.3s ease-in", style({ opacity: 1 }))
    ]),
])