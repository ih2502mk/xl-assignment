import { page } from '@vitest/browser/context'
import { describe, expect, it } from 'vitest'

import '../src/index.js'

describe('Reaction Indicator', async () => {
  it('should increment the count when not reacted', async () => {
    document.body.innerHTML = `
      <xl-reaction-indicator 
        unicodeValue="U+1F44D"
        count="42"
      ></xl-reaction-indicator>
    `;
    
    const btn = await page.getByRole('button');

    await btn.click();

    await expect(btn.element().textContent.includes('43')).toBe(true);
  });

  it('should decrement the count when reacted', async () => {
    document.body.innerHTML = `
      <xl-reaction-indicator 
        unicodeValue="U+1F44D"
        count="42"
        reacted
      ></xl-reaction-indicator>
    `;

    const btn = await page.getByRole('button');

    await btn.click();

    await expect(btn.element().textContent.includes('41')).toBe(true);
  });

  it('should fire reaction-change event', async () => {
    document.body.innerHTML = `
      <xl-reaction-indicator 
        unicodeValue="U+1F44D"
        count="42"
        reacted
        data-testid="indicator"
      ></xl-reaction-indicator>
    `;

    const indicator = await page.getByTestId('indicator');

    indicator.element().addEventListener('reaction-change', (event) => {
      expect((event as CustomEvent).detail.count).toBe(41);
      expect((event as CustomEvent).detail.reacted).toBe(false);
    });

    await indicator.click();
  })
})
