import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal, WritableSignal } from '@angular/core';

import '@xl/lit-components';

type Reaction = {
  unicodeValue: string,
  count: number,
  reacted: boolean,
  label: string
}

@Component({
  selector: 'app-root',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [],
  template: `
    <h1>Reaction web-component demo</h1>
    <div class="reactions-container"> 
      <xl-reaction-picker (reaction-select)="handleReactionSelect($event)">
        @for (allowedReaction of allowedReactions; track allowedReaction.unicodeValue) {
          <xl-reaction-option 
            [attr.unicodeValue]="allowedReaction.unicodeValue" 
            [label]="allowedReaction.label">
          </xl-reaction-option>
        }
      </xl-reaction-picker>
      
      @for (reaction of reactionsState(); track reaction.unicodeValue) {
        <xl-reaction-indicator 
          [attr.unicodeValue]="reaction.unicodeValue" 
          [attr.count]="reaction.count" 
          [attr.reacted]="reaction.reacted || null"  
          [label]="reaction.label"
          [attr.highlight]="reaction.unicodeValue === highlightedReaction() || null"
          (reaction-change)="handleReactionIndicatorChange($event, reaction)">
        </xl-reaction-indicator>
      }
    </div>
  `,
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly allowedReactions = [
    {label: 'Fire', unicodeValue: 'U+1F525'},
    {label: 'Dollar banknote', unicodeValue: 'U+1F4B5'},
    {label: 'Lightbulb', unicodeValue: 'U+1F4A1'},
    {label: 'Check', unicodeValue: 'U+2705'},
    {label: 'Cross mark button', unicodeValue: 'U+274C'},
    {label: 'Warning', unicodeValue: 'U+26A0,U+FE0F'},
    {label: 'Unicorn', unicodeValue: 'U+1F984'},
    {label: 'Sparkles', unicodeValue: 'U+2728'},
    {label: 'Heart', unicodeValue: 'U+2764,U+FE0F'},
    {label: 'Clover', unicodeValue: 'U+1F340'},
    {label: 'Rainbow', unicodeValue: 'U+1F308'},
    {label: 'Eyes', unicodeValue: 'U+1F440'},
    {label: 'Thumbs up', unicodeValue: 'U+1F44D'},
    {label: 'Thumbs down', unicodeValue: 'U+1F44E'},
    {label: 'Folded hands', unicodeValue: 'U+1F64F'},
    {label: 'Waving hand', unicodeValue: 'U+1F44B'},
    {label: 'Raising hands', unicodeValue: 'U+1F64C'},
    {label: 'Flexed biceps', unicodeValue: 'U+1F4AA'},
    {label: 'Pleading face', unicodeValue: 'U+1F97A'},
    {label: 'Loudly crying face', unicodeValue: 'U+1F62D'},
    {label: 'Fearful face', unicodeValue: 'U+1F628'},
    {label: 'Face with open mouth', unicodeValue: 'U+1F62E'},
    {label: 'Frowning face', unicodeValue: 'U+2639,U+FE0F'},
    {label: 'Flushed face', unicodeValue: 'U+1F633'},
    {label: 'Grinning face with big eyes', unicodeValue: 'U+1F603'},
    {label: 'Smiling face with heart-eyes', unicodeValue: 'U+1F60D'},
    {label: 'rolling on the floor laughing', unicodeValue: 'U+1F923'},
    {label: 'Partying face', unicodeValue: 'U+1F973'},
    {label: 'Thinking face', unicodeValue: 'U+1F914'},
    {label: 'Neutral face', unicodeValue: 'U+1F610'},
  ]

  readonly reactionsState:WritableSignal<Reaction[]> = signal([
    {unicodeValue: 'U+1F44D', count: 1, reacted: false, label: 'Thumbs up'},
    {unicodeValue: 'U+1F44E', count: 3, reacted: false, label: 'Thumbs down'},
    {unicodeValue: 'U+1F610', count: 1, reacted: true, label: 'Neutral face'},
    {unicodeValue: 'U+1F603', count: 2, reacted: true, label: 'Grinning face with big eyes'},
  ])

  readonly highlightedReaction:WritableSignal<string|null> = signal(null);

  handleReactionSelect(event: Event) {
    const {unicodeValue, label} = (event as CustomEvent).detail;

    const reactionState = this.reactionsState();

    const idxToUpdate = reactionState.findIndex(reaction => reaction.unicodeValue === unicodeValue);

    if (idxToUpdate === -1) {
      reactionState.unshift({
        unicodeValue,
        count: 1,
        reacted: true,
        label
      });
    } else {
      if (!reactionState[idxToUpdate].reacted) {
        reactionState[idxToUpdate].reacted = true;
        reactionState[idxToUpdate].count++;
      } else {
        this.highlightedReaction.set(unicodeValue);
        setTimeout(() => this.highlightedReaction.set(null), 200);
      }
    }

    this.reactionsState.set([...reactionState])
  }

  handleReactionIndicatorChange(event: Event, reaction: Reaction) {
    const {count, reacted} = (event as CustomEvent).detail;

    const reactionState = this.reactionsState();

    const idxToUpdate = reactionState.indexOf(reaction);

    if (idxToUpdate !== -1) {
      if (count === 0) {
        reactionState.splice(idxToUpdate, 1);
      } else {
        reactionState[idxToUpdate].count = count;
        reactionState[idxToUpdate].reacted = reacted;
      }
    } 

    this.reactionsState.set([...reactionState])
  }
}
