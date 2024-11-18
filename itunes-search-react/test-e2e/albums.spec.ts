import { test, expect } from '@playwright/test';

test.describe('Album Search', () => {
  test('should show no results message when search returns empty', async ({ page }) => {
    await page.goto('http://localhost:5173'); // Adjust port if different
    
    const searchInput = await page.getByRole('textbox');
    await searchInput.fill('flksjflkasjlfkjsalfja');
    //wait for debounce search to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await expect(page.getByText('No albums found')).toBeVisible();
  });

  test('should display albums when searching for a known artist', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    const searchInput = await page.getByRole('textbox');
    await searchInput.fill('The cure ');
    //wait for debounce search to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Wait for albums to load
    await expect(page.getByTestId('album-grid')).toBeVisible();
    // Verify at least one album is shown
    await expect(page.getByTestId('album-card')).toHaveCount(35);
  });
}); 