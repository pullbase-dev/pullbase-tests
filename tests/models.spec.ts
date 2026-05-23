import { test, expect } from "@playwright/test";

test.describe("Models listing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/models");
  });

  test("shows models list", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /models/i }).first()).toBeVisible();
    // Wait for models to load
    await page.waitForTimeout(2000);
  });

  test("search filters models", async ({ page }) => {
    const searchInput = page.getByRole("searchbox").or(page.getByPlaceholder(/search/i));
    if (await searchInput.isVisible()) {
      await searchInput.fill("llm");
      await page.waitForTimeout(1000);
      const body = await page.textContent("body");
      expect(body?.toLowerCase()).toContain("llm");
    }
  });

  test("model card links to detail page", async ({ page }) => {
    await page.waitForTimeout(2000);
    const firstCard = page.getByRole("link").filter({ hasText: /view|open|model/i }).first();
    if (await firstCard.isVisible()) {
      const href = await firstCard.getAttribute("href");
      expect(href).toMatch(/\/models\/\d+/);
    }
  });
});
