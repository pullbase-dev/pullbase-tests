import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads and shows hero section", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/PullBase/i);
    await expect(page.locator("h1, [data-testid='hero-title']").first()).toBeVisible();
  });

  test("shows navigation links", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /models/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /datasets/i }).first()).toBeVisible();
  });

  test("shows platform stats", async ({ page }) => {
    await page.goto("/");
    // Stats section should render within 10s (API call)
    await page.waitForTimeout(2000);
    const body = await page.textContent("body");
    // Should show some numeric stats
    expect(body).toMatch(/\d+/);
  });

  test("connects to correct domain", async ({ page }) => {
    const res = await page.goto("/");
    expect(res?.status()).toBeLessThan(400);
  });
});
