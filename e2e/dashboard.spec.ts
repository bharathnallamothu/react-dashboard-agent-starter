import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('filters update the dynamic dashboard', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Good morning, Alex.' })).toBeVisible()
  await expect(page.locator('.metric-value').filter({ hasText: '98.4%' })).toBeVisible()

  await page.getByLabel('Team').selectOption('data')
  await expect(page.locator('.metric-value').filter({ hasText: '97.5%' })).toBeVisible()
})

test('client-side navigation reaches activity', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Activity', exact: true }).click()
  await expect(page).toHaveURL(/\/activity$/)
  await expect(page.getByRole('heading', { name: 'Every signal, in one place.' })).toBeVisible()
})

test('empty and error states recover', async ({ page }) => {
  await page.goto('/?demo=empty')
  await expect(page.getByRole('heading', { name: 'No activity matches these filters' })).toBeVisible()
  await page.getByRole('button', { name: 'Reset filters' }).click()
  await expect(page.locator('.metric-value').filter({ hasText: '98.4%' })).toBeVisible()

  await page.goto('/?demo=error')
  await expect(page.getByRole('heading', { name: 'We could not load the dashboard' })).toBeVisible()
  await page.getByRole('button', { name: 'Try again' }).click()
  await expect(page.locator('.metric-value').filter({ hasText: '98.4%' })).toBeVisible()
})

test('overview has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.metric-value').filter({ hasText: '98.4%' })).toBeVisible()
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})

test('mobile layout stays within the viewport and exposes skip navigation', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await expect(page.locator('.metric-value').filter({ hasText: '98.4%' })).toBeVisible()
  const viewportWidth = await page.evaluate(() => document.documentElement.clientWidth)
  const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth)
  expect(pageWidth).toBeLessThanOrEqual(viewportWidth)

  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused()
})
