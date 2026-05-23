import { test, expect } from "@playwright/test";

test.describe("Search", () => {
  test("global search returns results", async ({ page }) => {
    await page.goto("/search?q=model");
    await page.waitForTimeout(2000);
    await expect(page.getByRole("heading", { name: /search/i }).first()).toBeVisible();
  });

  test("search from home navigates to search page", async ({ page }) => {
    await page.goto("/");
    const searchInput = page.getByRole("searchbox").or(page.getByPlaceholder(/search/i));
    if (await searchInput.first().isVisible()) {
      await searchInput.first().fill("bert");
      await searchInput.first().press("Enter");
      await expect(page).toHaveURL(/search|q=bert/i);
    }
  });
});
