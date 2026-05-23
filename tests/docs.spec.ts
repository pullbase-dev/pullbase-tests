import { test, expect } from "@playwright/test";

test.describe("Documentation page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs");
  });

  test("shows documentation", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /introduction|documentation|docs/i }).first()).toBeVisible();
  });

  test("sidebar navigation works", async ({ page }) => {
    const cliLink = page.getByRole("button", { name: /cli/i }).or(page.getByText("CLI"));
    if (await cliLink.first().isVisible()) {
      await cliLink.first().click();
      await page.waitForTimeout(500);
      const body = await page.textContent("body");
      expect(body?.toLowerCase()).toContain("pullbase");
    }
  });

  test("CLI section exists and shows install command", async ({ page }) => {
    await page.waitForTimeout(1000);
    const body = await page.textContent("body");
    expect(body).toContain("@pullbase/cli");
  });

  test("API reference shows endpoints", async ({ page }) => {
    await page.waitForTimeout(1000);
    const body = await page.textContent("body");
    expect(body).toContain("/api/models");
  });
});
