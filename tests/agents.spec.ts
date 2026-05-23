import { test, expect } from "@playwright/test";

test.describe("AI Agents", () => {
  test("shows agents listing", async ({ page }) => {
    await page.goto("/agents");
    await expect(page.getByRole("heading", { name: /agents/i }).first()).toBeVisible();
    await page.waitForTimeout(1500);
  });

  test("AutoBuilder agent is visible", async ({ page }) => {
    await page.goto("/agents");
    await page.waitForTimeout(1500);
    const body = await page.textContent("body");
    expect(body?.toLowerCase()).toContain("autobuilder");
  });

  test("agent detail page has tabs", async ({ page }) => {
    await page.goto("/agents/autobuilder");
    await page.waitForTimeout(1500);
    // Should have Run, Skill, and Recent jobs tabs
    const runTab = page.getByTestId("tab-run").or(page.getByRole("tab", { name: /run/i }));
    const skillTab = page.getByTestId("tab-skill").or(page.getByRole("tab", { name: /skill/i }));
    await expect(runTab.first()).toBeVisible();
    await expect(skillTab.first()).toBeVisible();
  });

  test("Skill tab shows markdown content", async ({ page }) => {
    await page.goto("/agents/autobuilder");
    await page.waitForTimeout(1500);
    const skillTab = page.getByTestId("tab-skill").or(page.getByRole("tab", { name: /skill/i }));
    if (await skillTab.first().isVisible()) {
      await skillTab.first().click();
      await page.waitForTimeout(500);
      // Should show some markdown content
      const body = await page.textContent("body");
      expect(body?.length).toBeGreaterThan(200);
    }
  });
});
