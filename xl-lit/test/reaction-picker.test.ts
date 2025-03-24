import { page } from '@vitest/browser/context'
import { beforeEach, describe, expect, it } from 'vitest'

import '../src/index.js'

describe('Reaction Picker', async () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <xl-reaction-picker data-testid="picker">
        <xl-reaction-option unicodeValue="U+1F525" label="Fire"></xl-reaction-option>
        <xl-reaction-option unicodeValue="U+1F4B5" label="Dollar banknote"></xl-reaction-option>
      </xl-reaction-picker>
    `;
  });
  
  it('should open picker sheet', async () => {
    const btn = await page.getByLabelText('Add reaction');

    await btn.click();

    const pickerSheet = await page.getByTestId('picker').element()
      .shadowRoot?.querySelector('div');

    await expect(pickerSheet).toBeVisible();
  });

  it('should fire reaction-select event when option clicked', async () => {
    const picker = await page.getByTestId('picker');

    picker.element().addEventListener('reaction-select', (event) => {
      expect((event as CustomEvent).detail.unicodeValue).toBe('U+1F4B5');
      expect((event as CustomEvent).detail.label).toBe('Dollar banknote');
    });

    const btn = await page.getByLabelText('Add reaction');

    await btn.click();

    const reactionOption = await page.getByLabelText('Dollar banknote');

    await reactionOption.click();

    const pickerSheet = picker.element()
      .shadowRoot?.querySelector('div');

    await expect(pickerSheet).not.toBeVisible();
  });
})
