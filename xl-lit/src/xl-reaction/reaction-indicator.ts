import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unicodeStringConverter } from '../utils/unicode-string-converter';

@customElement('xl-reaction-indicator')
export class XlReactionIndicator extends LitElement {
  @property({type: String, converter: unicodeStringConverter})
  unicodeValue: string = '';

  @property({type: Number})
  count: number = 0;

  @property({type: Boolean})
  reacted: boolean = false;

  @property({type: String})
  label: string = '';

  @property({type: Boolean, reflect: true})
  highlight: boolean = false;

  handleClick() {
    if (this.reacted) {
      this.reacted = false;
      this.count--;
    } else {
      this.reacted = true;
      this.count++;
    }

    this.dispatchEvent(new CustomEvent('reaction-change', {
      detail: {
        count: this.count,
        reacted: this.reacted
      }
    }));
  }

  protected override render() {
    return html`
      <button
        @click=${this.handleClick}
      >
        <span class="emoji">${this.unicodeValue}</span> 
        ${this.count}
      </button>
    `
  }

  static override styles = css`
    button {
      cursor: pointer;
      background-color: var(--color-background-primary, #fff);
      border: 1px solid var(--color-border-primary, #ccc);
      color: var(--color-text-primary, #484848);
      padding: var(--space-100, 8px) var(--space-150, 12px);
      border-radius: 80px;
      font-size: var(--font-x-small, 12px);
      line-height: calc(var(--font-x-small, 12px) + 4px);
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--space-050, 4px);
      transition: box-shadow 0.15s ease-out;
    }
    
    button:hover {
      color: var(--color-blue-700, #027BAF);
    }

    :host([reacted]) button {
      background-color: var(--color-blue-050, #E9F7FC);
      border-color: var(--color-blue-700, #027BAF);
    }

    :host([reacted]) button:hover {
      color: var(--color-blue-700, #027BAF);
    }

    :host([highlight]) button {
      transition: none;
      box-shadow: 0 0 6px -1px var(--color-blue-700, #027BAF);
    }

    .emoji {
      font-size: calc(var(--font-x-small, 12px) + 4px);
      line-height: 100%;
      height: calc(var(--font-x-small, 12px) + 4px);
      display: inline-block;
    }
  `
}
