import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js';
import { XlReactionOption } from './reaction-option';
import { iconAddReaction } from '../icons/add-icon';

@customElement('xl-reaction-picker')
export class XlReactionPicker extends LitElement {
  @state()
  private _sheetOpened: boolean = false;

  togglePickerSheet() {
    this._sheetOpened = !this._sheetOpened;
  }

  _handleReactionClick(event: Event) {
    const optionClicked = event.composedPath()
      .find(el => (el as HTMLElement)?.tagName === 'XL-REACTION-OPTION') as XlReactionOption;

    if (optionClicked) {
      this.dispatchEvent(new CustomEvent('reaction-select', {
        detail: {
          // Using getAttribute here to get the original value of U+XXXX string
          // instead of the converted value
          // 
          // Alternatively 
          // 
          // unicodeValue: Array.from(target.unicodeValue)
          //   .map(ch => 'U+' + ch.codePointAt(0)?.toString(16).toUpperCase())
          //   .join(','),

          unicodeValue: optionClicked.getAttribute('unicodeValue'),
          label: optionClicked.label
        }
      }));
    }

    this._sheetOpened = false;
  }

  _handleOutsideClick = (event: Event) => {
    if (!event.composedPath().includes(this) && this._sheetOpened) {
      this._sheetOpened = false;
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick);
  }
  override disconnectedCallback() {
    window.removeEventListener('click', this._handleOutsideClick);
    super.disconnectedCallback();
  }

  override render() {
    return html`
      <button 
        @click=${this.togglePickerSheet}
      >
        ${iconAddReaction}
      </button> 
      <div class="reaction-picker-sheet ${classMap({ open: this._sheetOpened })}">
        <slot @click=${this._handleReactionClick}></slot>
      </div>
    `
  }

  static override styles = css`
    svg {
      display: inline-block;
      margin: 0;
      vertical-align: middle;
    }

    button {
      anchor-name: --trigger;

      cursor: pointer;
      background: var(--color-background-primary, #fff);
      border: 1px solid var(--color-border-primary, #ccc);
      color: var(--color-text-primary, #484848);
      padding: var(--space-100, 8px) var(--space-150, 12px);
      border-radius: 80px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .reaction-picker-sheet {      
      box-sizing: border-box;
      width: auto;
      height: auto;
      max-width: 264px;
      max-height: 192px;
      overflow-y: auto;
      background-color: var(--color-background-primary, #fff);
      border: none;
      border-radius: var(--radius-all, 4px);
      padding: var(--space-150, 12px);
      
      display: none;
      
      position: fixed;
      position-anchor: --trigger;
      position-area: top span-right;
      position-try-fallbacks:
        flip-block,
        flip-inline,
        flip-block flip-inline;
      margin: var(--space-050, 4px) 0;
    }

    .reaction-picker-sheet slot {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: var(--space-150, 12px);
      width: max-content;
      max-width: 100%;
    }

    .reaction-picker-sheet.open {
      display: block;
    }

    button:hover {
      color: var(--color-blue-700, #027BAF);
    }
  `

}
