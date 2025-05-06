const { test, expect } = require('@playwright/test');
const { SupportRequestPage } = require('../pages/SupportRequestPage');

test('should submit a request and check response status', async ({ page }) => {
  const supportPage = new SupportRequestPage(page);
  await page.goto('https://awery.aero/support');

  await supportPage.fillProblemDescription('Опис проблеми.');
  await supportPage.fillEmail('test@example.com');
  await supportPage.fillWhenItStarted('Сьогодні');
  await supportPage.fillStepsToRecreate('Крок 1, Крок 2.');
  await supportPage.fillCompanyName('Тестова Компанія');
  await supportPage.fillFullName('Тестовий Користувач');
  await supportPage.fillPhone('123-456-7890');
  await supportPage.fillBestTimeToFollowUp('Будь-який час');
  await supportPage.fillTypeYourBrowser('Chrome');
  await supportPage.fillFlashPlayerVersion('32.0');

  // Очікуємо потрібну відповідь після кліку
  const [response] = await Promise.all([
    page.waitForResponse(res =>
      res.url().includes('/support') && res.request().method() === 'POST'
    ),
    supportPage.clickSendRequestButton(),
  ]);

  // 🔍 Перевірка статус-коду
  const status = response.status();
  console.log('📥 Response status:', status);

  if (status === 200) {
    await expect(page.getByText('Ваш запит успішно надіслано.')).toBeVisible();
  } else {
    await page.screenshot({ path: `error-status-${status}.png`, fullPage: true });
    throw new Error(`Непередбачений статус код: ${status}`);
  }
});
