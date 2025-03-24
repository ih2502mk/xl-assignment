import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unicodeStringConverter } from "../utils/unicode-string-converter";

@customElement('xl-reaction-option')
export class XlReactionOption extends LitElement {

  @property({ type: String, converter: unicodeStringConverter })
  unicodeValue: string = '';

  @property({ type: String })
  label: string = '';

  protected override render() {
    return html`
      <button aria-label=${this.label}>${this.unicodeValue}</button>
    `
  }

  static override styles = css`
    button {
      cursor: pointer;
      border: none;
      background-color: transparent;
      padding: 0;
      font-size: 24px;
      line-height: 100%;
      display: inline-block;
      width: 24px;
      height: 24px;
      border-radius: 2px;
      transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    button:hover {
      background-color: var(--color-blue-050, #E9F7FC);
      box-shadow: 0 0 0 2px var(--color-blue-050, #E9F7FC);
    }
  `
}
